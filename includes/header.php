<?php
session_start();
if (!isset($_SESSION['user']) || !isset($_SESSION['token'])) {
    header('Location: ' . getenv('BASE_URL') . '/login');
    exit;
}

$user = $_SESSION['user'];
?>
<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Triks - Dashboard</title>
    <link href="<?php echo getenv('BASE_URL'); ?>/assets/css/output.css" rel="stylesheet">
    <script>
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>
</head>
<body class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <header class="fixed w-full top-0 z-40 backdrop-blur-lg bg-white/80 dark:bg-gray-800/80">
        <div class="lg:ml-20 px-4 py-3">
            <div class="flex justify-between items-center">
                <button id="mobile-menu" class="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                
                <!-- Select Card Clientes -->
                <div id="clienteSelector" class="relative">
                    <button id="clienteButton" class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                        <span id="selectedClienteName" class="text-sm text-gray-600 dark:text-gray-300">Selecionar Cliente</span>
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    <div id="clienteDropdown" class="hidden absolute mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                        <div class="p-2">
                            <div id="clientesList" class="max-h-[calc(100vh-200px)] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                                <!-- Cards dos clientes serão inseridos aqui via JavaScript -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 rounded-full">
                        <span class="h-2 w-2 rounded-full bg-green-500"></span>
                        <span class="text-sm text-gray-600 dark:text-gray-300"><?php echo htmlspecialchars($user['nome']); ?></span>
                    </div>
                    <button id="darkModeToggle" class="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                        </svg>
                    </button>
                    <a href="<?php echo getenv('BASE_URL'); ?>/logout" class="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>Sair</span>
                    </a>
                </div>
            </div>
        </div>
    </header>
    <script>
        document.getElementById('darkModeToggle').addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        });
    </script>

