<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') { http_response_code(405); echo json_encode(['ok' => false, 'error' => 'Method not allowed']); exit; }

$body = file_get_contents('php://input');
$data = json_decode($body, true);
if (!$data) { http_response_code(400); echo json_encode(['ok' => false, 'error' => 'Invalid JSON']); exit; }

$testamento = basename($data['testamento'] ?? '');
$livroId    = basename($data['livroId']    ?? '');
$filename   = basename($data['filename']   ?? '');

$raiz     = dirname(dirname(dirname(__FILE__)));
$filePath = $raiz . '/admin/' . $testamento . '/' . $livroId . '/' . $filename;

if (file_exists($filePath)) {
    unlink($filePath);
}

echo json_encode(['ok' => true]);
