<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonFile = base_path('products.json');
        if (!file_exists($jsonFile)) {
            $this->command->error("products.json not found at {$jsonFile}");
            return;
        }

        $jsonData = file_get_contents($jsonFile);
        $products = json_decode($jsonData, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error("Invalid JSON structure in products.json");
            return;
        }

        $this->command->info("Found " . count($products) . " products in JSON. Importing...");

        Product::truncate();

        foreach ($products as $p) {
            Product::create([
                'name' => $p['name'],
                'category' => $p['category'],
                'price' => $p['price'] ?? 'Price on Request',
                'description' => $p['description'] ?? '',
                'image' => $p['image'] ?? '',
                'images' => $p['images'] ?? [],
                'specs' => $p['specs'] ?? [],
                'status' => $p['status'] ?? 'Active',
                'is_new_arrival' => false,
                'task' => $p['task'] ?? ''
            ]);
        }

        $this->command->info("Successfully seeded " . count($products) . " products into SQLite database.");
    }
}
