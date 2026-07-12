<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@sankara.com'],
            [
                'name' => 'Admin',
                'password' => 'sankara2026',
                'api_token' => 'sankara_super_secret_token_123',
                'permissions' => null
            ]
        );
        if ($admin) {
            $admin->update([
                'name' => 'Admin',
                'permissions' => null
            ]);
        }

        $this->call(ProductSeeder::class);
    }

}
