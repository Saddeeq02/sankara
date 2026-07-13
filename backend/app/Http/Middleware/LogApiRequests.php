<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LogApiRequests
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        $response = $next($request);

        // Only log API and admin monitoring requests
        if ($request->is('api/*') || $request->is('admin*')) {
            // Calculate duration in milliseconds
            $durationMs = round((microtime(true) - $startTime) * 1000);

            try {
                if (\Schema::hasTable('api_request_logs')) {
                    $url = $request->fullUrl();
                    $url = preg_replace('/token=[^&]+/', 'token=***', $url);
                    $url = preg_replace('/password=[^&]+/', 'password=***', $url);

                    DB::table('api_request_logs')->insert([
                        'method' => $request->method(),
                        'url' => $url,
                        'status_code' => $response->getStatusCode(),
                        'duration_ms' => $durationMs,
                        'ip_address' => $request->ip(),
                        'payload' => json_encode($request->except(['password', 'password_confirmation', 'token'])),
                        'created_at' => now(),
                    ]);
                }
            } catch (\Exception $e) {
                // Fail silently to prevent blocker errors
            }
        }

        return $response;
    }
}
