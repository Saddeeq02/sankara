<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->text('image')->nullable()->change();
        });

        Schema::table('gallery_items', function (Blueprint $table) {
            $table->text('image')->nullable()->change();
        });

        Schema::table('portfolio_projects', function (Blueprint $table) {
            $table->text('image')->nullable()->change();
        });

        Schema::table('activities', function (Blueprint $table) {
            $table->text('image')->nullable()->change();
        });

        Schema::table('team_members', function (Blueprint $table) {
            $table->text('image')->nullable()->change();
        });
    }

    public function down(): void
    {
        // No rollback needed as text covers string
    }
};
