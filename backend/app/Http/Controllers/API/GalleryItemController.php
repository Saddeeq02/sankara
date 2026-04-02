<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    public function index()
    {
        return response()->json(GalleryItem::all());
    }

    public function show(GalleryItem $galleryItem)
    {
        return response()->json($galleryItem);
    }
}
