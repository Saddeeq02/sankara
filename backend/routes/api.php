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
Route::post('inquiries', function(Request $request) {
    $db = JsonDB::read();
    $inquiry = $request->all();
    $inquiry['id'] = count($db['inquiries']) + 1;
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

// Dashboard Metrics
Route::get('metrics', function(Request $request) use ($verifyToken) {
    if (!$verifyToken($request)) return response()->json(['error' => 'Unauthorized'], 401);
    
    $db = JsonDB::read();
    return response()->json([
        'total_products' => count($db['products']),
        'total_inquiries' => count($db['inquiries']),
        'recent_inquiries' => array_slice(array_reverse($db['inquiries']), 0, 5)
    ]);
});
