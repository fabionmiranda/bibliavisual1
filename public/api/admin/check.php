<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

$testamento = basename($_GET['testamento'] ?? '');
$livroId    = basename($_GET['livroId']    ?? '');
$tipo       = $_GET['tipo']       ?? '';
$filename   = basename($_GET['filename']   ?? '');

$nomeArquivo = ($tipo === 'diagrama' && $filename) ? $filename : $tipo . '.txt';

$raiz     = dirname(dirname(dirname(__FILE__)));
$filePath = $raiz . '/admin/' . $testamento . '/' . $livroId . '/' . $nomeArquivo;

echo json_encode(['exists' => file_exists($filePath)]);
