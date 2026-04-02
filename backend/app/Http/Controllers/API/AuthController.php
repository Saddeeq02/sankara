<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\JsonDB;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $db = JsonDB::read();
        
        foreach ($db['users'] as $user) {
            if ($user['email'] === $credentials['email'] && $user['password'] === $credentials['password']) {
                return response()->json([
                    'success' => true, 
                    'api_token' => $user['api_token'],
                    'user' => [
                        'email' => $user['email']
                    ]
                ]);
            }
        }
        
        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    public function check(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['success' => false], 401);
        }
        
        $db = JsonDB::read();
        foreach ($db['users'] as $user) {
            if ($user['api_token'] === $token) {
                return response()->json(['success' => true]);
            }
        }
        
        return response()->json(['success' => false], 401);
    }
}
