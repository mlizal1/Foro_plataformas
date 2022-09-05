<?php
// creo funcion y variables

function obtener_edad_segun_fecha($fecha_nacimiento)
{
    $nacimiento = new DateTime($fecha_nacimiento);
    $ahora = new DateTime(date("Y-m-d"));
    $diferencia = $ahora->diff($nacimiento); //diff función incorporada en PHP que se utiliza para devolver la diferencia entre dos objetos 
    return $diferencia->format("%y"); // format funcion  Devuelve la fecha formateada según el formato dado.


}

// Probar rta
$fechas = ['2022-05-05', '1990-01-01', '1999-01-01', '2002-12-31'];
foreach ($fechas as $fecha) {
    printf("Edad para %s: %d\n", $fecha, obtener_edad_segun_fecha($fecha));
}
