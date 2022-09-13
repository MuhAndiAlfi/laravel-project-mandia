-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2022 at 02:58 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_project_mandia`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(5, '2022_09_12_044234_tb_m_client', 1),
(6, '2022_09_12_045247_tb_m_project', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_m_client`
--

CREATE TABLE `tb_m_client` (
  `client_id` int(10) UNSIGNED NOT NULL,
  `client_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_m_client`
--

INSERT INTO `tb_m_client` (`client_id`, `client_name`, `client_address`) VALUES
(1, 'NEC', 'Jakarta'),
(2, 'TAM', 'Jakarta'),
(3, 'TUA', 'Bandung');

-- --------------------------------------------------------

--
-- Table structure for table `tb_m_project`
--

CREATE TABLE `tb_m_project` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `project_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `project_start` date NOT NULL,
  `project_end` date NOT NULL,
  `project_status` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_m_project`
--

INSERT INTO `tb_m_project` (`project_id`, `project_name`, `client_id`, `project_start`, `project_end`, `project_status`) VALUES
(1, 'WMSS', 2, '2022-07-28', '2022-08-28', 'ONGOING'),
(2, 'FILMS', 2, '2022-06-01', '2022-08-31', 'DOING'),
(3, 'DOC', 2, '2022-01-01', '2022-04-30', 'DONE'),
(4, 'POS', 3, '2022-05-01', '2022-08-31', 'DOING'),
(22, 'CCC', 3, '2022-09-13', '2022-12-13', 'OPEN'),
(25, 'TRY', 3, '2022-09-13', '2022-11-13', 'DONE'),
(26, 'CATCH', 2, '2022-09-13', '2022-10-13', 'ONGOING'),
(27, 'FFF', 1, '2022-09-13', '2022-12-13', 'DONE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_m_client`
--
ALTER TABLE `tb_m_client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `tb_m_project`
--
ALTER TABLE `tb_m_project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `tb_m_project_client_id_foreign` (`client_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_m_client`
--
ALTER TABLE `tb_m_client`
  MODIFY `client_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_m_project`
--
ALTER TABLE `tb_m_project`
  MODIFY `project_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_m_project`
--
ALTER TABLE `tb_m_project`
  ADD CONSTRAINT `tb_m_project_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `tb_m_client` (`client_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
