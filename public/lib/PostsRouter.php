<?php
require_once 'PostsProvider.php';

class PostsRouter {
    public static function route(string $method) {

        switch ($method) {
            case 'getPosts':
                echo json_encode(PostsProvider::getPosts());
                break;
        }
        die();
    }


}