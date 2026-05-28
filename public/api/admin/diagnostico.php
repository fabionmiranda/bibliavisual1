<?php
// REMOVA ESTE ARQUIVO APÓS O DIAGNÓSTICO
header('Content-Type: application/json; charset=utf-8');

$raiz    = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$dirAdmin = $raiz . '/admin';

echo json_encode([
    'document_root'    => $raiz,
    'admin_path'       => $dirAdmin,
    'admin_exists'     => is_dir($dirAdmin),
    'admin_writable'   => is_writable($dirAdmin),
    'php_version'      => PHP_VERSION,
    'script_path'      => __FILE__,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
