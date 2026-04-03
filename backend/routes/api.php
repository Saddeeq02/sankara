<?php

use App\Http\Controllers\API\AuthController;
use App\Helpers\JsonDB;
use Illuminate\Http\Request;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/auth-check', [AuthController::class, 'check']);

// Token Middleware Helper function
$verifyToken = function(Request $request) {
    if (!$request->bearerToken()) return false;
    $db = JsonDB::read();
    foreach ($db['users'] as $u) {
        if ($u['api_token'] === $request->bearerToken()) return true;
    }
    return false;
};

// PUBLIC ENDPOINTS
Route::get('products', function(Request $request) {
    $db = JsonDB::read();
    $showAll = $request->query('all') === '1';
    
    $products = array_values(array_filter($db['products'], function($p) use ($showAll) {
        if ($showAll) return true;
        return ($p['status'] ?? 'Active') === 'Active';
    }));
    return response()->json($products);
});
Route::get('gallery', function() {
    return response()->json(JsonDB::read()['gallery']);
});
Route::get('portfolio', function() {
    $db = JsonDB::read();
    return response()->json($db['portfolio'] ?? []);
});
Route::get('activities', function() {
    $db = JsonDB::read();
    return response()->json($db['activities'] ?? []);
});
Route::post('inquiries', function(Request $request) {
    $db = JsonDB::read();
    $inquiry = $request->all();
    $inquiry['id'] = (count($db['inquiries'] ?? []) > 0) ? max(array_column($db['inquiries'], 'id')) + 1 : 1;
    $inquiry['status'] = 'Pending';
    $inquiry['date'] = date('Y-m-d');
    $db['inquiries'][] = $inquiry;
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// PROTECTED ADMIN ENDPOINTS
Route::post('products', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $data = $request->only(['name', 'category', 'price', 'description']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = 'http://localhost:8080/uploads/' . $filename;
    } else {
        $data['image'] = 'https://images.unsplash.com/photo-1594411139708-ba98d5f30e06?auto=format&fit=crop&q=80&w=800'; // Default placeholder
    }
    
    $data['id'] = count($db['products']) > 0 ? max(array_column($db['products'], 'id')) + 1 : 1;
    $data['status'] = 'Active';
    $db['products'][] = $data;
    JsonDB::write($db);
    
    return response()->json($data, 201);
});

Route::post('products/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    foreach ($db['products'] as &$product) {
        if ((string)$product['id'] === (string)$id) {
            $updatedData = $request->only(['name', 'category', 'price', 'description', 'status']);
            foreach ($updatedData as $key => $val) {
                if ($val !== null) $product[$key] = $val;
            }
            
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
                $file->move(public_path('uploads'), $filename);
                $product['image'] = 'http://localhost:8080/uploads/' . $filename;
            }
            
            JsonDB::write($db);
            return response()->json($product);
        }
    }
    return response()->json(['error' => 'Not Found'], 404);
});

Route::patch('products/{id}/status', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    foreach ($db['products'] as &$product) {
        if ((string)$product['id'] === (string)$id) {
            $product['status'] = $product['status'] === 'Active' ? 'Suspended' : 'Active';
            JsonDB::write($db);
            return response()->json(['success' => true, 'status' => $product['status']]);
        }
    }
    return response()->json(['error' => 'Not Found'], 404);
});

Route::delete('products/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['products'] = array_values(array_filter($db['products'], function($p) use ($id) {
        return (string)$p['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// GALLERY MANAGEMENT
Route::post('gallery', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $data = $request->only(['title', 'category', 'video_url']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'gallery_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = 'http://localhost:8080/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $data['id'] = count($db['gallery']) > 0 ? max(array_column($db['gallery'], 'id')) + 1 : 1;
    $db['gallery'][] = $data;
    JsonDB::write($db);
    
    return response()->json($data, 201);
});

Route::delete('gallery/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['gallery'] = array_values(array_filter($db['gallery'], function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// PORTFOLIO MANAGEMENT
Route::post('portfolio', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $data = $request->only(['title', 'client', 'year', 'description']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'portfolio_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = 'http://localhost:8080/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Image is required'], 422);
    }
    
    $portfolio = $db['portfolio'] ?? [];
    $data['id'] = (count($portfolio) > 0) ? max(array_column($portfolio, 'id')) + 1 : 1;
    $db['portfolio'][] = $data;
    JsonDB::write($db);
    return response()->json($data, 201);
});

Route::delete('portfolio/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['portfolio'] = array_values(array_filter($db['portfolio'] ?? [], function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// ACTIVITIES MANAGEMENT
Route::post('activities', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $data = $request->only(['title', 'date', 'summary']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'activity_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = 'http://localhost:8080/uploads/' . $filename;
    } else {
        $data['image'] = null; // Activities can be text-only if needed
    }
    
    $activities = $db['activities'] ?? [];
    $data['id'] = (count($activities) > 0) ? max(array_column($activities, 'id')) + 1 : 1;
    $db['activities'][] = $data;
    JsonDB::write($db);
    return response()->json($data, 201);
});

Route::delete('activities/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['activities'] = array_values(array_filter($db['activities'] ?? [], function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// INQUIRY MANAGEMENT
Route::get('inquiries', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    return response()->json(array_reverse($db['inquiries'] ?? []));
});

Route::patch('inquiries/{id}/status', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    foreach ($db['inquiries'] as &$inquiry) {
        if ((string)$inquiry['id'] === (string)$id) {
            $inquiry['status'] = $inquiry['status'] === 'Resolved' ? 'Pending' : 'Resolved';
            JsonDB::write($db);
            return response()->json($inquiry);
        }
    }
    return response()->json(['error' => 'Not Found'], 404);
});

Route::delete('inquiries/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['inquiries'] = array_values(array_filter($db['inquiries'] ?? [], function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// TEAM MANAGEMENT
Route::get('team', function() {
    $db = JsonDB::read();
    return response()->json($db['team'] ?? []);
});

Route::post('team', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $data = $request->only(['name', 'role']);
    
    if ($request->hasFile('image')) {
        $file = $request->file('image');
        $filename = 'team_' . time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
        $file->move(public_path('uploads'), $filename);
        $data['image'] = 'http://localhost:8080/uploads/' . $filename;
    } else {
        return response()->json(['error' => 'Photo is required'], 422);
    }
    
    $team = $db['team'] ?? [];
    $data['id'] = (count($team) > 0) ? max(array_column($team, 'id')) + 1 : 1;
    $db['team'][] = $data;
    JsonDB::write($db);
    return response()->json($data, 201);
});

Route::delete('team/{id}', function(Request $request, $id) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    $db['team'] = array_values(array_filter($db['team'] ?? [], function($item) use ($id) {
        return (string)$item['id'] !== (string)$id;
    }));
    JsonDB::write($db);
    return response()->json(['success' => true]);
});

// Dashboard Metrics
Route::get('metrics', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    return response()->json([
        'total_products' => count($db['products']),
        'total_inquiries' => count($db['inquiries']),
        'total_gallery' => count($db['gallery']),
        'total_portfolio' => count($db['portfolio']),
        'total_activities' => count($db['activities']),
        'total_team' => count($db['team'] ?? []),
        'recent_inquiries' => array_slice(array_reverse($db['inquiries']), 0, 5)
    ]);
});
