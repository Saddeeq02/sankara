<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\JsonDB;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        
        $user = User::where('email', $credentials['email'])->first();

        if ($user && Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'success' => true, 
                'api_token' => $user->api_token,
                'user' => [
                    'email' => $user->email,
                    'name' => $user->name,
                    'permissions' => $user->permissions
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
        
        $user = User::where('api_token', $token)->first();
        
        if ($user) {
            return response()->json([
                'success' => true,
                'user' => [
                    'email' => $user->email,
                    'name' => $user->name,
                    'permissions' => $user->permissions
                ]
            ]);
        }
        
        return response()->json(['success' => false], 401);
    }
}

