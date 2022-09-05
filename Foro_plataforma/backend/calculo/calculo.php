<?php

require('../config/conexion.php');
require('../config/validaciones.php');


$arrayDatos = array(
    'cedula'
);


if (validarKeyArray($arrayDatos, $_POST)) {
    $arrayDatos = array(
        'cedula' => strtoupper(trim($_POST['cedula']))
    );

    if (validarTexto($arrayDatos)) {
        $cedula = $arrayDatos['cedula'];

        $query = "SELECT * FROM empleados WHERE cedula='$cedula'";
        $result = $mysqli->query($query);

        if ($result->num_rows > 0) {
            $response = array(
                'response' => null,
                'data' => [
                    'edad' => null,
                    'antiguedad' => null,
                    'prima' => null,
                    'cesantias' => null
                ]
            );

            while ($row = $result->fetch_assoc()) {
                $response['data']['edad'] = diferenciaFechas($row['fecha_nacimiento'])->y . ' años';
                $response['data']['antiguedad'] = diferenciaFechas($row['fecha_ingreso'])->y . ' años';
                $response['data']['prima'] = prima($row['salario'], $row['fecha_ingreso']);
                $response['data']['cesantias'] = cesantias($row['salario'], $row['fecha_ingreso']);
            }

            $response['response'] = 'OK';

            echo json_encode($response);
        } else {
            echo json_encode(['response' => 'ERROR']);
        }
    } else {
        echo json_encode(['response' => 'VACIO']);
    }
}

$mysqli->close();
