<?php

function textoVacio($text)
{
    return empty($text) || is_null($text) ? true : false;
}

function validarTexto($array)
{
    $bandera = true;
    if (is_array($array)) {
        foreach ($array as $key => $value) {
            if (isset($value) && !empty($value) && !ctype_space($value) && !strlen(trim($value)) == 0) {
                continue;
            } else {
                $bandera = false;
                break;
            }
        }
    } else {
        if (isset($array) && !empty($array) && !ctype_space($array) && !strlen(trim($array)) == 0) {
            $bandera = true;
        } else {
            $bandera = false;
        }
    }

    return $bandera;
}

function validarKeyArray($array_keys, $array = array())
{
    if (is_array($array_keys)) {
        foreach ($array_keys as $key => $value) {
            if (array_key_exists($value, $array)) {
                continue;
            } else {
                return false;
                break;
            }
        }
    } else {
        if (!array_key_exists($array_keys, $array)) {
            return false;
        }
    }

    return true;
}

function diferenciaFechas($fechaInicial)
{
    $fechaInicial = new DateTime(date($fechaInicial), new DateTimeZone('America/Bogota'));
    $hoy = new DateTime('now', new DateTimeZone('America/Bogota'));
    return $hoy->diff($fechaInicial);
}

function prima($salario, $fechaIngreso)
{
    return cop(($salario * (diferenciaFechas($fechaIngreso)->days / 2)) / 360);
}

function cesantias($salario, $fechaIngreso)
{
    return cop(($salario * diferenciaFechas($fechaIngreso)->days) / 360);
}

function cop($valor)
{
    return 'COP $ ' . number_format($valor, 2, ',', '.');
}
