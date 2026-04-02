<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;

class PortfolioProjectController extends Controller
{
    public function index()
    {
        return response()->json(PortfolioProject::all());
    }

    public function show(PortfolioProject $portfolioProject)
    {
        return response()->json($portfolioProject);
    }
}
