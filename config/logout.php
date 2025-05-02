<?php
require_once 'config.php';
session_start();
session_destroy();
header('Location: ' . getenv('BASE_URL') . '/login');
exit;
