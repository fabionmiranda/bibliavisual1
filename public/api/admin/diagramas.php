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
        // Novo: Livro_Cap_VI.txt / Livro_Cap_VI_VF.txt / Livro_CapI_VI-CapF_VF.txt
        // Antigo: Livro_Letra_Cap_VI.txt / Livro_Letra_Cap_VI_VF.txt
        if (preg_match('/^.+_[A-Z\']?_?\d+_\d+[-_\d]*\.txt$/', $f)) {
            $arquivos[] = $f;
        }
    }
}

echo json_encode(['ok' => true, 'arquivos' => $arquivos]);
