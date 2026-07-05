<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->report(function (\Throwable $e) {
            echo "<h1>ORIGINAL EXCEPTION</h1>";
            echo "<p><b>Class:</b> " . get_class($e) . "</p>";
            echo "<p><b>Message:</b> " . $e->getMessage() . "</p>";
            echo "<p><b>File:</b> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
            echo "<pre>" . $e->getTraceAsString() . "</pre>";
            exit;
        });
    })->create();
