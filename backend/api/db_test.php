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
    echo "<h1>Laravel Boot Exception</h1>";
    echo "<p><b>Message:</b> " . $e->getMessage() . "</p>";
    echo "<p><b>File:</b> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
