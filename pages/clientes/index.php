<?php 
require_once dirname(__DIR__, 2) . '/config/config.php';
require_once ROOT_PATH . '/includes/header.php';
require_once ROOT_PATH . '/includes/sidemenu.php';
?>

<!-- CSS Adicional -->
<link rel="stylesheet" href="<?php echo getenv('BASE_URL'); ?>/assets/css/animations.css">

<div class="min-h-screen">
    <main class="lg:ml-20 pt-16 transition-all duration-300 lg:group-hover/sidemenu:ml-64">
        <div class="p-6 lg:p-8">
            <!-- Header Section -->
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span class="inline-block w-2 h-2 rounded-full bg-primary-500"></span>
                    Clientes
                </h1>
            </div>

            <!-- Card List Section -->
            <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50">
                <div class="p-4">
                    <!-- Loading State -->
                    <div id="loadingState" class="space-y-3">
                        <?php for($i = 0; $i < 6; $i++): ?>
                            <div class="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4">
                                <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700"></div>
                                <div class="flex-1 space-y-2">
                                    <div class="h-4 w-32 bg-gray-200 dark:bg-gray-700"></div>
                                    <div class="h-3 w-20 bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            </div>
                        <?php endfor; ?>
                    </div>

                    <!-- Cards List -->
                    <div id="clientesGrid" class="space-y-3 hidden">
                        <!-- Cards will be inserted here by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<!-- Scripts -->
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/api.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/card.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/tag.service.js"></script>
<script src="<?php echo getenv('BASE_URL'); ?>/pages/clientes/js/state.service.js"></script>
<?php require_once ROOT_PATH . '/includes/footer.php'; ?>

