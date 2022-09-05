<?php

require('config.php');

$mysqli = new mysqli($host, $user, $pass, $bd);

if ($mysqli->connect_errno) {
    echo "Falló la conexión: " . $mysqli->connect_error;
    exit();
}
