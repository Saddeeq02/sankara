<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
try {
    $kernel->call('migrate', ['--force' => true, '--quiet' => true]);
    echo "Migration exit code: " . $kernel->output() . "\nDone.\n";
} catch (\Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
