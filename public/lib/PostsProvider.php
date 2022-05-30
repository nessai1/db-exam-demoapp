<?php

require_once 'Database.php';

class PostsProvider {

    protected static function preparePost(array $post): array {
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

    public static function getPosts(): array {

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


    protected static function formPost(array $postData) {
        $db = Database::getInstance();
        $formedPost = [];

        if (isset($postData['id']))
        {
            $formedPost['ID'] = (int)$postData['id'];
        }
        else
        {
            $formedPost['ID'] = 0;
        }

        $formedPost['ADDRESS'] = $db->prepare($postData['title']);
        $formedPost['DESCRIPTION'] = $db->prepare($postData['desc']);
        $formedPost['HAVE_BANNER'] = (int)$postData['danger'];
        $formedPost['LANGUAGE'] = (int)$postData['language'];
        $formedPost['ENCODE'] = (int)$postData['encode'];

        return $formedPost;
    }

    public static function setPost(array $postData): array {

        $formedPost = self::formPost($postData);

        $db = Database::getInstance();
        $langs = $db->query("SELECT * FROM language WHERE ID = {$formedPost['LANGUAGE']}")->fetch_all();
        $encodes = $db->query("SELECT * FROM encode WHERE ID = {$formedPost['ENCODE']}")->fetch_all();

        if (!(count($langs) >= 1) || !(count($encodes) >= 1) ) {
            return [
                'status' => 'SQL_ERROR',
                'data' => [
                    'error_description' => 'Undefined language or encode'
                ]
            ];
        }

        if ($formedPost['ID'] === 0) {
            $query = "
            INSERT INTO site (ADDRESS, DESCRIPTION, DATE_CREATE, DATE_UPDATE, LANGUAGE_ID, ENCODE_ID, HAVE_BANNER)
            VALUES ('{$formedPost['ADDRESS']}', '{$formedPost['DESCRIPTION']}', NOW(), NOW(), {$formedPost['LANGUAGE']}, {$formedPost['ENCODE']}, {$formedPost['HAVE_BANNER']})
            ";
        }
        else {
            $site = $db->query("SELECT * FROM site WHERE ID = {$formedPost['ID']}")->fetch_all();
            if (count($site) !== 1) {
                return [
                    'status' => 'SQL_ERROR',
                    'data' => [
                        'error_description' => 'Undefined site id'
                    ]
                ];
            }

            $query = "
                UPDATE site
                SET DATE_UPDATE = NOW(), ADDRESS = '{$formedPost['ADDRESS']}', DESCRIPTION = '{$formedPost['DESCRIPTION']}',
                    LANGUAGE_ID = {$formedPost['LANGUAGE']}, ENCODE_ID = {$formedPost['ENCODE']}, HAVE_BANNER = {$formedPost['HAVE_BANNER']}
                WHERE ID = {$formedPost['ID']}
            ";
        }

        $rs = $db->query($query);
        if ($rs) {
            return [
                'status' => 'OK'
            ];
        }
        else {
            return [
                'status' => 'SQL_ERROR',
                'data' => [
                    'error_description' => 'undefined sql error',
                ],
            ];
        }
    }

    public static function getEditorData(): array {
        $db = Database::getInstance();

        $langs = $db->query("SELECT * FROM language")->fetch_all();
        $encodes = $db->query("SELECT * FROM encode")->fetch_all();

        $data = [
            'lang' => $langs,
            'encode' => $encodes,
        ];

        return $data;
    }
}