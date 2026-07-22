<!DOCTYPE html>
<html lang="en" class="h-full bg-[#f8fafc] text-slate-800">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sankara Dev Hub & System Monitor</title>
    
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                        mono: ['JetBrains Mono', 'monospace'],
                    },
                    colors: {
                        brand: {
                            deep: '#f8fafc',
                            card: '#ffffff',
                            border: '#e2e8f0',
                            primary: '#2563eb',
                            success: '#10b981',
                            danger: '#ef4444',
                            warning: '#f59e0b',
                        }
                    }
                }
            }
        }
    </script>

    <style>
        /* Custom Premium Card styling */
        .glass-panel {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
        }
        
        .glow-button {
            transition: all 0.2s ease;
        }
        .glow-button:hover {
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
            transform: translateY(-1px);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }

        /* Keyframes */
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6)); }
        }
        .live-indicator {
            animation: pulse-glow 2s infinite ease-in-out;
        }
    </style>
</head>
<body class="h-full flex flex-col font-sans selection:bg-blue-600 selection:text-white">

    @if(!$isAuthenticated)
        <!-- LOGIN INTERFACE -->
        <div class="flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden bg-[#f8fafc]">
            <!-- Background Decoration Grid -->
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>
            
            <div class="w-full max-w-md space-y-8 relative z-10">
                <div class="text-center space-y-2">
                    <div class="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
                        <span class="text-3xl font-extrabold text-white">S</span>
                    </div>
                    <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Sankara DevHub</h2>
                    <p class="text-sm text-slate-500">Developer Dashboard Authentication Gate</p>
                </div>

                <div class="glass-panel p-8 rounded-2xl space-y-6">
                    <form action="/admin/login" method="POST" class="space-y-4">
                        @csrf
                        <div>
                            <label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Developer Key / Password</label>
                            <input type="password" name="password" id="password" required placeholder="Enter developer password" 
                                class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400">
                        </div>

                        @if(request()->query('error') === 'invalid')
                            <div class="p-3.5 rounded-xl bg-brand-danger/10 border border-brand-danger/20 text-xs font-semibold text-brand-danger flex items-center gap-2">
                                <span>⚠️</span> Invalid Developer Access Key
                            </div>
                        @endif

                        <button type="submit" class="glow-button w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold tracking-wide shadow-md shadow-blue-500/10 mt-6">
                            Authenticate & Enter
                        </button>
                    </form>
                </div>
            </div>
        </div>
    @else
        <!-- DEVELOPER DASHBOARD INTERFACE -->
        <!-- Top Accent Line -->
        <div class="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

        <!-- Main Navigation / Header -->
        <header class="glass-panel sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/10">
                        <span class="text-xl font-bold text-white">S</span>
                    </div>
                    <div>
                        <h1 class="text-lg font-bold text-slate-900 tracking-tight">Sankara DevHub</h1>
                        <p class="text-xs text-slate-500 font-medium">System Diagnostics & Logs Center</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs">
                        <span class="w-2 h-2 rounded-full bg-brand-success live-indicator"></span>
                        <span class="text-slate-600 font-semibold uppercase tracking-wider">Live Monitoring</span>
                    </div>
                    <button onclick="refreshData()" class="glow-button px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H15m6-10V4m0 0h-5m6 0v5"></path></svg>
                        Refresh
                    </button>
                    
                    <!-- Logout form -->
                    <form action="/admin/logout" method="POST" class="inline">
                        @csrf
                        <button type="submit" class="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-semibold">
                            Exit
                        </button>
                    </form>
                </div>
            </div>
        </header>

        <!-- Main Content Grid -->
        <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <!-- Sidebar Navigation & Quick Health -->
            <div class="lg:col-span-1 space-y-6">
                
                <!-- Category Tabs -->
                <div class="glass-panel rounded-2xl p-4 space-y-2">
                    <button onclick="switchCategory('website')" id="tab-btn-website" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-600 font-semibold text-sm transition-all text-left">
                        <span>🖥️</span> Website Portal
                    </button>
                    <button onclick="switchCategory('id_system')" id="tab-btn-id_system" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all text-left">
                        <span>🆔</span> ID Cards System
                    </button>
                    <button onclick="switchCategory('api_logs')" id="tab-btn-api_logs" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all text-left">
                        <span>⚡</span> API Request Logs
                    </button>
                    <button onclick="switchCategory('endpoints')" id="tab-btn-endpoints" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all text-left">
                        <span>🗺️</span> Route Catalog
                    </button>
                    <button onclick="switchCategory('dev_tools')" id="tab-btn-dev_tools" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 font-semibold text-sm transition-all text-left">
                        <span>🛠️</span> Developer Tools
                    </button>
                </div>

                <!-- Health Status Panel -->
                <div class="glass-panel rounded-2xl p-5 space-y-4">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Diagnostics</h3>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span class="text-xs font-semibold text-slate-700">Laravel Database</span>
                            <span id="health-badge-db" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success">
                                {{ $dbStatus }}
                            </span>
                        </div>
                        
                        <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span class="text-xs font-semibold text-slate-700">Uploads Directory</span>
                            <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success">
                                Healthy
                            </span>
                        </div>
                        
                        <div class="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <span class="text-xs font-semibold text-slate-700">FastAPI Python API</span>
                            <span id="health-badge-fastapi" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-500">
                                Checking...
                            </span>
                        </div>
                    </div>
                </div>

                <!-- System Info -->
                <div class="glass-panel rounded-2xl p-5 text-xs space-y-3">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Environment Context</h3>
                    <div class="flex justify-between border-b border-slate-100 pb-2">
                        <span class="text-slate-500">PHP Version</span>
                        <span class="font-mono font-bold text-slate-800">{{ PHP_VERSION }}</span>
                    </div>
                    <div class="flex justify-between border-b border-slate-100 pb-2">
                        <span class="text-slate-500">Memory Usage</span>
                        <span class="font-mono font-bold text-slate-800">{{ round(memory_get_usage() / 1024 / 1024, 2) }} MB</span>
                    </div>
                    <div class="flex justify-between border-b border-slate-100 pb-2">
                        <span class="text-slate-500">Environment</span>
                        <span class="font-bold text-blue-600 uppercase">{{ config('app.env') }}</span>
                    </div>
                </div>

            </div>

            <!-- Dynamic Category Views -->
            <div class="lg:col-span-3 space-y-8">
                
                <!-- WEBSITE PORTAL CATEGORY -->
                <div id="category-website" class="space-y-6">
                    <!-- Overview Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Mode</span>
                                <h4 class="text-xl font-bold mt-1 text-slate-850">{{ ucfirst(\DB::connection()->getDriverName()) }} DB</h4>
                            </div>
                            <span class="text-3xl">💾</span>
                        </div>
                        <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Website Activity</span>
                                <h4 id="web-logs-count" class="text-xl font-bold mt-1 text-slate-850">{{ count($initialLogs) }} Recent logs</h4>
                            </div>
                            <span class="text-3xl">📊</span>
                        </div>
                    </div>

                    <!-- Web Activity Log Feed -->
                    <div class="glass-panel rounded-2xl overflow-hidden bg-white">
                        <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                                <span>📝</span> Website Admin Log Stream
                            </h3>
                            <span class="text-xs text-slate-500">Live logs from backend DB</span>
                        </div>
                        <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                        <th class="px-6 py-3.5">User</th>
                                        <th class="px-6 py-3.5">Action</th>
                                        <th class="px-6 py-3.5">Description</th>
                                        <th class="px-6 py-3.5">IP Address</th>
                                        <th class="px-6 py-3.5">Time</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100" id="web-logs-tbody">
                                    @forelse($initialLogs as $log)
                                        <tr class="hover:bg-slate-50/50 transition-colors">
                                            <td class="px-6 py-4 font-bold text-slate-900">{{ $log->user_name }}</td>
                                            <td class="px-6 py-4">
                                                @php
                                                    $badgeClass = 'bg-blue-600/10 text-blue-600';
                                                    if (str_contains($log->action, 'CREATE')) $badgeClass = 'bg-brand-success/10 text-brand-success';
                                                    if (str_contains($log->action, 'DELETE')) $badgeClass = 'bg-brand-danger/10 text-brand-danger';
                                                @endphp
                                                <span class="px-2 py-1 rounded text-[10px] font-bold {{ $badgeClass }}">
                                                    {{ $log->action }}
                                                </span>
                                            </td>
                                            <td class="px-6 py-4 text-slate-650">{{ $log->description }}</td>
                                            <td class="px-6 py-4 font-mono text-slate-500">{{ $log->ip_address }}</td>
                                            <td class="px-6 py-4 text-slate-500">{{ \Carbon\Carbon::parse($log->created_at)->diffForHumans() }}</td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5" class="px-6 py-12 text-center text-slate-450 font-medium">No activity logs found.</td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ID CARDS SYSTEM CATEGORY -->
                <div id="category-id_system" class="space-y-6 hidden">
                    <!-- Overview Stats -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Staff</span>
                                <h4 id="id-staff-count" class="text-2xl font-bold mt-1 text-slate-900">0</h4>
                            </div>
                            <span class="text-3xl">👥</span>
                        </div>
                        <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance Logs</span>
                                <h4 id="id-attendance-count" class="text-2xl font-bold mt-1 text-slate-900">0</h4>
                            </div>
                            <span class="text-3xl">📝</span>
                        </div>
                        <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                            <div>
                                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Complaints</span>
                                <h4 id="id-complaints-count" class="text-2xl font-bold mt-1 text-slate-900">0</h4>
                            </div>
                            <span class="text-3xl">⚠️</span>
                        </div>
                    </div>

                    <!-- ID Attendance Stream -->
                    <div class="glass-panel rounded-2xl overflow-hidden bg-white">
                        <div class="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                                <span>🆔</span> Staff Attendance & Geofence Logs
                            </h3>
                            <span class="text-xs text-slate-500">Fetched live from FastAPI SQLite</span>
                        </div>
                        <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                        <th class="px-6 py-3.5">Staff Name</th>
                                        <th class="px-6 py-3.5">Action</th>
                                        <th class="px-6 py-3.5">Device & Geofencing Warnings</th>
                                        <th class="px-6 py-3.5">Coordinates</th>
                                        <th class="px-6 py-3.5">Date</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100" id="id-attendance-tbody">
                                    <tr>
                                        <td colspan="5" class="px-6 py-12 text-center text-slate-500 font-medium">Fetching attendance records...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- API REQUEST LOGS -->
                <div id="category-api_logs" class="space-y-6 hidden">
                    <div class="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                        <div>
                            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                                <span>⚡</span> API Requests & Performance Monitor
                            </h3>
                            <p class="text-xs text-slate-505 mt-1">Live requests tracking, response status codes, and latency.</p>
                        </div>
                        <div>
                            <input oninput="filterRequestLogs(this.value)" type="text" placeholder="Search requests..." 
                                class="px-4 py-2 text-xs font-medium rounded-xl bg-slate-50 border border-slate-250 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all w-64">
                        </div>
                    </div>

                    <div class="glass-panel rounded-2xl overflow-hidden bg-white">
                        <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                        <th class="px-6 py-3.5">Method</th>
                                        <th class="px-6 py-3.5">URL / Route</th>
                                        <th class="px-6 py-3.5">Status</th>
                                        <th class="px-6 py-3.5">Latency</th>
                                        <th class="px-6 py-3.5">IP Address</th>
                                        <th class="px-6 py-3.5">Time</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100" id="api-request-logs-tbody">
                                    <tr>
                                        <td colspan="6" class="px-6 py-12 text-center text-slate-500 font-medium">Loading requests log...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ROUTE CATALOG -->
                <div id="category-endpoints" class="space-y-6 hidden">
                    <div class="glass-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
                        <div>
                            <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
                                <span>🗺️</span> Route Catalog
                            </h3>
                            <p class="text-xs text-slate-500 mt-1">Full list of declared Laravel endpoints, controllers, and middlewares.</p>
                        </div>
                        <div>
                            <input oninput="filterRoutes(this.value)" type="text" placeholder="Filter routes..." 
                                class="px-4 py-2 text-xs font-medium rounded-xl bg-slate-50 border border-slate-250 text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all w-64">
                        </div>
                    </div>

                    <div class="glass-panel rounded-2xl overflow-hidden bg-white">
                        <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                            <table class="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr class="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                                        <th class="px-6 py-3.5">HTTP Method</th>
                                        <th class="px-6 py-3.5">URI Path</th>
                                        <th class="px-6 py-3.5">Controller Action</th>
                                        <th class="px-6 py-3.5">Middleware</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-slate-100 font-medium text-slate-700" id="routes-catalog-tbody">
                                    <tr>
                                        <td colspan="4" class="px-6 py-12 text-center text-slate-500 font-medium">Retrieving system routes...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- DEV TOOLS CATEGORY -->
                <div id="category-dev_tools" class="space-y-6 hidden">
                    <div class="glass-panel rounded-2xl p-6 space-y-6 bg-white">
                        <div>
                            <h3 class="text-lg font-bold text-slate-900">Administrative Actions Center</h3>
                            <p class="text-xs text-slate-500 mt-1">Direct backend operational calls for developers.</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                                <div>
                                    <h4 class="font-bold text-sm text-slate-800">Force Run DB Migrations</h4>
                                    <p class="text-xs text-slate-555 mt-1 mb-4 leading-relaxed">
                                        Pushes pending schema modifications to production PostgreSQL.
                                    </p>
                                </div>
                                <button onclick="triggerMigration()" id="btn-run-mig" class="glow-button w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-lg text-white text-center flex items-center justify-center gap-2 shadow-sm">
                                    Run Artisan Migrate
                                </button>
                            </div>

                            <div class="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                                <div>
                                    <h4 class="font-bold text-sm text-slate-800">Force Run DB Seeders</h4>
                                    <p class="text-xs text-slate-550 mt-1 mb-4 leading-relaxed">
                                        Synchronizes activities and products from files to database.
                                    </p>
                                </div>
                                <button onclick="triggerSeeding()" id="btn-run-seed" class="glow-button w-full py-2.5 bg-indigo-650 hover:bg-indigo-750 font-semibold text-xs rounded-lg text-white text-center flex items-center justify-center gap-2 shadow-sm" style="background-color: #4f46e5;">
                                    Run Artisan Seed
                                </button>
                            </div>

                            <div class="p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
                                <div>
                                    <h4 class="font-bold text-sm text-slate-800">Reset Staff leaderboards</h4>
                                    <p class="text-xs text-slate-505 mt-1 mb-4 leading-relaxed">
                                        Resets active staff monthly performance scores to 0 and archives history.
                                    </p>
                                </div>
                                <button onclick="triggerResetScores()" id="btn-reset-scores" class="glow-button w-full py-2.5 bg-brand-danger hover:bg-red-700 font-semibold text-xs rounded-lg text-white text-center flex items-center justify-center gap-2 shadow-sm">
                                    Reset Leaderboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                    <!-- Execution Output Console -->
                    <div id="console-card" class="glass-panel rounded-2xl p-6 hidden bg-white">
                        <h4 class="text-sm font-bold text-slate-800 mb-3">Live Execution Console</h4>
                        <pre id="console-output" class="font-mono text-xs p-4 bg-slate-900 text-brand-success rounded-xl border border-slate-800 max-h-[300px] overflow-y-auto whitespace-pre-wrap">Initializing console connection...</pre>
                    </div>
                </div>

            </div>

        </main>

        <!-- Global Footer -->
        <footer class="glass-panel border-t border-slate-200 py-4 mt-12 text-center text-xs text-slate-500 bg-white">
            &copy; 2026 Sankara Dev Hub. All privileges verified for admin.
        </footer>

        <!-- Scripts and Logic -->
        <script>
            const backendToken = "{{ $token }}";
            let activeTab = 'website';
            let allRequestLogs = [];
            let allRoutes = [];

            function switchCategory(cat) {
                activeTab = cat;
                
                // Hide all categories
                document.getElementById('category-website').classList.add('hidden');
                document.getElementById('category-id_system').classList.add('hidden');
                document.getElementById('category-api_logs').classList.add('hidden');
                document.getElementById('category-endpoints').classList.add('hidden');
                document.getElementById('category-dev_tools').classList.add('hidden');
                
                // Reset tab buttons
                const btnIds = ['website', 'id_system', 'api_logs', 'endpoints', 'dev_tools'];
                btnIds.forEach(id => {
                    document.getElementById('tab-btn-' + id).className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-650 font-semibold text-sm transition-all text-left";
                });
                
                // Show active category & set button state
                document.getElementById('category-' + cat).classList.remove('hidden');
                const activeBtn = document.getElementById('tab-btn-' + cat);
                
                if (cat === 'dev_tools') {
                    activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-danger/10 text-brand-danger font-semibold text-sm transition-all text-left";
                } else {
                    activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-600 font-semibold text-sm transition-all text-left";
                }

                if (cat === 'id_system') {
                    fetchIDSystemLogs();
                } else if (cat === 'api_logs') {
                    fetchApiRequestLogs();
                } else if (cat === 'endpoints') {
                    fetchRoutesCatalog();
                }
            }

            async function fetchRoutesCatalog() {
                const tbody = document.getElementById('routes-catalog-tbody');
                tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-12 text-center text-slate-500 font-medium">Retrieving system routes...</td></tr>`;

                try {
                    const res = await fetch(`/api/admin/routes?token=${backendToken}`);
                    if (res.ok) {
                        allRoutes = await res.json();
                        renderRoutes(allRoutes);
                    } else {
                        tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-12 text-center text-brand-danger font-medium font-bold">Failed to load route catalog.</td></tr>`;
                    }
                } catch(e) {
                    tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-12 text-center text-brand-danger font-medium font-bold">Error connecting to routes API.</td></tr>`;
                }
            }

            function renderRoutes(routes) {
                const tbody = document.getElementById('routes-catalog-tbody');
                if (routes.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-12 text-center text-slate-400 font-bold">No matching routes found.</td></tr>`;
                    return;
                }

                tbody.innerHTML = routes.map(route => {
                    let methodBadge = 'bg-blue-600/10 text-blue-650';
                    if (route.method.includes('POST')) methodBadge = 'bg-brand-success/10 text-brand-success';
                    if (route.method.includes('DELETE')) methodBadge = 'bg-brand-danger/10 text-brand-danger';
                    if (route.method.includes('PUT') || route.method.includes('PATCH')) methodBadge = 'bg-brand-warning/10 text-brand-warning';

                    return `
                        <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${methodBadge}">${route.method}</span>
                            </td>
                            <td class="px-6 py-4 font-mono font-bold text-slate-900">${route.uri}</td>
                            <td class="px-6 py-4 text-slate-600 font-mono text-[11px]">${route.action}</td>
                            <td class="px-6 py-4 text-slate-500">${route.middleware.join(', ')}</td>
                        </tr>
                    `;
                }).join('');
            }

            function filterRoutes(q) {
                const filtered = allRoutes.filter(r => 
                    r.uri.toLowerCase().includes(q.toLowerCase()) || 
                    r.method.toLowerCase().includes(q.toLowerCase()) || 
                    r.action.toLowerCase().includes(q.toLowerCase())
                );
                renderRoutes(filtered);
            }

            async function fetchApiRequestLogs() {
                const tbody = document.getElementById('api-request-logs-tbody');
                tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center text-slate-500 font-medium">Loading requests log...</td></tr>`;

                try {
                    const res = await fetch(`/api/admin/request-logs?token=${backendToken}`);
                    if (res.ok) {
                        allRequestLogs = await res.json();
                        renderRequestLogs(allRequestLogs);
                    } else {
                        tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center text-brand-danger font-medium font-bold">Failed to retrieve request logs.</td></tr>`;
                    }
                } catch(e) {
                    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center text-brand-danger font-medium font-bold">Error communicating with logs API.</td></tr>`;
                }
            }

            function renderRequestLogs(logs) {
                const tbody = document.getElementById('api-request-logs-tbody');
                if (logs.length === 0) {
                    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-12 text-center text-slate-500 font-medium">No HTTP requests recorded yet.</td></tr>`;
                    return;
                }

                tbody.innerHTML = logs.map(log => {
                    let methodBadge = 'bg-blue-600/10 text-blue-650';
                    if (log.method === 'POST') methodBadge = 'bg-brand-success/10 text-brand-success';
                    if (log.method === 'DELETE') methodBadge = 'bg-brand-danger/10 text-brand-danger';
                    if (log.method === 'PUT' || log.method === 'PATCH') methodBadge = 'bg-brand-warning/10 text-brand-warning';

                    let statusBadge = 'bg-brand-success/15 text-brand-success';
                    if (log.status_code >= 400 && log.status_code < 500) statusBadge = 'bg-brand-warning/15 text-brand-warning';
                    if (log.status_code >= 500) statusBadge = 'bg-brand-danger/15 text-brand-danger';

                    return `
                        <tr class="hover:bg-slate-50/50 transition-colors">
                            <td class="px-6 py-4">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${methodBadge}">${log.method}</span>
                            </td>
                            <td class="px-6 py-4 font-mono font-bold text-slate-900 break-all">${log.url}</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-0.5 rounded text-[10px] font-bold ${statusBadge}">${log.status_code}</span>
                            </td>
                            <td class="px-6 py-4 text-slate-650 font-mono">${log.duration_ms} ms</td>
                            <td class="px-6 py-4 text-slate-500 font-mono">${log.ip_address}</td>
                            <td class="px-6 py-4 text-slate-500">${new Date(log.created_at).toLocaleString()}</td>
                        </tr>
                    `;
                }).join('');
            }

            function filterRequestLogs(q) {
                const filtered = allRequestLogs.filter(log => 
                    log.url.toLowerCase().includes(q.toLowerCase()) || 
                    log.method.toLowerCase().includes(q.toLowerCase()) || 
                    String(log.status_code).includes(q)
                );
                renderRequestLogs(filtered);
            }

            async function fetchIDSystemLogs() {
                try {
                    const tbody = document.getElementById('id-attendance-tbody');
                    tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-slate-550 font-medium">Fetching active streams...</td></tr>`;

                    const idBaseUrl = "{{ rtrim(env('SANKARA_ID_API_URL', 'https://sankara-id.vercel.app'), '/') }}";
                    const attRes = await fetch(`${idBaseUrl}/attendance/`);
                    if (attRes.ok) {
                        const data = await attRes.json();
                        
                        document.getElementById('id-attendance-count').textContent = data.length;
                        
                        if (data.length === 0) {
                            tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-slate-500 font-medium">No attendance logs found.</td></tr>`;
                            return;
                        }
                        
                        tbody.innerHTML = data.map(log => {
                            const inT = log.clock_in_time ? new Date(log.clock_in_time).toLocaleTimeString() : '-';
                            const outT = log.clock_out_time ? new Date(log.clock_out_time).toLocaleTimeString() : '-';
                            const warning = log.is_proxy ? '<span class="px-2 py-0.5 rounded bg-brand-danger/15 text-brand-danger text-[9px] font-bold">PROXY DEVICE</span>' : '<span class="px-2 py-0.5 rounded bg-brand-success/15 text-brand-success text-[9px] font-bold">SECURE BIND</span>';
                            
                            return `
                                <tr class="hover:bg-slate-50/50 transition-colors">
                                    <td class="px-6 py-4 font-bold text-slate-900">${log.staff_name}</td>
                                    <td class="px-6 py-4">
                                        <span class="px-2 py-1 rounded text-[10px] font-bold bg-brand-success/10 text-brand-success">ATTENDANCE</span>
                                    </td>
                                    <td class="px-6 py-4 text-slate-650">
                                        In: <strong>${inT}</strong> | Out: <strong>${outT}</strong> <span class="ml-2">${warning}</span>
                                    </td>
                                    <td class="px-6 py-4 font-mono text-slate-500">${log.latitude || '-'}, ${log.longitude || '-'}</td>
                                    <td class="px-6 py-4 text-slate-550">${log.date}</td>
                                </tr>
                            `;
                        }).join('');

                    }
                } catch(e) {
                    console.error("FastAPI fetch error", e);
                }
            }

            async function refreshData() {
                const fastapiBadge = document.getElementById('health-badge-fastapi');
                fastapiBadge.textContent = 'PENDING...';
                fastapiBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-550';
                
                try {
                    const healthRes = await fetch(`/api/admin/health?token=${backendToken}`);
                    if (healthRes.ok) {
                        const data = await healthRes.json();
                        
                        const dbBadge = document.getElementById('health-badge-db');
                        if (data.diagnostics[0].status === 'Healthy') {
                            dbBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success';
                            dbBadge.textContent = 'Healthy';
                        } else {
                            dbBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-danger/10 text-brand-danger';
                            dbBadge.textContent = 'Error';
                        }

                        if (data.id_system.active) {
                            fastapiBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success';
                            fastapiBadge.textContent = 'Healthy';
                            
                            document.getElementById('id-staff-count').textContent = data.id_system.stats.staff_count;
                            document.getElementById('id-complaints-count').textContent = data.id_system.stats.complaints_count;
                        } else {
                            fastapiBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-danger/10 text-brand-danger';
                            fastapiBadge.textContent = 'OFFLINE';
                        }
                    }
                } catch(e) {
                    fastapiBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-danger/10 text-brand-danger';
                    fastapiBadge.textContent = 'OFFLINE';
                }

                if (activeTab === 'id_system') {
                    fetchIDSystemLogs();
                } else if (activeTab === 'api_logs') {
                    fetchApiRequestLogs();
                } else if (activeTab === 'endpoints') {
                    fetchRoutesCatalog();
                }
            }

            async function triggerMigration() {
                if (!confirm('Run Laravel Database artisan migrations?')) return;
                
                const btn = document.getElementById('btn-run-mig');
                const consoleCard = document.getElementById('console-card');
                const consoleOutput = document.getElementById('console-output');
                
                btn.disabled = true;
                btn.textContent = 'Executing...';
                consoleCard.classList.remove('hidden');
                consoleOutput.textContent = 'Connecting to artisan terminal...\nRunning: php artisan migrate --force\n';
                
                try {
                    const res = await fetch(`/api/admin/migrate?token=${backendToken}`);
                    const data = await res.json();
                    if (res.ok && data.status === 'success') {
                        consoleOutput.textContent += `\nSuccess:\n${data.output}`;
                        alert('Migrations finished successfully!');
                    } else {
                        consoleOutput.textContent += `\nError:\n${data.message || 'Unknown migration error'}`;
                        alert('Migration failed.');
                    }
                } catch(e) {
                    consoleOutput.textContent += `\nConnection Error: ${e.message}`;
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Run Artisan Migrate';
                }
            }

            async function triggerSeeding() {
                if (!confirm('Run Laravel Database artisan seeders? This updates products and activity media categories.')) return;
                
                const btn = document.getElementById('btn-run-seed');
                const consoleCard = document.getElementById('console-card');
                const consoleOutput = document.getElementById('console-output');
                
                btn.disabled = true;
                btn.textContent = 'Executing...';
                consoleCard.classList.remove('hidden');
                consoleOutput.textContent = 'Connecting to artisan terminal...\nRunning: php artisan db:seed --force\n';
                
                try {
                    const res = await fetch(`/api/admin/seed?token=${backendToken}`);
                    const data = await res.json();
                    if (res.ok && data.status === 'success') {
                        consoleOutput.textContent += `\nSuccess:\n${data.output}`;
                        alert('Database seeded successfully!');
                    } else {
                        consoleOutput.textContent += `\nError:\n${data.message || 'Unknown seeding error'}`;
                        alert('Seeding failed.');
                    }
                } catch(e) {
                    consoleOutput.textContent += `\nConnection Error: ${e.message}`;
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Run Artisan Seed';
                }
            }

            async function triggerResetScores() {
                if (!confirm('Archive and reset scores for the entire staff list? This resets all active points to 0!')) return;
                
                const btn = document.getElementById('btn-reset-scores');
                btn.disabled = true;
                btn.textContent = 'Resetting Scores...';
                
                try {
                    const res = await fetch(`/api/admin/id-system/reset-scores?token=${backendToken}`, {
                        method: 'POST'
                    });
                    const data = await res.json();
                    if (res.ok) {
                        alert(data.detail || 'Scores reset successfully!');
                        refreshData();
                    } else {
                        alert('Reset failed: ' + (data.error || 'Server error'));
                    }
                } catch(e) {
                    alert('Network communication error: ' + e.message);
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Reset Leaderboard';
                }
            }

            // Initial Load
            refreshData();
        </script>
    @endif
</body>
</html>
