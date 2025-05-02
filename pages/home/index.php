<?php 
require_once dirname(__DIR__, 2) . '/config/config.php';
require_once ROOT_PATH . '/includes/header.php';
require_once ROOT_PATH . '/includes/sidemenu.php';
?>

<div class="min-h-screen">
    <main class="lg:ml-20 pt-16 transition-all duration-300 lg:group-hover/sidemenu:ml-64">
        <div class="p-6 lg:p-8">
            <div class="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8 mb-6">
                <div class="relative z-10">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 mb-4">
                        <div class="w-1 h-1 rounded-full bg-primary-500"></div>
                        <span class="text-sm font-medium text-primary-600 dark:text-primary-400">Dashboard</span>
                    </div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Bem vindo de volta! 👋</h1>
                </div>
                <div class="absolute inset-0 z-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 dark:from-primary-500/10 dark:to-purple-500/10"></div>
                    <svg class="absolute right-0 top-0 h-full w-1/3 text-primary-500/5 dark:text-primary-400/5" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M50 0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0ZM50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z"/>
                    </svg>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                <div class="group hover:scale-105 transition-all">
                    <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-xl p-6 relative overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent group-hover:from-primary-500/20 transition-all"></div>
                        <div class="relative">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400">Projetos Ativos</p>
                                    <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</h3>
                                </div>
                                <span class="inline-flex items-center justify-center p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="flex items-center text-sm">
                                <span class="flex items-center text-green-500 dark:text-green-400">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                                    </svg>
                                    8%
                                </span>
                                <span class="ml-2 text-gray-600 dark:text-gray-400">vs último mês</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Add more similar cards for other metrics -->
            </div>
        </div>
    </main>
</div>

<?php require_once ROOT_PATH . '/includes/footer.php'; ?>

