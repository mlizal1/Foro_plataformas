-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-09-2022 a las 02:21:24
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `actividad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `pregunta` varchar(50) NOT NULL,
  `respuesta` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `id_extreme` varchar(50) NOT NULL,
  `tipo` int(2) NOT NULL,
  `imagen` varchar(40) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `usuario`, `pass`, `nombre`, `apellido`, `pregunta`, `respuesta`, `correo`, `id_extreme`, `tipo`, `imagen`) VALUES
(1, 'admin', '123456', 'Administrador', 'Administrador', 'donde vives', 'en la casa', 'ccarch81@gmail.com', 'e6173408b6ec032e6765142bba1da08d', 1, 'avatar3.png'),
(2, 'YOND1994', 'e10adc3949ba59abbe56e057f20f883e', 'YONATHAN', 'DUQUE', 'HEROE DE LA INFANCIA', 'ZORRO', 'Y@Y.COM', '', 1, 'avatar3.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `cedula` varchar(10) NOT NULL,
  `nombre` varchar(10) NOT NULL,
  `apellido` varchar(12) NOT NULL,
  `sexo` char(1) NOT NULL,
  `salario` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`cedula`, `nombre`, `apellido`, `sexo`, `salario`) VALUES
('', '', '', '', ''),
('666', '123', '435', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fnacimiento`
--

CREATE TABLE `fnacimiento` (
  `dia` int(10) NOT NULL,
  `mes` int(10) NOT NULL,
  `año` int(8) NOT NULL,
  `cedula` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestaciones`
--

CREATE TABLE `prestaciones` (
  `salario` int(11) NOT NULL,
  `fingreso` int(11) NOT NULL,
  `salud` int(11) NOT NULL,
  `pension` int(11) NOT NULL,
  `prima` int(11) NOT NULL,
  `cesantias` int(11) NOT NULL,
  `transporte` int(11) NOT NULL,
  `dotacion` int(11) NOT NULL,
  `vacaciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
