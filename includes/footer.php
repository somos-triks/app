<script>
document.getElementById('sidemenu').classList.add('group/sidemenu');

// Improved mobile menu handling
const mobileMenu = document.getElementById('mobile-menu');
const sidemenu = document.getElementById('sidemenu');
const backdrop = document.createElement('div');

backdrop.className = 'fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 lg:hidden';
backdrop.style.display = 'none';
document.body.appendChild(backdrop);

function toggleMenu() {
    sidemenu.classList.toggle('-translate-x-full');
    backdrop.style.display = sidemenu.classList.contains('-translate-x-full') ? 'none' : 'block';
}

mobileMenu.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);
</script>

<script>
    window.appConfig = {
        BASE_URL: '<?php echo getenv("BASE_URL"); ?>',
        API_URL: '<?php echo getenv("API_URL"); ?>',
        AUTH_TOKEN: '<?php echo $_SESSION["token"] ?? ""; ?>',
        selectedClientId: <?php 
            $selectedClientId = isset($_SESSION['selectedClientId']) ? $_SESSION['selectedClientId'] : 'null';
            echo $selectedClientId;
        ?>
    };
</script>
<script src="<?php echo getenv('BASE_URL'); ?>/assets/js/header/app.service.js"></script>
    </body>
</html>
