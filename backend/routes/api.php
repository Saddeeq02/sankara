<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\GalleryItem;
use App\Models\PortfolioProject;
use App\Models\Activity;
use App\Models\Inquiry;
use App\Models\User;
use App\Models\TeamMember;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth-check', [AuthController::class, 'check']);

// Token Middleware Helper function (Updated for DB)
$verifyToken = function(Request $request) {
    if (!$request->bearerToken()) return false;
    return User::where('api_token', $request->bearerToken())->exists();
};

// PUBLIC ENDPOINTS
Route::get('products', function(Request $request) {
    $showAll = $request->query('all') === '1';
    $isNewArrival = $request->query('new_arrival') === '1';
    
    $query = Product::query();
    
    if (!$showAll) {
        $query->where('status', 'Active');
    }
    
    if ($isNewArrival) {
        $query->where('is_new_arrival', true);
    }
    
    $products = $query->orderBy('created_at', 'desc')->get();
    
    return response()->json($products);
});


Route::get('gallery', function() {
    return response()->json(GalleryItem::all());
});

Route::get('portfolio', function() {
    return response()->json(PortfolioProject::all());
});

Route::get('activities', function() {
    return response()->json(Activity::all());
});

Route::post('inquiries', function(Request $request) {
    $data = $request->only(['name', 'email', 'subject', 'message']);
    $data['status'] = 'Pending';
    $data['date'] = date('Y-m-d');
    
    $inquiry = Inquiry::create($data);
    return response()->json(['success' => true, 'id' => $inquiry->id]);
});


// PROTECTED ADMIN ENDPOINTS
Route::post('products', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['name', 'category', 'price', 'description', 'task']);
    $data['is_new_arrival'] = $request->input('is_new_arrival') === 'true' || $request->input('is_new_arrival') === '1';
    
    // Handle Specifications
    $specs = $request->input('specs');
    $data['specs'] = $specs ? array_map('trim', explode(',', $specs)) : [];
    
    // Handle Multiple Images
    $data['images'] = [];
    if ($request->hasFile('image')) {
        $files = $request->file('image');
        if (!is_array($files)) $files = [$files];
        foreach ($files as $file) {
            $filename = time() . '_' . uniqid() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads'), $filename);
            $data['images'][] = '/uploads/' . $filename;
        }
        $data['image'] = $data['images'][0]; // Compatibility
    } else {
        $data['image'] = 'https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800';
        $data['images'] = [$data['image']];
    }
    
    $data['status'] = 'Active';
    $product = Product::create($data);
    
    return response()->json($product, 201);
});

Route::post('products/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $product = Product::find($id);
    if (!$product) return response()->json(['error' => 'Not Found'], 404);
    
    $updatedData = $request->only(['name', 'category', 'price', 'description', 'task', 'status']);
    if ($request->has('is_new_arrival')) {
        $updatedData['is_new_arrival'] = $request->input('is_new_arrival') === 'true' || $request->input('is_new_arrival') === '1';
    }
    
    // Handle Specs
    if ($request->has('specs')) {
        $specs = $request->input('specs');
        $updatedData['specs'] = $specs ? array_map('trim', explode(',', $specs)) : [];
    }
    
    // Handle Multiple Images
    if ($request->hasFile('image')) {
        $newImages = [];
        $files = $request->file('image');
        if (!is_array($files)) $files = [$files];
        foreach ($files as $file) {
            $filename = time() . '_' . uniqid() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads'), $filename);
            $newImages[] = '/uploads/' . $filename;
        }
        $updatedData['images'] = $newImages;
        $updatedData['image'] = $newImages[0]; // Compatibility
    }
    
    $product->update(array_filter($updatedData, fn($v) => !is_null($v)));
    
    return response()->json($product);
});

Route::patch('products/{id}/status', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $product = Product::find($id);
    if (!$product) return response()->json(['error' => 'Not Found'], 404);
    
    $product->status = $product->status === 'Active' ? 'Suspended' : 'Active';
    $product->save();
    return response()->json(['success' => true, 'status' => $product->status]);
});

Route::delete('products/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $product = Product::find($id);
    if ($product) $product->delete();
    return response()->json(['success' => true]);
});

// GALLERY MANAGEMENT
Route::post('gallery', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['title', 'category', 'video_url']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'gallery_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = '/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $item = GalleryItem::create($data);
    return response()->json($item, 201);
});

Route::delete('gallery/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $item = GalleryItem::find($id);
    if ($item) $item->delete();
    return response()->json(['success' => true]);
});


// PORTFOLIO MANAGEMENT
Route::post('portfolio', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['title', 'client', 'year', 'description']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'portfolio_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = '/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $project = PortfolioProject::create($data);
    return response()->json($project, 201);
});

Route::delete('portfolio/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $project = PortfolioProject::find($id);
    if ($project) $project->delete();
    return response()->json(['success' => true]);
});

// ACTIVITIES MANAGEMENT
Route::post('activities', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['title', 'date', 'summary']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'activity_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = '/uploads/' . $filename;
    }
    
    $activity = Activity::create($data);
    return response()->json($activity, 201);
});

Route::delete('activities/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $activity = Activity::find($id);
    if ($activity) $activity->delete();
    return response()->json(['success' => true]);
});

// INQUIRY MANAGEMENT
Route::get('inquiries', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    return response()->json(Inquiry::latest()->get());
});

Route::patch('inquiries/{id}/status', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $inquiry = Inquiry::find($id);
    if (!$inquiry) return response()->json(['error' => 'Not Found'], 404);
    
    $inquiry->status = $inquiry->status === 'Resolved' ? 'Pending' : 'Resolved';
    $inquiry->save();
    return response()->json($inquiry);
});

Route::delete('inquiries/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $inquiry = Inquiry::find($id);
    if ($inquiry) $inquiry->delete();
    return response()->json(['success' => true]);
});


// TEAM MANAGEMENT
Route::get('team', function() {
    return response()->json(TeamMember::all());
});

Route::post('team', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['name', 'role', 'phone']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'team_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = '/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Photo is required'], 422);
    }
    
    $member = TeamMember::create($data);
    return response()->json($member, 201);
});

Route::delete('team/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $member = TeamMember::find($id);
    if ($member) $member->delete();
    return response()->json(['success' => true]);
});

// Dashboard Metrics
Route::get('metrics', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    return response()->json([
        'total_products' => Product::count(),
        'total_inquiries' => Inquiry::count(),
        'total_gallery' => GalleryItem::count(),
        'total_portfolio' => PortfolioProject::count(),
        'total_activities' => Activity::count(),
        'total_team' => TeamMember::count(),
        'recent_inquiries' => Inquiry::latest()->limit(5)->get()
    ]);
});

// System Health Diagnostics
Route::get('admin/health', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $uploadsPath = public_path('uploads');
    
    // 1. Database Health
    try {
        \DB::connection()->getPdo();
        $dbStatus = true;
        $dbMsg = 'Connected (PostgreSQL)';
    } catch (\Exception $e) {
        $dbStatus = false;
        $dbMsg = 'Database Connection Error: ' . $e->getMessage();
    }
    
    // 2. File System Health
    if (!file_exists($uploadsPath)) {
        mkdir($uploadsPath, 0755, true);
    }
    $uploadsStatus = is_writable($uploadsPath);
    
    // 3. System Context
    return response()->json([
        'status' => 'success',
        'timestamp' => now()->toIso8601String(),
        'diagnostics' => [
            [
                'name' => 'Database',
                'status' => $dbStatus ? 'Healthy' : 'Error',
                'message' => $dbMsg,
                'id' => 'db'
            ],
            [
                'name' => 'Uploads Directory',
                'status' => $uploadsStatus ? 'Healthy' : 'Error',
                'message' => $uploadsStatus ? 'Writable' : 'Permissions issue at public/uploads',
                'id' => 'uploads'
            ],
            [
                'name' => 'API Endpoint',
                'status' => 'Healthy',
                'message' => 'Responding correctly',
                'id' => 'api'
            ]
        ],
        'system' => [
            'php_version' => PHP_VERSION,
            'memory_usage' => round(memory_get_usage() / 1024 / 1024, 2) . ' MB',
            'environment' => config('app.env'),
            'uptime' => 'System Online'
        ]
    ]);
});

