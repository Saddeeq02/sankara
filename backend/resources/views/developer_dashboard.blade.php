<!DOCTYPE html>
<html lang="en" class="h-full bg-[#0b0f19] text-gray-100">
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
                            deep: '#0b0f19',
                            card: '#111827',
                            border: 'rgba(255, 255, 255, 0.05)',
                            primary: '#3b82f6',
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
        /* Custom Premium Glassmorphism styling */
        .glass-panel {
            background: rgba(17, 24, 39, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        
        .glow-button {
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        .glow-button:hover {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
            transform: translateY(-1px);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0b0f19;
        }
        ::-webkit-scrollbar-thumb {
            background: #1f2937;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #374151;
        }

        /* Keyframes */
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.6)); }
        }
        .live-indicator {
            animation: pulse-glow 2s infinite ease-in-out;
        }
    </style>
</head>
<body class="h-full flex flex-col font-sans selection:bg-blue-600 selection:text-white">

    <!-- Top Glow Line -->
    <div class="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

    <!-- Main Navigation / Header -->
    <header class="glass-panel sticky top-0 z-50 border-b border-brand-border">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span class="text-xl font-bold">S</span>
                </div>
                <div>
                    <h1 class="text-lg font-bold tracking-tight">Sankara DevHub</h1>
                    <p class="text-xs text-gray-400 font-medium">System Diagnostics & Logs Center</p>
                </div>
            </div>
            
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-brand-border text-xs">
                    <span class="w-2 h-2 rounded-full bg-brand-success live-indicator"></span>
                    <span class="text-gray-300 font-semibold uppercase tracking-wider">Live Monitoring</span>
                </div>
                <button onclick="refreshData()" class="glow-button px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H15m6-10V4m0 0h-5m6 0v5"></path></svg>
                    Refresh Dashboard
                </button>
            </div>
        </div>
    </header>

    <!-- Main Content Grid -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar Navigation & Quick Health -->
        <div class="lg:col-span-1 space-y-6">
            
            <!-- Category Tabs -->
            <div class="glass-panel rounded-2xl p-4 space-y-2">
                <button onclick="switchCategory('website')" id="tab-btn-website" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 font-semibold text-sm transition-all">
                    <span>🖥️</span> Website Portal
                </button>
                <button onclick="switchCategory('id_system')" id="tab-btn-id_system" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 font-semibold text-sm transition-all">
                    <span>🆔</span> ID Cards System
                </button>
                <button onclick="switchCategory('dev_tools')" id="tab-btn-dev_tools" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 font-semibold text-sm transition-all">
                    <span>🛠️</span> Developer Tools
                </button>
            </div>

            <!-- Health Status Panel -->
            <div class="glass-panel rounded-2xl p-5 space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Diagnostics</h3>
                
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 rounded-xl bg-[#111827]/50 border border-brand-border">
                        <span class="text-xs font-medium">Laravel Database</span>
                        <span id="health-badge-db" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success">
                            {{ $dbStatus }}
                        </span>
                    </div>
                    
                    <div class="flex justify-between items-center p-3 rounded-xl bg-[#111827]/50 border border-brand-border">
                        <span class="text-xs font-medium">Uploads Directory</span>
                        <span class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success">
                            Healthy
                        </span>
                    </div>
                    
                    <div class="flex justify-between items-center p-3 rounded-xl bg-[#111827]/50 border border-brand-border">
                        <span class="text-xs font-medium">FastAPI Python API</span>
                        <span id="health-badge-fastapi" class="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-600/10 text-gray-400">
                            Checking...
                        </span>
                    </div>
                </div>
            </div>

            <!-- System Info -->
            <div class="glass-panel rounded-2xl p-5 text-xs space-y-3">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Environment Context</h3>
                <div class="flex justify-between border-b border-brand-border pb-2">
                    <span class="text-gray-400">PHP Version</span>
                    <span class="font-mono font-bold">{{ PHP_VERSION }}</span>
                </div>
                <div class="flex justify-between border-b border-brand-border pb-2">
                    <span class="text-gray-400">Memory Usage</span>
                    <span class="font-mono font-bold">{{ round(memory_get_usage() / 1024 / 1024, 2) }} MB</span>
                </div>
                <div class="flex justify-between border-b border-brand-border pb-2">
                    <span class="text-gray-400">Environment</span>
                    <span class="font-bold text-blue-400 uppercase">{{ config('app.env') }}</span>
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
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Database Mode</span>
                            <h4 class="text-xl font-bold mt-1 text-white">{{ ucfirst(\DB::connection()->getDriverName()) }} DB</h4>
                        </div>
                        <span class="text-3xl">💾</span>
                    </div>
                    <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Website Activity</span>
                            <h4 id="web-logs-count" class="text-xl font-bold mt-1 text-white">{{ count($initialLogs) }} Recent logs</h4>
                        </div>
                        <span class="text-3xl">📊</span>
                    </div>
                </div>

                <!-- Web Activity Log Feed -->
                <div class="glass-panel rounded-2xl overflow-hidden">
                    <div class="px-6 py-5 border-b border-brand-border flex justify-between items-center">
                        <h3 class="text-base font-bold flex items-center gap-2">
                            <span>📝</span> Website Admin Log Stream
                        </h3>
                        <span class="text-xs text-gray-400">Live logs from backend DB</span>
                    </div>
                    <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-brand-border bg-brand-card/40 text-xs font-bold text-gray-400 uppercase">
                                    <th class="px-6 py-3.5">User</th>
                                    <th class="px-6 py-3.5">Action</th>
                                    <th class="px-6 py-3.5">Description</th>
                                    <th class="px-6 py-3.5">IP Address</th>
                                    <th class="px-6 py-3.5">Time</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-brand-border text-xs" id="web-logs-tbody">
                                @forelse($initialLogs as $log)
                                    <tr class="hover:bg-gray-800/10 transition-colors">
                                        <td class="px-6 py-4 font-bold text-white">{{ $log->user_name }}</td>
                                        <td class="px-6 py-4">
                                            @php
                                                $badgeClass = 'bg-blue-600/10 text-blue-400';
                                                if (str_contains($log->action, 'CREATE')) $badgeClass = 'bg-brand-success/10 text-brand-success';
                                                if (str_contains($log->action, 'DELETE')) $badgeClass = 'bg-brand-danger/10 text-brand-danger';
                                            @endphp
                                            <span class="px-2 py-1 rounded text-[10px] font-bold {{ $badgeClass }}">
                                                {{ $log->action }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-gray-300">{{ $log->description }}</td>
                                        <td class="px-6 py-4 font-mono text-gray-400">{{ $log->ip_address }}</td>
                                        <td class="px-6 py-4 text-gray-400">{{ \Carbon\Carbon::parse($log->created_at)->diffForHumans() }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="px-6 py-12 text-center text-gray-500 font-medium">No activity logs found.</td>
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
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Registered Staff</span>
                            <h4 id="id-staff-count" class="text-2xl font-bold mt-1 text-white">0</h4>
                        </div>
                        <span class="text-3xl">👥</span>
                    </div>
                    <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance Logs</span>
                            <h4 id="id-attendance-count" class="text-2xl font-bold mt-1 text-white">0</h4>
                        </div>
                        <span class="text-3xl">📝</span>
                    </div>
                    <div class="glass-panel rounded-2xl p-6 flex items-center justify-between">
                        <div>
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Complaints</span>
                            <h4 id="id-complaints-count" class="text-2xl font-bold mt-1 text-white">0</h4>
                        </div>
                        <span class="text-3xl">⚠️</span>
                    </div>
                </div>

                <!-- ID Attendance Stream -->
                <div class="glass-panel rounded-2xl overflow-hidden">
                    <div class="px-6 py-5 border-b border-brand-border flex justify-between items-center">
                        <h3 class="text-base font-bold flex items-center gap-2">
                            <span>🆔</span> Staff Attendance & Geofence Logs
                        </h3>
                        <span class="text-xs text-gray-400">Fetched live from FastAPI SQLite</span>
                    </div>
                    <div class="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="border-b border-brand-border bg-brand-card/40 text-xs font-bold text-gray-400 uppercase">
                                    <th class="px-6 py-3.5">Staff Name</th>
                                    <th class="px-6 py-3.5">Action</th>
                                    <th class="px-6 py-3.5">Device & Geofencing Warnings</th>
                                    <th class="px-6 py-3.5">Coordinates</th>
                                    <th class="px-6 py-3.5">Date</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-brand-border text-xs" id="id-attendance-tbody">
                                <tr>
                                    <td colspan="5" class="px-6 py-12 text-center text-gray-500 font-medium">Fetching attendance records...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- DEV TOOLS CATEGORY -->
            <div id="category-dev_tools" class="space-y-6 hidden">
                <div class="glass-panel rounded-2xl p-6 space-y-6">
                    <div>
                        <h3 class="text-lg font-bold text-white">Administrative Actions Center</h3>
                        <p class="text-xs text-gray-400 mt-1">Direct backend operational calls for developers.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-5 rounded-xl border border-brand-border bg-brand-card/50 flex flex-col justify-between">
                            <div>
                                <h4 class="font-bold text-sm text-white">Force Run DB Migrations</h4>
                                <p class="text-xs text-gray-400 mt-1 mb-4 leading-relaxed">
                                    Pushes pending schema modifications to production PostgreSQL.
                                </p>
                            </div>
                            <button onclick="triggerMigration()" id="btn-run-mig" class="glow-button w-full py-2.5 bg-blue-600 hover:bg-blue-700 font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-2">
                                Run Artisan Migrate
                            </button>
                        </div>

                        <div class="p-5 rounded-xl border border-brand-border bg-brand-card/50 flex flex-col justify-between">
                            <div>
                                <h4 class="font-bold text-sm text-white">Reset Staff leaderboards</h4>
                                <p class="text-xs text-gray-400 mt-1 mb-4 leading-relaxed">
                                    Resets active staff monthly performance scores to 0 and archives history.
                                </p>
                            </div>
                            <button onclick="triggerResetScores()" id="btn-reset-scores" class="glow-button w-full py-2.5 bg-brand-danger hover:bg-red-700 font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-2">
                                Reset Leaderboard
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Execution Output Console -->
                <div id="console-card" class="glass-panel rounded-2xl p-6 hidden">
                    <h4 class="text-sm font-bold text-white mb-3">Live Execution Console</h4>
                    <pre id="console-output" class="font-mono text-xs p-4 bg-black/80 text-brand-success rounded-xl border border-brand-border max-h-[300px] overflow-y-auto whitespace-pre-wrap">Initializing console connection...</pre>
                </div>
            </div>

        </div>

    </main>

    <!-- Global Footer -->
    <footer class="glass-panel border-t border-brand-border py-4 mt-12 text-center text-xs text-gray-500">
        &copy; 2026 Sankara Dev Hub. All privileges verified for admin.
    </footer>

    <!-- Scripts and Logic -->
    <script>
        const backendToken = "{{ $token }}";
        let activeTab = 'website';

        function switchCategory(cat) {
            activeTab = cat;
            
            // Hide all categories
            document.getElementById('category-website').classList.add('hidden');
            document.getElementById('category-id_system').classList.add('hidden');
            document.getElementById('category-dev_tools').classList.add('hidden');
            
            // Reset tab buttons
            document.getElementById('tab-btn-website').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 font-semibold text-sm transition-all";
            document.getElementById('tab-btn-id_system').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 font-semibold text-sm transition-all";
            document.getElementById('tab-btn-dev_tools').className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800/40 text-gray-400 font-semibold text-sm transition-all";
            
            // Show active category & set button state
            document.getElementById('category-' + cat).classList.remove('hidden');
            const activeBtn = document.getElementById('tab-btn-' + cat);
            
            if (cat === 'dev_tools') {
                activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-danger/10 text-brand-danger font-semibold text-sm transition-all";
            } else {
                activeBtn.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600/10 text-blue-400 font-semibold text-sm transition-all";
            }

            if (cat === 'id_system') {
                fetchIDSystemLogs();
            }
        }

        async function fetchIDSystemLogs() {
            try {
                const badge = document.getElementById('health-badge-fastapi');
                const tbody = document.getElementById('id-attendance-tbody');
                
                tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-gray-500 font-medium">Fetching active streams...</td></tr>`;

                const attRes = await fetch('https://sankara-id.vercel.app/attendance/');
                if (attRes.ok) {
                    const data = await attRes.json();
                    
                    document.getElementById('id-attendance-count').textContent = data.length;
                    
                    if (data.length === 0) {
                        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-12 text-center text-gray-500 font-medium">No attendance logs found.</td></tr>`;
                        return;
                    }
                    
                    tbody.innerHTML = data.map(log => {
                        const inT = log.clock_in_time ? new Date(log.clock_in_time).toLocaleTimeString() : '-';
                        const outT = log.clock_out_time ? new Date(log.clock_out_time).toLocaleTimeString() : '-';
                        const warning = log.is_proxy ? '<span class="px-2 py-0.5 rounded bg-brand-danger/15 text-brand-danger text-[9px] font-bold">PROXY DEVICE</span>' : '<span class="px-2 py-0.5 rounded bg-brand-success/15 text-brand-success text-[9px] font-bold">SECURE BIND</span>';
                        
                        return `
                            <tr class="hover:bg-gray-800/10 transition-colors">
                                <td class="px-6 py-4 font-bold text-white">${log.staff_name}</td>
                                <td class="px-6 py-4">
                                    <span class="px-2 py-1 rounded text-[10px] font-bold bg-brand-success/10 text-brand-success">ATTENDANCE</span>
                                </td>
                                <td class="px-6 py-4 text-gray-300">
                                    In: <strong>${inT}</strong> | Out: <strong>${outT}</strong> <span class="ml-2">${warning}</span>
                                </td>
                                <td class="px-6 py-4 font-mono text-gray-400">${log.latitude || '-'}, ${log.longitude || '-'}</td>
                                <td class="px-6 py-4 text-gray-400">${log.date}</td>
                            </tr>
                        `;
                    }).join('');

                }
            } catch(e) {
                console.error("FastAPI fetch error", e);
            }
        }

        async function refreshData() {
            // Live endpoint status pings
            const fastapiBadge = document.getElementById('health-badge-fastapi');
            fastapiBadge.textContent = 'PENDING...';
            fastapiBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-600/10 text-gray-400';
            
            try {
                // Fetch Laravel health stats
                const healthRes = await fetch(`/api/admin/health?token=${backendToken}`);
                if (healthRes.ok) {
                    const data = await healthRes.json();
                    
                    // Update DB health status badge
                    const dbBadge = document.getElementById('health-badge-db');
                    if (data.diagnostics[0].status === 'Healthy') {
                        dbBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-success/10 text-brand-success';
                        dbBadge.textContent = 'Healthy';
                    } else {
                        dbBadge.className = 'px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-danger/10 text-brand-danger';
                        dbBadge.textContent = 'Error';
                    }

                    // Update FastAPI Python health status badge
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
</body>
</html>
