-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 25-02-2023 a las 14:02:31
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
  `id` int(11) NOT NULL,
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

INSERT INTO `animals` (`id`, `name`, `specie`, `breed`, `age`, `sex`, `neutered`) VALUES
(1, 'Bobby', 'Dog', 'Belgian Malinois', 3, 'M', 'N'),
(2, 'Lili', 'Cat', 'Bengal', 8, 'F', 'Y'),
(3, 'Pinky', 'Dog', 'German Shepherd', 8, 'M', 'N'),
(4, 'Minina', 'Cat', 'American Shorthair', 4, 'F', 'Y'),
(6, 'Rocky', 'Dog', 'Spanish Greyhound', 1, 'M', 'N'),
(7, 'Ramona', 'Turtle', 'Russian turtle', 17, 'F', 'N'),
(8, 'Lia', 'Ferret', 'Standard', 4, 'F', 'Y'),
(9, 'Tambor', 'Rabbit', 'Rex', 2, 'M', 'N');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(15) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `mobile` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`username`, `password`, `role`, `name`, `lastname`, `mail`, `mobile`) VALUES
('akitayum', 'password03', 'registered', 'Ester', 'Garrido Perez', 'estergp@mail.com', 734865984),
('androidbeing', 'password01', 'admin', 'Andrea', 'Morales Mata', 'andrea@mail.com', 645743876),
('animalseeker', 'password04', 'registered', 'Carlos', 'Garcia Balero', 'carlosgb@mail.com', 645873297),
('anivalle', 'password02', 'admin', 'Ani Liseth', 'Valle Banegas', 'aniva@mail.com', 634521184);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `phone` (`mobile`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animals`
--
ALTER TABLE `animals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
