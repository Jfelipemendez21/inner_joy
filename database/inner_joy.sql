-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2024 a las 03:01:05
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inner_joy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `tipo_test_id` int(11) NOT NULL,
  `nombre_test` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`id`, `tipo_test_id`, `nombre_test`) VALUES
(1, 1, 'Depresion'),
(2, 1, 'TDHA'),
(3, 1, 'Ansiedad'),
(4, 2, 'Avanzado depresion'),
(5, 2, 'Avanzado TDHA'),
(6, 2, 'Avanzado ansiedad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test_realizados`
--

CREATE TABLE `test_realizados` (
  `id` int(11) NOT NULL,
  `test_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `puntaje` int(11) NOT NULL,
  `fecha_realizacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `test_realizados`
--

INSERT INTO `test_realizados` (`id`, `test_id`, `usuario_id`, `puntaje`, `fecha_realizacion`) VALUES
(9, 3, 10, 15, '2024-04-19 00:28:10'),
(10, 3, 10, 15, '2024-04-19 00:28:10'),
(11, 3, 10, 15, '2024-04-19 00:28:10'),
(12, 4, 10, 17, '2024-04-19 00:28:10'),
(13, 4, 10, 17, '2024-04-19 00:33:56'),
(14, 1, 10, 8, '2024-04-19 00:34:14'),
(15, 1, 10, 8, '2024-04-19 00:36:21'),
(16, 1, 10, 8, '2024-04-19 00:36:38'),
(17, 1, 10, 8, '2024-04-19 00:43:40'),
(18, 4, 10, 18, '2024-04-19 00:44:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_test`
--

CREATE TABLE `tipo_test` (
  `id` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipo_test`
--

INSERT INTO `tipo_test` (`id`, `tipo`) VALUES
(1, 'inicial'),
(2, 'principal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `username`, `email`, `password`, `activo`) VALUES
(9, 'Juan Felipe', 'jfelipe', 'jfelipe@gmail.com', '$2b$10$vpr1RnmfJtk.N7jXh3coKOlNUOHwfcHTZ/CjHTQsNazyweWb91c0y', 1),
(10, 'Juan David', 'jdavid', 'jdavid@gmail.com', '$2b$10$.1.bHuDydoTCDfCfFyEkeOwpSSSY6KE9Qn0v8M0llXG6oY4k06XeK', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `test_realizados`
--
ALTER TABLE `test_realizados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_539265f65176ee166195ded2b24` (`test_id`),
  ADD KEY `FK_97f966eda70b13c5707101aad6f` (`usuario_id`);

--
-- Indices de la tabla `tipo_test`
--
ALTER TABLE `tipo_test`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `test_realizados`
--
ALTER TABLE `test_realizados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tipo_test`
--
ALTER TABLE `tipo_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `test_realizados`
--
ALTER TABLE `test_realizados`
  ADD CONSTRAINT `FK_539265f65176ee166195ded2b24` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_97f966eda70b13c5707101aad6f` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
