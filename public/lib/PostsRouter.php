<?php
require_once 'PostsProvider.php';

class PostsRouter {
    public static function route(string $method) {

        switch ($method) {
            case 'getPosts':
                echo json_encode(PostsProvider::getPosts());
                break;
            case 'setPost':
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode(PostsProvider::setPost($data));
                break;
            case 'getEditorData':
                echo json_encode(PostsProvider::getEditorData());
        }
        die();
    }


}