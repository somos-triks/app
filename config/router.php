<?php
class Router {
    private $routes = [];

    public function add($pattern, $controller) {
        // Salva o padrão como regex e o controller
        $this->routes[] = [
            'pattern' => $pattern,
            'controller' => ROOT_PATH . '/' . $controller
        ];
    }

    public function run() {
        // Pega a URL amigável passada pelo .htaccess
        $uri = isset($_GET['url']) ? '/' . trim($_GET['url'], '/') : '/';

        foreach ($this->routes as $route) {
            $pattern = $route['pattern'];

            // Transforma padrões do tipo /cliente/(\d+) em regex
            $regex = '#^' . preg_replace('#\((.*?)\)#', '(?P<param>$1)', $pattern) . '$#';

            if (preg_match($regex, $uri, $matches)) {
                // Se houver parâmetro, define $_GET['param']
                if (isset($matches['param'])) {
                    $_GET['param'] = $matches['param'];
                }
                require_once $route['controller'];
                return;
            }
        }

        // Rota não encontrada
        header("HTTP/1.0 404 Not Found");
        require_once ROOT_PATH . '/pages/404.php';
    }
}

// Inicializar router
$router = new Router();

// Definir rotas

# Autenticação
$router->add('/logout', 'config/logout.php');
$router->add('/', 'pages/home/index.php');
$router->add('/login', 'pages/auth/login/index.php');
$router->add('/registro', 'pages/auth/register/index.php');

# Admin
$router->add('/home', 'pages/home/index.php');

#Clientes
$router->add('/clientes', 'pages/clientes/index.php');
$router->add('/cliente/(\d+)', 'pages/cliente-page/index.php');


