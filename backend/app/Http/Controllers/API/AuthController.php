<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\JsonDB;

use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        
        // Find user by email (For now, we compare passwords directly to match current JsonDB behavior)
        // In a real app, use Hash::check()
        $user = User::where('email', $credentials['email'])
                    ->where('password', $credentials['password'])
                    ->first();

        if ($user) {
            return response()->json([
                'success' => true, 
                'api_token' => $user->api_token,
                'user' => [
                    'email' => $user->email
                ]
            ]);
        }
        
        return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
    }

    public function check(Request $request)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['success' => false], 401);
        }
        
        $exists = User::where('api_token', $token)->exists();
        
        if ($exists) {
            return response()->json(['success' => true]);
        }
        
        return response()->json(['success' => false], 401);
    }
}

