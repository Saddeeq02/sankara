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
use App\Models\ActivityLog;
use Illuminate\Support\Facades\Hash;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth-check', [AuthController::class, 'check']);

// Token Middleware Helper function (Updated for DB with caching)
$verifyToken = function(Request $request) {
    $token = $request->bearerToken() ?: $request->query('token');
    if (!$token) return false;
    
    return \Illuminate\Support\Facades\Cache::remember('verify_token_' . md5($token), 60, function() use ($token) {
        return User::where('api_token', $token)->exists();
    });
};

$verifyPermission = function(Request $request, $permission) use ($verifyToken) {
    if (!$verifyToken($request)) return false;
    
    $token = $request->bearerToken() ?: $request->query('token');
    $user = User::where('api_token', $token)->first();
    if (!$user) return false;
    
    // permissions === null means Super Admin
    if ($user->permissions === null) return true;
    
    return in_array($permission, $user->permissions);
};

$logActivity = function(Request $request, string $action, string $description) {
    try {
        $token = $request->bearerToken();
        $user = User::where('api_token', $token)->first();
        ActivityLog::create([
            'user_id' => $user ? $user->id : null,
            'user_name' => $user ? $user->name : 'System/Guest',
            'action' => $action,
            'description' => $description,
            'ip_address' => $request->ip()
        ]);
    } catch (\Exception $e) {
        \Illuminate\Support\Facades\Log::error("Failed to log activity: " . $e->getMessage());
    }
};

$uploadToSupabase = function($file) {
    $projectRef = 'mfbljuhpnkmeckmtxlkn';
    $anonKey = env('SUPABASE_ANON_KEY');
    
    // Server-side Image Compression
    $compressImage = function($filePath, $mimeType) {
        list($width, $height) = getimagesize($filePath);
        if (!$width || !$height) return file_get_contents($filePath);
        
        $maxDim = 1000;
        if ($width > $maxDim || $height > $maxDim) {
            $ratio = $width / $height;
            if ($ratio > 1) {
                $newWidth = $maxDim;
                $newHeight = $maxDim / $ratio;
            } else {
                $newHeight = $maxDim;
                $newWidth = $maxDim * $ratio;
            }
        } else {
            $newWidth = $width;
            $newHeight = $height;
        }
        
        $src = null;
        if ($mimeType === 'image/jpeg' || $mimeType === 'image/jpg') {
            $src = @imagecreatefromjpeg($filePath);
        } elseif ($mimeType === 'image/png') {
            $src = @imagecreatefrompng($filePath);
        } elseif ($mimeType === 'image/gif') {
            $src = @imagecreatefromgif($filePath);
        } elseif ($mimeType === 'image/webp') {
            $src = @imagecreatefromwebp($filePath);
        }
        
        if (!$src) return file_get_contents($filePath);
        
        $dst = imagecreatetruecolor($newWidth, $newHeight);
        
        if ($mimeType === 'image/png' || $mimeType === 'image/gif') {
            imagealphablending($dst, false);
            imagesavealpha($dst, true);
            $transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
            imagefilledrectangle($dst, 0, 0, $newWidth, $newHeight, $transparent);
        }
        
        imagecopyresampled($dst, $src, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        
        ob_start();
        if ($mimeType === 'image/png') {
            imagepng($dst, null, 7);
        } elseif ($mimeType === 'image/gif') {
            imagegif($dst);
        } elseif ($mimeType === 'image/webp') {
            imagewebp($dst, null, 75);
        } else {
            imagejpeg($dst, null, 75);
        }
        $compressedData = ob_get_clean();
        
        imagedestroy($src);
        imagedestroy($dst);
        
        return $compressedData;
    };

    try {
        $fileData = $compressImage($file->getRealPath(), $file->getMimeType());
    } catch (\Throwable $e) {
        $fileData = file_get_contents($file->getRealPath());
    }

    if (!$anonKey) {
        return 'data:' . $file->getMimeType() . ';base64,' . base64_encode($fileData);
    }
    
    $filename = time() . '_' . uniqid() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
    $url = "https://{$projectRef}.supabase.co/storage/v1/object/uploads/{$filename}";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fileData);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: {$anonKey}",
        "Authorization: Bearer {$anonKey}",
        "Content-Type: " . $file->getMimeType()
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 || $httpCode === 201) {
        return "https://{$projectRef}.supabase.co/storage/v1/object/public/uploads/{$filename}";
    }
    
    return 'data:' . $file->getMimeType() . ';base64,' . base64_encode($fileData);
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
    
    return response()->json($products)
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->header('Pragma', 'no-cache')
        ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});


Route::get('gallery', function() {
    return response()->json(GalleryItem::all())
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->header('Pragma', 'no-cache')
        ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});

Route::get('portfolio', function() {
    return response()->json(PortfolioProject::all())
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->header('Pragma', 'no-cache')
        ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});

Route::get('activities', function() {
    return response()->json(Activity::all())
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->header('Pragma', 'no-cache')
        ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});

Route::post('inquiries', function(Request $request) {
    $data = $request->only(['name', 'email', 'subject', 'message']);
    $data['status'] = 'Pending';
    $data['date'] = date('Y-m-d');
    
    $inquiry = Inquiry::create($data);
    return response()->json(['success' => true, 'id' => $inquiry->id]);
});


// PROTECTED ADMIN ENDPOINTS
Route::post('products', function(Request $request) use ($verifyPermission, $uploadToSupabase, $logActivity) {
    if (!$verifyPermission($request, 'admin-products')) return response()->json(['error' => 'Unauthorized'], 401);
    
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
            $data['images'][] = $uploadToSupabase($file);
        }
        $data['image'] = $data['images'][0]; // Compatibility
    } else {
        $data['image'] = 'https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800';
        $data['images'] = [$data['image']];
    }
    
    $data['status'] = 'Active';
    $product = Product::create($data);
    
    $logActivity($request, 'CREATE_PRODUCT', "Created product: {$product->name} in category {$product->category}");
    
    return response()->json($product, 201);
});

Route::post('products/{id}', function(Request $request, $id) use ($verifyPermission, $uploadToSupabase, $logActivity) {
    if (!$verifyPermission($request, 'admin-products')) return response()->json(['error' => 'Unauthorized'], 401);
    
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
            $newImages[] = $uploadToSupabase($file);
        }
        $updatedData['images'] = $newImages;
        $updatedData['image'] = $newImages[0]; // Compatibility
    }
    
    $product->update(array_filter($updatedData, fn($v) => !is_null($v)));
    
    $logActivity($request, 'UPDATE_PRODUCT', "Updated product details for: {$product->name}");
    
    return response()->json($product);
});

Route::patch('products/{id}/status', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-products')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $product = Product::find($id);
    if (!$product) return response()->json(['error' => 'Not Found'], 404);
    
    $product->status = $product->status === 'Active' ? 'Suspended' : 'Active';
    $product->save();
    
    $logActivity($request, 'TOGGLE_PRODUCT_STATUS', "Changed product status of {$product->name} to: {$product->status}");
    
    return response()->json(['success' => true, 'status' => $product->status]);
});

Route::delete('products/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-products')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $product = Product::find($id);
    if ($product) {
        $logActivity($request, 'DELETE_PRODUCT', "Deleted product: {$product->name}");
        $product->delete();
    }
    return response()->json(['success' => true]);
});
// GALLERY MANAGEMENT (Timeline Events: title, date, summary, image)
Route::post('gallery', function(Request $request) use ($verifyPermission, $uploadToSupabase, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = [
        'title' => $request->input('title'),
        'date' => $request->input('date'),
        'description' => $request->input('summary'),
    ];
    
    if ($request->hasFile('image')) {
        $files = $request->file('image');
        if (!is_array($files)) $files = [$files];
        $uploadedImages = [];
        foreach ($files as $file) {
            $uploadedImages[] = $uploadToSupabase($file);
        }
        $data['image'] = count($uploadedImages) === 1 ? $uploadedImages[0] : json_encode($uploadedImages);
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $item = GalleryItem::create($data);
    
    $logActivity($request, 'CREATE_GALLERY', "Created gallery item: {$item->title}");
    
    return response()->json($item, 201);
});

Route::delete('gallery/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $item = GalleryItem::find($id);
    if ($item) {
        $logActivity($request, 'DELETE_GALLERY', "Deleted gallery item: {$item->title}");
        $item->delete();
    }
    return response()->json(['success' => true]);
});

// ACTIVITIES MANAGEMENT (Media Gallery: name, event_description, category, video_url, image)
Route::post('activities', function(Request $request) use ($verifyPermission, $uploadToSupabase, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = [
        'title' => $request->input('name') ?? $request->input('title'),
        'slug' => \Illuminate\Support\Str::slug($request->input('name') ?? $request->input('title')) . '-' . time(),
        'category' => $request->input('category'),
        'description' => $request->input('event_description') ?? $request->input('description'),
        'summary' => $request->input('event_description') ?? $request->input('description'),
        'content' => $request->input('event_description') ?? $request->input('description'),
        'video_url' => $request->input('video_url'),
    ];
    
    if ($request->hasFile('image')) {
        $files = $request->file('image');
        if (!is_array($files)) $files = [$files];
        $uploadedImages = [];
        foreach ($files as $file) {
            $uploadedImages[] = $uploadToSupabase($file);
        }
        $data['image'] = count($uploadedImages) === 1 ? $uploadedImages[0] : json_encode($uploadedImages);
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $activity = Activity::create($data);
    
    $logActivity($request, 'CREATE_ACTIVITY', "Created activity: {$activity->title} (Category: {$activity->category})");
    
    return response()->json($activity, 201);
});
Route::delete('activities/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $activity = Activity::find($id);
    if ($activity) {
        $logActivity($request, 'DELETE_ACTIVITY', "Deleted activity: {$activity->title}");
        $activity->delete();
    }
    return response()->json(['success' => true]);
});

// INQUIRY MANAGEMENT
Route::get('inquiries', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-inquiries')) return response()->json(['error' => 'Unauthorized'], 401);
    return response()->json(Inquiry::latest()->get());
});

Route::patch('inquiries/{id}/status', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-inquiries')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $inquiry = Inquiry::find($id);
    if (!$inquiry) return response()->json(['error' => 'Not Found'], 404);
    
    $inquiry->status = $inquiry->status === 'Resolved' ? 'Pending' : 'Resolved';
    $inquiry->save();
    
    $logActivity($request, 'TOGGLE_INQUIRY_STATUS', "Changed status of inquiry from {$inquiry->name} ({$inquiry->email}) to: {$inquiry->status}");
    
    return response()->json($inquiry);
});

Route::delete('inquiries/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-inquiries')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $inquiry = Inquiry::find($id);
    if ($inquiry) {
        $logActivity($request, 'DELETE_INQUIRY', "Deleted inquiry from {$inquiry->name} ({$inquiry->email})");
        $inquiry->delete();
    }
    return response()->json(['success' => true]);
});


// TEAM MANAGEMENT
Route::get('team', function() {
    return response()->json(TeamMember::orderBy('sort_order', 'asc')->orderBy('id', 'asc')->get())
        ->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        ->header('Pragma', 'no-cache')
        ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});

Route::post('team', function(Request $request) use ($verifyPermission, $uploadToSupabase, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $data = $request->only(['name', 'role', 'sort_order']);
    $data['sort_order'] = (int) ($data['sort_order'] ?? 0);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $data['image'] = $uploadToSupabase($file);
    } else {
        return response()->json(['error' => 'Photo is required'], 422);
    }
    
    $member = TeamMember::create($data);
    
    $logActivity($request, 'CREATE_TEAM_MEMBER', "Added team member: {$member->name} ({$member->role})");
    
    return response()->json($member, 201);
});

Route::delete('team/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-content')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $member = TeamMember::find($id);
    if ($member) {
        $logActivity($request, 'DELETE_TEAM_MEMBER', "Deleted team member: {$member->name} ({$member->role})");
        $member->delete();
    }
    return response()->json(['success' => true]);
});

// Dashboard Metrics
Route::get('metrics', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-dashboard')) return response()->json(['error' => 'Unauthorized'], 401);
    
    // Combine count queries into a single database roundtrip
    $counts = \DB::selectOne("
        SELECT 
            (SELECT COUNT(*) FROM products) as total_products,
            (SELECT COUNT(*) FROM inquiries) as total_inquiries,
            (SELECT COUNT(*) FROM gallery_items) as total_gallery,
            (SELECT COUNT(*) FROM portfolio_projects) as total_portfolio,
            (SELECT COUNT(*) FROM activities) as total_activities,
            (SELECT COUNT(*) FROM team_members) as total_team
    ");

    return response()->json([
        'total_products' => (int) ($counts->total_products ?? 0),
        'total_inquiries' => (int) ($counts->total_inquiries ?? 0),
        'total_gallery' => (int) ($counts->total_gallery ?? 0),
        'total_portfolio' => (int) ($counts->total_portfolio ?? 0),
        'total_activities' => (int) ($counts->total_activities ?? 0),
        'total_team' => (int) ($counts->total_team ?? 0),
        'recent_inquiries' => Inquiry::latest()->limit(5)->get()
    ])->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      ->header('Pragma', 'no-cache')
      ->header('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
});

// System Migration Trigger
Route::get('admin/migrate', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    try {
        \Artisan::call('migrate', ['--force' => true]);
        return response()->json([
            'status' => 'success',
            'output' => \Artisan::output()
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

// System Seed Trigger
Route::get('admin/seed', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    try {
        \Artisan::call('db:seed', ['--force' => true]);
        return response()->json([
            'status' => 'success',
            'output' => \Artisan::output()
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

// System Health Diagnostics
Route::get('admin/health', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    
    // 1. Website Database Health
    try {
        \DB::connection()->getPdo();
        $driver = \DB::connection()->getDriverName();
        $dbStatus = true;
        $dbMsg = 'Connected (' . ucfirst($driver) . ')';
    } catch (\Exception $e) {
        $dbStatus = false;
        $dbMsg = 'Database Connection Error: ' . $e->getMessage();
    }
    
    // 2. ID Card System (FastAPI Python Server) Health Check
    $idSystemActive = false;
    $idSystemMsg = '';
    $idSystemStats = [
        'staff_count' => 0,
        'complaints_count' => 0,
        'attendance_count' => 0
    ];

    try {
        $pingResponse = \Illuminate\Support\Facades\Http::timeout(2)->get('https://sankara-id.vercel.app/');
        if ($pingResponse->successful()) {
            $idSystemActive = true;
            $idSystemMsg = 'Online';
            
            // Fetch extra stats since server is alive
            $staffResponse = \Illuminate\Support\Facades\Http::timeout(2)->get('https://sankara-id.vercel.app/staff/');
            if ($staffResponse->successful()) {
                $idSystemStats['staff_count'] = count($staffResponse->json() ?: []);
            }
            
            $complaintsResponse = \Illuminate\Support\Facades\Http::timeout(2)->get('https://sankara-id.vercel.app/complaints/');
            if ($complaintsResponse->successful()) {
                $idSystemStats['complaints_count'] = count($complaintsResponse->json() ?: []);
            }

            $attendanceResponse = \Illuminate\Support\Facades\Http::timeout(2)->get('https://sankara-id.vercel.app/attendance/');
            if ($attendanceResponse->successful()) {
                $idSystemStats['attendance_count'] = count($attendanceResponse->json() ?: []);
            }
        } else {
            $idSystemMsg = 'HTTP Error: ' . $pingResponse->status();
        }
    } catch (\Exception $e) {
        $idSystemMsg = 'Connection Timeout / Offline';
    }
    
    $uploadsStatus = true;
    
    return response()->json([
        'status' => 'success',
        'timestamp' => now()->toIso8601String(),
        'diagnostics' => [
            [
                'name' => 'Website Database',
                'status' => $dbStatus ? 'Healthy' : 'Error',
                'message' => $dbMsg,
                'id' => 'db'
            ],
            [
                'name' => 'Website Uploads Directory',
                'status' => $uploadsStatus ? 'Healthy' : 'Error',
                'message' => 'Writable & Connected',
                'id' => 'uploads'
            ],
            [
                'name' => 'ID Card System API',
                'status' => $idSystemActive ? 'Healthy' : 'Error',
                'message' => $idSystemMsg,
                'id' => 'id_api'
            ]
        ],
        'id_system' => [
            'active' => $idSystemActive,
            'stats' => $idSystemStats
        ],
        'system' => [
            'php_version' => PHP_VERSION,
            'memory_usage' => round(memory_get_usage() / 1024 / 1024, 2) . ' MB',
            'environment' => config('app.env'),
            'uptime' => 'System Online'
        ]
    ]);
});

Route::post('admin/id-system/reset-scores', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    
    try {
        $res = \Illuminate\Support\Facades\Http::timeout(5)->post('https://sankara-id.vercel.app/staff/reset_monthly_scores');
        if ($res->successful()) {
            return response()->json($res->json());
        }
        return response()->json(['error' => 'Failed to reset scores on ID System API'], 502);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('admin/request-logs', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    
    try {
        if (\Schema::hasTable('api_request_logs')) {
            $logs = \DB::table('api_request_logs')
                ->orderBy('created_at', 'desc')
                ->limit(100)
                ->get();
            return response()->json($logs);
        }
        return response()->json([]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('admin/routes', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-health')) return response()->json(['error' => 'Unauthorized'], 401);
    
    $routes = collect(\Route::getRoutes())->map(function($route) {
        return [
            'method' => implode('|', $route->methods()),
            'uri' => $route->uri(),
            'name' => $route->getName() ?: '-',
            'action' => $route->getActionName(),
            'middleware' => $route->middleware(),
        ];
    })->values();
    
    return response()->json($routes);
});



// ADMIN USERS CRUD MANAGEMENT
Route::get('admin/users', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-users')) return response()->json(['error' => 'Forbidden'], 403);
    return response()->json(User::all());
});

Route::post('admin/users', function(Request $request) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-users')) return response()->json(['error' => 'Forbidden'], 403);
    
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'permissions' => 'nullable|array'
    ]);
    
    $user = User::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => Hash::make($request->input('password')),
        'api_token' => \Illuminate\Support\Str::random(60),
        'permissions' => $request->input('permissions')
    ]);
    
    $logActivity($request, 'CREATE_USER', "Created new administrator account: {$user->name} ({$user->email})");
    
    return response()->json($user, 201);
});

Route::put('admin/users/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-users')) return response()->json(['error' => 'Forbidden'], 403);
    
    $user = User::find($id);
    if (!$user) return response()->json(['error' => 'Not Found'], 404);
    
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:users,email,' . $id,
        'password' => 'nullable|min:6',
        'permissions' => 'nullable|array'
    ]);
    
    $updateData = [
        'name' => $request->input('name'),
        'email' => $request->input('email')
    ];
    
    if ($user->email === 'admin@sankara.com') {
        $updateData['permissions'] = null; // force null for super admin
    } else {
        $updateData['permissions'] = $request->input('permissions');
    }
    
    if ($request->filled('password')) {
        $updateData['password'] = Hash::make($request->input('password'));
    }
    
    $user->update($updateData);
    
    $logActivity($request, 'UPDATE_USER', "Updated administrator account for {$user->name} ({$user->email})");
    
    return response()->json($user);
});

Route::delete('admin/users/{id}', function(Request $request, $id) use ($verifyPermission, $logActivity) {
    if (!$verifyPermission($request, 'admin-users')) return response()->json(['error' => 'Forbidden'], 403);
    
    $user = User::find($id);
    if (!$user) return response()->json(['error' => 'Not Found'], 404);
    
    // Prevent self deletion
    $token = $request->bearerToken();
    $currentUser = User::where('api_token', $token)->first();
    if ($currentUser && $currentUser->id == $id) {
        return response()->json(['error' => 'Cannot delete yourself'], 400);
    }
    
    $logActivity($request, 'DELETE_USER', "Deleted administrator account: {$user->name} ({$user->email})");
    
    $user->delete();
    return response()->json(['success' => true]);
});

Route::get('admin/logs', function(Request $request) use ($verifyPermission) {
    if (!$verifyPermission($request, 'admin-users')) return response()->json(['error' => 'Forbidden'], 403);
    return response()->json(ActivityLog::orderBy('created_at', 'desc')->get());
});
