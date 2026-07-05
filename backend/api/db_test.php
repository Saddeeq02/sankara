<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "PHP Version: " . phpversion() . "<br>";
echo "Available PDO Drivers: " . implode(', ', PDO::getAvailableDrivers()) . "<br><br>";

try {
    $host = 'aws-0-eu-central-1.pooler.supabase.com';
    $port = '6543';
    $db   = 'postgres';
    $user = 'postgres.mfbljuhpnkmeckmtxlkn';
    $pass = "Sankara'website1";
    $charset = 'utf8';

    $dsn = "pgsql:host=$host;port=$port;dbname=$db";
    echo "Connecting to DSN: $dsn ...<br>";
    
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    echo "SUCCESS! Connected to Supabase PostgreSQL database successfully.<br>";
    
    $stmt = $pdo->query('SELECT version()');
    $row = $stmt->fetch();
    echo "Database Version: " . $row['version'] . "<br>";
    
} catch (PDOException $e) {
    echo "CONNECTION FAILED: " . $e->getMessage() . "<br>";
}
