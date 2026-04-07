<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Gallery Items
        Schema::table('gallery_items', function (Blueprint $table) {
            if (!Schema::hasColumn('gallery_items', 'video_url')) {
                $table->string('video_url')->after('image')->nullable();
            }
        });

        // 2. Activities
        Schema::table('activities', function (Blueprint $table) {
            if (!Schema::hasColumn('activities', 'summary')) {
                $table->string('summary')->after('title')->nullable();
            }
            // Make slug nullable just in case
            $table->string('slug')->nullable()->change();
        });

        // 3. Portfolio Projects
        Schema::table('portfolio_projects', function (Blueprint $table) {
            if (!Schema::hasColumn('portfolio_projects', 'year')) {
                $table->string('year')->after('client')->nullable();
            }
            // Make slug nullable just in case
            $table->string('slug')->nullable()->change();
        });
    }

    public function down(): void
    {
        // ... (Cleanup if needed)
    }
};
