<aside class="fixed inset-y-0 left-0 w-20 hover:w-64 group transition-all duration-300 z-50 transform lg:translate-x-0 -translate-x-full" id="sidemenu">
    <div class="h-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-100/20 dark:border-gray-800/20">
        <nav class="flex flex-col h-full">
            <!-- Logo Section -->
            <div class="h-16 flex items-center justify-center border-b border-gray-100/20 dark:border-gray-800/20">
                <div class="w-12 h-12 flex items-center justify-center">
                    <img src="<?php echo getenv('BASE_URL'); ?>/assets/img/icone-b.png" alt="Logo" class="w-8  dark:hidden">
                    <img src="<?php echo getenv('BASE_URL'); ?>/assets/img/icone.png" alt="Logo" class="w-8  hidden dark:block">
                </div>
            </div>

            <!-- Menu Items -->
            <div class="flex-1 py-8 space-y-4">
                <a href="<?php echo getenv('BASE_URL'); ?>/home" 
                   class="relative flex items-center h-12 px-4 group/item">
                    <div class="absolute left-0 w-1 h-8 rounded-r-lg bg-primary-500 transition-all"></div>
                    <div class="w-12 flex justify-center">
                        <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                    </div>
                    <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary-600 dark:text-primary-400">Home</span>
                </a>

                <a href="<?php echo getenv('BASE_URL'); ?>/clientes" 
                class="relative flex items-center h-12 px-4 group/item hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div class="w-12 flex justify-center">
                        <svg class="w-6 h-6 text-gray-400 group-hover/item:text-primary-500 dark:text-gray-500 dark:group-hover/item:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                    </div>
                    <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-600 dark:text-gray-400 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400">Clientes</span>
                </a>

                <a href="<?php echo getenv('BASE_URL'); ?>/kanban" 
                 class="relative flex items-center h-12 px-4 group/item hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div class="w-12 flex justify-center">
                        <svg class="w-6 h-6 text-gray-400 group-hover/item:text-primary-500 dark:text-gray-500 dark:group-hover/item:text-primary-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                        </svg>
                    </div>
                    <span class="ml-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-600 dark:text-gray-400 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400">Quadros</span>
                </a>
            </div>

            <!-- Bottom Section -->
            <div class="p-4 border-t border-gray-100/20 dark:border-gray-800/20">
                <div class="w-12 h-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
            </div>
        </nav>
    </div>
</aside>
