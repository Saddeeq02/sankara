<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    if (!defined('LARAVEL_START')) {
        define('LARAVEL_START', microtime(true));
    }
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    
    // Dump Request Info
    echo "<h1>Request Info</h1>";
    echo "<p><b>REQUEST_URI:</b> " . ($_SERVER['REQUEST_URI'] ?? 'N/A') . "</p>";
    echo "<p><b>SCRIPT_NAME:</b> " . ($_SERVER['SCRIPT_NAME'] ?? 'N/A') . "</p>";
    echo "<p><b>PATH_INFO:</b> " . ($_SERVER['PATH_INFO'] ?? 'N/A') . "</p>";
    echo "<p><b>PHP_SELF:</b> " . ($_SERVER['PHP_SELF'] ?? 'N/A') . "</p>";
    
    // Boot the application kernel so routes are loaded
    $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    
    // List Registered Routes
    echo "<h1>Registered Routes</h1>";
    $routeCollection = $app->make('router')->getRoutes();
    echo "<table border='1' cellpadding='5' cellspacing='0'>";
    echo "<tr><th>Method</th><th>URI</th><th>Name</th><th>Action</th></tr>";
    foreach ($routeCollection as $route) {
        echo "<tr>";
        echo "<td>" . implode('|', $route->methods()) . "</td>";
        echo "<td>" . $route->uri() . "</td>";
        echo "<td>" . ($route->getName() ?? 'N/A') . "</td>";
        echo "<td>" . (is_string($route->getActionName()) ? $route->getActionName() : 'Closure') . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    
} catch (\Throwable $e) {
    echo "<h1>Laravel Exception</h1>";
    echo "<p><b>Class:</b> " . get_class($e) . "</p>";
    echo "<p><b>Message:</b> " . $e->getMessage() . "</p>";
    echo "<p><b>File:</b> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
