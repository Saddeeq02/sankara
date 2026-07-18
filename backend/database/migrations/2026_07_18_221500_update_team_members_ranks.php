<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $updates = [
            'Maryam Zubair' => 3,
            'Bello Muhammed Sadiq' => 6,
            'Ado Sankara' => 4,
            'Habib Muhammad Bashir' => 5,
        ];

        foreach ($updates as $name => $rank) {
            DB::table('team_members')
                ->where('name', 'like', '%' . $name . '%')
                ->update(['sort_order' => $rank]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback required for simple data patch
    }
};
