-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 08-02-2023 a las 20:10:07
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
-- Base de datos: `Animal_shelter`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animals`
--

CREATE TABLE `animals` (
  `name` varchar(50) NOT NULL,
  `specie` varchar(50) NOT NULL,
  `breed` varchar(50) NOT NULL,
  `age` int(3) NOT NULL,
  `sex` varchar(50) NOT NULL,
  `neutered` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `animals`
--

INSERT INTO `animals` (`name`, `specie`, `breed`, `age`, `sex`, `neutered`) VALUES
('Bobby', 'Dog', 'Belgian Malinois', 3, 'M', 'N'),
('Lili', 'Cat', 'Bengal', 8, 'F', 'Y'),
('Pinky', 'Dog', 'German Shepherd', 8, 'M', 'N'),
('Minina', 'Cat', 'American Shorthair', 4, 'F', 'N');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `mail` varchar(250) NOT NULL,
  `telephone` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `name`, `lastname`, `mail`, `telephone`) VALUES
(1, 'androidbeing', 'password01', 'admin', 'Andrea', 'Morales Mata', 'andrea@mail.com', 789564433),
(2, 'anva', 'password02', 'admin', 'Ani Liseth', 'Valle Banegas', 'anivalle@mail.com', 689560034),
(3, 'akitayum', 'password03', 'registered', 'Ester', 'Garrido Lopez', 'estergl@mail.com', 694376458),
(4, 'animallover', 'password04', 'registered', 'Ivan', 'Presa Cantos', 'ivanpc@mail.com', 687974568);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telephone` (`telephone`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
