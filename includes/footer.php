<script>
    window.appConfig = {
        BASE_URL: '<?php echo getenv("BASE_URL"); ?>',
        API_URL: '<?php echo getenv("API_URL"); ?>',
        AUTH_TOKEN: '<?php echo isset($_SESSION["token"]) ? $_SESSION["token"] : ""; ?>',
        selectedClientId: <?php 
            $selectedClientId = isset($_SESSION['selectedClientId']) ? $_SESSION['selectedClientId'] : 'null';
            echo $selectedClientId;
        ?>
    };
</script>
</div>

<footer class="bg-white dark:bg-black border-t border-gray-200 dark:border-custom-border mt-auto py-4">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; <?php echo date('Y'); ?> Triks. Todos os direitos reservados.
        </div>
        <div class="w-full h-px bg-custom-border mt-2"></div>
    </div>
</footer>

<script>
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const button = dropdown.querySelector('button');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        button?.addEventListener('click', e => {
            e.stopPropagation();
            menu.classList.toggle('hidden');
        });
        
        document.addEventListener('click', () => {
            menu?.classList.add('hidden');
        });
    });
</script>
</body>
</html>
