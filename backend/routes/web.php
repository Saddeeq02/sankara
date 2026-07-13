<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin', function (Request $request) {
    $token = $request->query('token');
    $expectedToken = 'sankara_super_secret_token_123';
    
    if ($token !== $expectedToken) {
        return response('Unauthorized. Secret Developer Access Required.', 401);
    }
    
    // Fetch initial website logs directly from database
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
        // Table might not exist yet
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
    
    return view('developer_dashboard', [
        'token' => $token,
        'dbStatus' => $dbStatus,
        'dbMsg' => $dbMsg,
        'initialLogs' => $logs
    ]);
});
