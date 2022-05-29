<?php

require_once '../lib/Database.php';

$a = Database::getInstance();

$a->query('INSERT INTO test (NAME) VALUES(14)');

$data = [
    'somedata' => $a->getSomeVal(),
];

header('Content-Type: application/json; charset=utf-8');

echo json_encode($data);

die();