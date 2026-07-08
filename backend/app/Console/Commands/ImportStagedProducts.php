<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class ImportStagedProducts extends Command
{
    protected $signature = 'import:staged-products';
    protected $description = 'Import products from the products_staging folder';

    public function handle()
    {
        $stagingPath = base_path('../frontend/public/assets/products_staging');
        $publicAssetsPath = base_path('../frontend/public/assets');

        if (!File::isDirectory($stagingPath)) {
            $this->error("Staging directory not found at: {$stagingPath}");
            return 1;
        }

        $files = File::files($stagingPath);
        $txtFiles = array_filter($files, function ($file) {
            return $file->getExtension() === 'txt';
        });

        if (empty($txtFiles)) {
            $this->warn("No product .txt files found in {$stagingPath}");
            return 0;
        }

        $this->info("Found " . count($txtFiles) . " product descriptions to import.");

        foreach ($txtFiles as $txtFile) {
            $filename = $txtFile->getFilenameWithoutExtension();
            $content = File::get($txtFile->getRealPath());

            // Parse text content
            $lines = explode("\n", $content);
            $data = [
                'name' => '',
                'category' => 'General',
                'price' => 'Price on Request',
                'task' => null,
                'specs' => [],
                'description' => '',
            ];

            foreach ($lines as $line) {
                $line = trim($line);
                if (empty($line)) continue;

                $parts = explode(':', $line, 2);
                if (count($parts) < 2) continue;

                $key = strtolower(trim($parts[0]));
                $value = trim($parts[1]);

                if ($key === 'name') {
                    $data['name'] = $value;
                } elseif ($key === 'category') {
                    $data['category'] = $value;
                } elseif ($key === 'price') {
                    $data['price'] = $value;
                } elseif ($key === 'task') {
                    $data['task'] = $value;
                } elseif ($key === 'specs') {
                    $data['specs'] = array_map('trim', explode(',', $value));
                } elseif ($key === 'description') {
                    $data['description'] = $value;
                }
            }

            if (empty($data['name'])) {
                $this->error("Skipping {$txtFile->getFilename()} because it has no 'Name' field.");
                continue;
            }

            // Find matching image
            $imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
            $foundImage = null;
            $foundExtension = null;

            foreach ($imageExtensions as $ext) {
                $imgPath = $stagingPath . '/' . $filename . '.' . $ext;
                if (File::exists($imgPath)) {
                    $foundImage = $imgPath;
                    $foundExtension = $ext;
                    break;
                }
            }

            $imageRelativePath = '/assets/portfolio_aerial.png'; // default fallback image
            if ($foundImage) {
                $slug = Str::slug($data['name']);
                $newImageName = 'product_' . $slug . '.' . $foundExtension;
                $newImagePath = $publicAssetsPath . '/' . $newImageName;
                
                File::copy($foundImage, $newImagePath);
                $imageRelativePath = '/assets/' . $newImageName;
                $this->info("Copied image to {$newImagePath}");
            } else {
                $this->warn("No matching image found for {$filename}. Using fallback image.");
            }

            // Create or Update Product
            Product::updateOrCreate(
                ['name' => $data['name']],
                [
                    'category' => $data['category'],
                    'price' => $data['price'],
                    'task' => $data['task'],
                    'specs' => $data['specs'],
                    'description' => $data['description'],
                    'image' => $imageRelativePath,
                    'images' => [$imageRelativePath],
                    'status' => 'Active',
                ]
            );

            $this->info("Successfully imported product: {$data['name']}");
        }

        $this->info("Import completed successfully!");
        return 0;
    }
}
