<?php

require('../config/conexion.php');
require('../config/validaciones.php');


$arrayDatos = array(
    'cedula',
    'nombre',
    'apellido',
    'genero',
    'salario',
    'fecha_nacimiento',
    'fecha_ingreso'
);


if (validarKeyArray($arrayDatos, $_POST)) {
    $arrayDatos = array(
        'cedula'            => strtoupper(trim($_POST['cedula'])),
        'nombre'            => strtoupper(trim($_POST['nombre'])),
        'apellido'          => strtoupper(trim($_POST['apellido'])),
        'genero'            => strtoupper(trim($_POST['genero'])),
        'salario'           => strtoupper(trim($_POST['salario'])),
        'fecha_nacimiento'  => strtoupper(trim($_POST['fecha_nacimiento'])),
        'fecha_ingreso'     => strtoupper(trim($_POST['fecha_ingreso']))

    );

    if (validarTexto($arrayDatos)) {
        $cedula = $arrayDatos['cedula'];
        $nombre = $arrayDatos['nombre'];
        $apellido = $arrayDatos['apellido'];
        $genero = $arrayDatos['genero'];
        $salario = intval($arrayDatos['salario']);
        $fecha_nacimiento = $arrayDatos['fecha_nacimiento'];
        $fecha_ingreso = $arrayDatos['fecha_ingreso'];

        $query = "INSERT INTO empleados (cedula,nombre,apellido,sexo,salario,fecha_nacimiento,fecha_ingreso) VALUES ('$cedula','$nombre','$apellido','$genero',$salario,STR_TO_DATE('$fecha_nacimiento','%Y-%m-%d'),STR_TO_DATE('$fecha_ingreso','%Y-%m-%d'))";

        if ($mysqli->query($query)) {
            echo json_encode('OK');
        } else {
            echo json_encode('ERROR');
        }
    } else {
        echo json_encode('VACIO');
    }
}

$mysqli->close();
