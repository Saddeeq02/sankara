<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    if (!defined('LARAVEL_START')) {
        define('LARAVEL_START', microtime(true));
    }
    require __DIR__.'/../vendor/autoload.php';
    $app = require_once __DIR__.'/../bootstrap/app.php';
    $app->handleRequest(\Illuminate\Http\Request::capture());
} catch (\Throwable $e) {
    echo "<h1>Laravel Boot Exception Chain</h1>";
    
    $current = $e;
    $index = 0;
    while ($current) {
        echo "<h3>Exception #$index</h3>";
        echo "<p><b>Class:</b> " . get_class($current) . "</p>";
        echo "<p><b>Message:</b> " . $current->getMessage() . "</p>";
        echo "<p><b>File:</b> " . $current->getFile() . " on line " . $current->getLine() . "</p>";
        echo "<pre>" . $current->getTraceAsString() . "</pre>";
        echo "<hr>";
        $current = $current->getPrevious();
        $index++;
    }
}
