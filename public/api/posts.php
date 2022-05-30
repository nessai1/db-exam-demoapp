<?php
header('Content-Type: application/json; charset=utf-8');
require_once '../lib/PostsRouter.php';

if (isset($_GET['operation'])) {
    PostsRouter::route($_GET['operation']);
}
