<?php

require_once 'Database.php';

class PostsProvider {

    protected static function preparePost(array $post) {
        return [
            'id' => (int) $post['ID'],
            'title' => $post['ADDRESS'],
            'desc' => $post['DESCRIPTION'],
            'updated' => $post['DATE_UPDATE'],
            'created' => $post['DATE_CREATE'],
            'language' => $post['LANGUAGE'],
            'encode' => $post['ENCODE'],
            'danger' => (bool)$post['DANGER'],
            'genre' => []
        ];
    }

    public static function getPosts() {

        $db = Database::getInstance();

        $query = "
            SELECT
                s.ID as ID,
                s.ADDRESS as ADDRESS,
                s.DESCRIPTION as DESCRIPTION,
                s.DATE_CREATE as DATE_CREATE,
                s.DATE_UPDATE as DATE_UPDATE,
                l.LANGUAGE as LANGUAGE,
                e.ENCODE as ENCODE,
                s.HAVE_BANNER as DANGER
            FROM site s
                INNER JOIN encode e on s.ENCODE_ID = e.ID
                INNER JOIN language l on s.LANGUAGE_ID = l.ID
        ";

        $siteList = $db->query($query)->fetch_all(MYSQLI_ASSOC);

        $sites = [];
        foreach ($siteList as $item) {
            $sites[] = self::preparePost($item);
        }

        return $sites;
    }
}