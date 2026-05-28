<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$testamento = basename($_GET['testamento'] ?? '');
$livroId    = basename($_GET['livroId']    ?? '');

$raiz = rtrim($_SERVER['DOCUMENT_ROOT'], '/');
$dir  = $raiz . '/admin/' . $testamento . '/' . $livroId;

$arquivos = [];
if (is_dir($dir)) {
    foreach (scandir($dir) as $f) {
        if (!str_ends_with($f, '.txt')) continue;
        if ($f === 'estrutura.txt' || $f === 'quiastico.txt') continue;
        if (preg_match('/^.+_.+_\d+_\d+_\d+\.txt$/', $f)) {
            $arquivos[] = $f;
        }
    }
}

echo json_encode(['ok' => true, 'arquivos' => $arquivos]);
