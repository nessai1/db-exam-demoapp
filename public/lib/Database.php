<?php

class Database {

    protected static $instance;

    protected $someVal;

    protected $dbInfo;

    private $dbInstance;

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    private function __construct() {
        $this->dbInfo = [
            'hostname' => 'localhost',
            'database' => 'werowk59_sites',
            'username' => 'werowk59_sites',
            'password' => '&3W6jiWh',
        ];

        $this->dbInstance = new mysqli(
            $this->dbInfo['hostname'],
            $this->dbInfo['username'],
            $this->dbInfo['password'],
            $this->dbInfo['database']
        );

    }

    public function query(string $queryText) {
        return $this->dbInstance->query($queryText);
    }

    public function prepare($val) {
        return $this->dbInstance->real_escape_string($val);
    }

    public function getSomeVal() {
        return $this->someVal;
    }
}