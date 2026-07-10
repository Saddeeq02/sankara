<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Activities updates
        Schema::table('activities', function (Blueprint $table) {
            if (!Schema::hasColumn('activities', 'category')) {
                $table->string('category')->nullable();
            }
            if (!Schema::hasColumn('activities', 'video_url')) {
                $table->string('video_url')->nullable();
            }
            if (!Schema::hasColumn('activities', 'description')) {
                $table->text('description')->nullable();
            }
        });

        // 2. Gallery Items updates
        Schema::table('gallery_items', function (Blueprint $table) {
            if (!Schema::hasColumn('gallery_items', 'date')) {
                $table->string('date')->nullable();
            }
            if (!Schema::hasColumn('gallery_items', 'description')) {
                $table->text('description')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropColumn(['category', 'video_url', 'description']);
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->dropColumn(['date', 'description']);
        });
    }
};
