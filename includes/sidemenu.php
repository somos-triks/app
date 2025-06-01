<aside class="fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-black border-r border-gray-200 dark:border-custom-border" id="sidemenu">
    <div class="flex flex-col h-full">
        <!-- Logo in center of top section -->
        <div class="h-14 flex items-center justify-center border-b border-gray-200 dark:border-custom-border">
            <img src="<?php echo getenv('BASE_URL'); ?>/assets/img/logo-preta.svg" alt="Triks Logo" class="h-8 dark:hidden">
            <img src="<?php echo getenv('BASE_URL'); ?>/assets/img/logo-branca.svg" alt="Triks Logo" class="h-8 hidden dark:block">
        </div>

     
        <!-- Search Bar -->
        <div class="px-4 pt-4 pb-2">
            <div class="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input type="text" placeholder="Search" class="w-full bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 border-0 focus:ring-0 p-0">
                <span class="text-xs text-gray-600 dark:text-gray-400">⌘K</span>
            </div>
        </div>

        <!-- Account Label -->
        <div class="px-4 py-2 pt-4">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Account</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="mt-4 px-2">
            <div class="space-y-1">
                <a href="<?php echo getenv('BASE_URL'); ?>/home" 
                   class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <span>Home</span>
                </a>
                
                <a href="<?php echo getenv('BASE_URL'); ?>/clientes" 
                   class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                    </svg>
                    <span>Clientes</span>
                </a>
            </div>
        </nav>
        <div class="w-full h-px bg-custom-border mt-auto mb-4 mx-4"></div>
    </div>
</aside>
