<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category', 'price', 'description', 'image', 'images', 'specs', 'status', 'is_new_arrival', 'task'];

    protected $casts = [
        'images' => 'array',
        'specs' => 'array',
        'is_new_arrival' => 'boolean',
    ];

}

