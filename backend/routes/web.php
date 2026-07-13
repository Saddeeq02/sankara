<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function (Request $request) {
    // Check if token exists in cookie or query parameter
    $token = $request->cookie('dev_hub_token');
    $queryToken = $request->query('token');
    
    $isAuthenticated = ($token === 'sankara_super_secret_token_123') || ($queryToken === 'sankara_super_secret_token_123');
    
    if (!$isAuthenticated) {
        return view('developer_dashboard', ['isAuthenticated' => false]);
    }
    
    // Set cookie if authenticated via query parameter to persist session
    $cookie = null;
    if ($queryToken === 'sankara_super_secret_token_123') {
        $cookie = cookie('dev_hub_token', 'sankara_super_secret_token_123', 43200); // 30 days
    }
    
    // Fetch initial website logs
    $logs = [];
    try {
        if (\Schema::hasTable('activity_logs')) {
            $logs = \DB::table('activity_logs')
                ->orderBy('created_at', 'desc')
                ->limit(50)
                ->get()
                ->toArray();
        }
    } catch (\Exception $e) {
        // Table might not exist
    }
    
    // Database connection status
    try {
        \DB::connection()->getPdo();
        $dbStatus = 'Healthy';
        $dbMsg = 'Connected (' . ucfirst(\DB::connection()->getDriverName()) . ')';
    } catch (\Exception $e) {
        $dbStatus = 'Error';
        $dbMsg = $e->getMessage();
    }
    
    $response = response()->view('developer_dashboard', [
        'isAuthenticated' => true,
        'token' => 'sankara_super_secret_token_123',
        'dbStatus' => $dbStatus,
        'dbMsg' => $dbMsg,
        'initialLogs' => $logs
    ]);
    
    if ($cookie) {
        $response->cookie($cookie);
    }
    
    return $response;
});

Route::post('/admin/login', function(Request $request) {
    $password = $request->input('password');
    if ($password === 'sankara_super_secret_token_123' || $password === 'sankara123') {
        return redirect('/admin')->cookie(cookie('dev_hub_token', 'sankara_super_secret_token_123', 43200));
    }
    return redirect('/admin?error=invalid');
});

Route::post('/admin/logout', function() {
    return redirect('/admin')->cookie(\Cookie::forget('dev_hub_token'));
});
