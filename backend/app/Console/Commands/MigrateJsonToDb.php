<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Helpers\JsonDB;
use App\Models\Product;
use App\Models\Inquiry;
use App\Models\Activity;
use App\Models\PortfolioProject;
use App\Models\GalleryItem;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MigrateJsonToDb extends Command
{
    protected $signature = 'migrate:json';
    protected $description = 'Migrate data from storage/app/db.json to the database';

    public function handle()
    {
        $this->info('Starting data migration from JsonDB to PostgreSQL...');

        $db = JsonDB::read();

        // 1. Users
        $this->info('Migrating Users...');
        foreach ($db['users'] as $u) {
            User::updateOrCreate(
                ['email' => $u['email']],
                [
                    'name' => $u['name'] ?? 'Admin',
                    'password' => $u['password'], // Keep as is if already hashed or raw (behavior matching)
                    'api_token' => $u['api_token']
                ]
            );
        }

        // 2. Products
        $this->info('Migrating Products...');
        foreach ($db['products'] as $p) {
            Product::updateOrCreate(
                ['id' => $p['id']],
                [
                    'name' => $p['name'],
                    'category' => $p['category'] ?? 'General',
                    'description' => $p['description'] ?? '',
                    'price' => $p['price'] ?? '',
                    'image' => $p['image'] ?? '',
                    'images' => $p['images'] ?? [],
                    'specs' => $p['specs'] ?? [],
                    'status' => $p['status'] ?? 'Active',
                    'task' => $p['task'] ?? null,
                ]
            );
        }

        // 3. Inquiries
        $this->info('Migrating Inquiries...');
        foreach ($db['inquiries'] as $i) {
            Inquiry::updateOrCreate(
                ['id' => $i['id']],
                [
                    'name' => $i['name'],
                    'email' => $i['email'],
                    'subject' => $i['subject'] ?? '',
                    'message' => $i['message'],
                    'status' => $i['status'] ?? 'Pending',
                    'date' => $i['date'] ?? null,
                ]
            );
        }

        // 4. Team Members
        if (isset($db['team'])) {
            $this->info('Migrating Team Members...');
            foreach ($db['team'] as $tm) {
                TeamMember::updateOrCreate(
                    ['id' => $tm['id']],
                    [
                        'name' => $tm['name'],
                        'role' => $tm['role'],
                        'phone' => $tm['phone'] ?? null,
                        'image' => $tm['image'] ?? null,
                    ]
                );
            }
        }

        // 5. Activities
        if (isset($db['activities'])) {
            $this->info('Migrating Activities...');
            foreach ($db['activities'] as $a) {
                Activity::updateOrCreate(
                    ['id' => $a['id']],
                    [
                        'title' => $a['title'],
                        'date' => $a['date'] ?? null,
                        'summary' => $a['summary'] ?? '',
                        'image' => $a['image'] ?? null,
                    ]
                );
            }
        }

        // 6. Gallery
        if (isset($db['gallery'])) {
            $this->info('Migrating Gallery...');
            foreach ($db['gallery'] as $g) {
                GalleryItem::updateOrCreate(
                    ['id' => $g['id']],
                    [
                        'title' => $g['title'] ?? null,
                        'category' => $g['category'] ?? null,
                        'image' => $g['image'],
                        'video_url' => $g['video_url'] ?? null,
                    ]
                );
            }
        }

        // 7. Portfolio
        if (isset($db['portfolio'])) {
            $this->info('Migrating Portfolio...');
            foreach ($db['portfolio'] as $pp) {
                PortfolioProject::updateOrCreate(
                    ['id' => $pp['id']],
                    [
                        'title' => $pp['title'],
                        'client' => $pp['client'] ?? '',
                        'year' => $pp['year'] ?? '',
                        'description' => $pp['description'] ?? '',
                        'image' => $pp['image'] ?? '',
                    ]
                );
            }
        }

        $this->info('Migration completed successfully!');
    }
}
