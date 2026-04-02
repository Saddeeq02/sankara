<?php
namespace App\Helpers;

class JsonDB
{
    private static function getPath()
    {
        return storage_path('app/db.json');
    }

    public static function read()
    {
        $path = self::getPath();
        if (!file_exists($path)) {
            $defaultData = [
                'users' => [
                    [
                        'id' => 1, 
                        'email' => 'admin@sankara.com', 
                        'password' => 'sankara2026', 
                        'api_token' => 'sankara_super_secret_token_123'
                    ]
                ],
                'products' => [
                    [
                        'id' => 1,
                        'name' => 'Massey Ferguson 385',
                        'category' => 'Tractors',
                        'price' => '15,000,000 NGN',
                        'status' => 'Active'
                    ]
                ],
                'inquiries' => [
                    [
                        'id' => 1,
                        'name' => 'John Doe',
                        'email' => 'john@example.com',
                        'subject' => 'Tractor Quote',
                        'status' => 'Pending',
                        'date' => date('Y-m-d')
                    ]
                ],
                'gallery' => []
            ];
            file_put_contents($path, json_encode($defaultData, JSON_PRETTY_PRINT));
            return $defaultData;
        }
        return json_decode(file_get_contents($path), true);
    }

    public static function write($data)
    {
        file_put_contents(self::getPath(), json_encode($data, JSON_PRETTY_PRINT));
    }
}
