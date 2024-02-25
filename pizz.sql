-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2023 at 12:27 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizza_order_system`
--
CREATE DATABASE IF NOT EXISTS `pizza_order_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pizza_order_system`;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(6, 'Chicken Pizza', '2023-04-06 14:16:48', '2023-04-06 14:16:48'),
(7, 'Meat Pizza', '2023-04-06 14:16:55', '2023-04-06 14:16:55'),
(8, 'Vegetarian Pizza', '2023-04-06 14:17:02', '2023-04-06 14:17:02'),
(9, 'Mexican Pizza', '2023-04-06 14:17:11', '2023-04-06 14:17:11'),
(10, 'Seafood Pizza', '2023-04-06 14:17:21', '2023-04-06 14:17:21'),
(11, 'Classic Pizza', '2023-04-06 14:17:38', '2023-04-06 14:17:38'),
(12, 'Cheese Pizza', '2023-04-06 14:17:47', '2023-04-06 14:17:47'),
(13, 'Gourmet Pizza', '2023-04-06 14:25:15', '2023-04-06 14:25:15');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(40, '2014_10_12_000000_create_users_table', 1),
(41, '2014_10_12_100000_create_password_resets_table', 1),
(42, '2014_10_12_200000_add_two_factor_columns_to_users_table', 1),
(43, '2019_08_19_000000_create_failed_jobs_table', 1),
(44, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(45, '2023_02_09_100542_create_sessions_table', 1),
(46, '2023_02_10_182526_create_categories_table', 1),
(47, '2023_02_10_183109_create_products_table', 1),
(48, '2023_02_10_183131_create_carts_table', 1),
(49, '2023_02_10_183149_create_orders_table', 1),
(50, '2023_02_10_183209_create_ratings_table', 1),
(51, '2023_02_10_183225_create_contacts_table', 1),
(52, '2023_03_23_192047_create_order_lists_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `total_price` int(11) NOT NULL,
  `status` varchar(2) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_code`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, '73220077064', 153000, '1', '2023-04-06 15:23:49', '2023-04-06 15:27:12'),
(2, 2, '33460076138', 63000, '0', '2023-06-26 01:03:49', '2023-06-26 01:03:49'),
(3, 8, '2180072715', 153000, '0', '2023-07-12 22:17:06', '2023-07-12 22:17:06'),
(4, 8, '12180079647', 153000, '0', '2023-07-12 22:17:07', '2023-07-12 22:17:07');

-- --------------------------------------------------------

--
-- Table structure for table `order_lists`
--

CREATE TABLE `order_lists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `order_code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_lists`
--

INSERT INTO `order_lists` (`id`, `user_id`, `product_id`, `qty`, `total`, `order_code`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 2, 60000, '73220077064', '2023-04-06 15:23:48', '2023-04-06 15:23:48'),
(2, 2, 2, 2, 70000, '73220077064', '2023-04-06 15:23:48', '2023-04-06 15:23:48'),
(3, 2, 3, 1, 20000, '73220077064', '2023-04-06 15:23:48', '2023-04-06 15:23:48'),
(4, 2, 1, 2, 60000, '33460076138', '2023-06-26 01:03:49', '2023-06-26 01:03:49'),
(5, 8, 1, 5, 150000, '2180072715', '2023-07-12 22:17:06', '2023-07-12 22:17:06'),
(6, 8, 1, 5, 150000, '12180079647', '2023-07-12 22:17:07', '2023-07-12 22:17:07');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` mediumtext NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `waiting_time` int(11) NOT NULL,
  `view_count` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `image`, `price`, `waiting_time`, `view_count`, `created_at`, `updated_at`) VALUES
(1, 6, 'Buffalo Chicken Pizza', 'This pizza features buffalo chicken, mozzarella cheese, and a drizzle of ranch dressing.', '642f36b2051baBuffalo Chicken Pizza.jpg', 30000, 15, 9, '2023-04-06 14:46:34', '2023-07-14 03:02:10'),
(2, 7, 'Philly Cheesesteak Pizza', 'This pizza is topped with sliced steak, sautéed onions, green peppers, and provolone cheese.', '642f3703a3d37buffalochickenpizza.jpg', 35000, 15, 2, '2023-04-06 14:47:55', '2023-04-06 15:21:25'),
(3, 8, 'Greek Pizza', 'Greek pizza features feta cheese, olives, tomatoes, and spinach, and is typically meatless.', '642f37231d293greek-pizza.jpg', 20000, 15, 1, '2023-04-06 14:48:27', '2023-04-06 15:21:30'),
(4, 9, 'Taco Pizza', 'This pizza is topped with seasoned ground beef, cheddar cheese, lettuce, and tomato', '642f3746efc70Taco Pizza.jpg', 30000, 20, 0, '2023-04-06 14:49:03', '2023-04-06 14:49:03'),
(5, 7, 'Bacon Cheeseburger Pizza', 'As the name suggests, this pizza combines bacon, ground beef, and cheddar cheese.', '642f37613bef1Bacon Cheeseburger Pizza.jpg', 25000, 20, 1, '2023-04-06 14:49:29', '2023-07-14 02:54:14'),
(6, 10, 'Seafood Pizza', 'This pizza features shrimp, crab meat, clams, and mozzarella cheese.', '642f377c69ef5Seafood Pizza.jpg', 40000, 20, 0, '2023-04-06 14:49:56', '2023-04-06 14:49:56'),
(7, 6, 'Barbecue Chicken Pizza', 'This pizza is topped with barbecue sauce, grilled chicken, red onion, and mozzarella cheese', '642f37939062fBarbecue Chicken Pizza.jpg', 20000, 20, 0, '2023-04-06 14:50:19', '2023-04-06 14:50:19'),
(8, 8, 'Veggie Supreme Pizza', 'This pizza is loaded with various vegetables such as onions, peppers, mushrooms, and olives.', '642f37b072222Veggie Supreme Pizza.jpg', 25000, 15, 0, '2023-04-06 14:50:48', '2023-04-06 14:50:48'),
(9, 8, 'Meatball Pizza', 'This pizza features sliced meatballs, marinara sauce, and mozzarella cheese.', '642f3876d2e95Meatball Pizza.jpg', 35000, 20, 1, '2023-04-06 14:54:06', '2023-04-06 15:10:06'),
(10, 8, 'Spinach Alfredo Pizza', 'This pizza is topped with creamy Alfredo sauce, spinach, and mozzarella cheese.', '642f3a1797c6bSpinach Alfredo Pizza.jpg', 30000, 20, 0, '2023-04-06 15:01:03', '2023-04-06 15:01:03'),
(11, 8, 'Mac and Cheese Pizza', 'This unique pizza features a macaroni and cheese topping, along with mozzarella cheese.', '642f3a333fcf81Mac and Cheese Pizza.jpg', 30000, 15, 0, '2023-04-06 15:01:31', '2023-04-06 15:01:31'),
(12, 7, 'Supreme Pizza', 'This pizza is loaded with a variety of toppings such as sausage, pepperoni, and vegetables.', '642f3a5011c76Supreme Pizza.jpg', 35000, 20, 0, '2023-04-06 15:02:00', '2023-04-06 15:02:00'),
(13, 6, 'Chicken Bacon Ranch Pizza', 'This pizza is topped with grilled chicken, bacon, ranch dressing, and mozzarella cheese.', '642f3a6d1f48bChicken Bacon Ranch Pizza.jpg', 25000, 25, 1, '2023-04-06 15:02:29', '2023-06-26 01:11:56'),
(14, 8, 'Mediterranean Pizza', 'Mediterranean pizza features ingredients such as artichokes, roasted red peppers, and feta.', '642f3a88531f1Margherita Pizza.jpg', 15000, 15, 0, '2023-04-06 15:02:56', '2023-04-06 15:02:56'),
(15, 8, 'Roasted Garlic and Mushroom Pizza', 'This pizza is topped with roasted garlic, sautéed mushrooms, and mozzarella cheese.', '642f3aa66d2e2Roasted Garlic and Mushroom Pizza.jpg', 25000, 20, 1, '2023-04-06 15:03:26', '2023-04-06 15:17:18'),
(16, 7, 'Sausage and Peppers Pizza', '.This pizza is a cheese lover\'s dream, featuring four types of cheese such as parmesan and gorgonzola.', '642f3aefe1389Quattro Formaggi Pizza.jpg', 30000, 20, 0, '2023-04-06 15:04:39', '2023-04-06 15:04:39'),
(17, 13, 'Truffle Pizza', 'This gourmet pizza features truffle oil, mushrooms, and shaved parmesan cheese.', '642f3b335c421Truffle Pizza.jpg', 50000, 20, 0, '2023-04-06 15:05:47', '2023-04-06 15:05:47');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating_count` int(11) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6ZdFWTmqV4zty5fy9W3c6oYYmKPNoB93ADcyPx2h', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMVpucGNmek42ZzRYdHFXZEJZbmZaQVVSYmF0YzE3ekVwTG9XR01nWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpblBhZ2UiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1689364911),
('FNikFViotkZyx5wwCCrVGteWDcUsAePj9T2iyO27', 7, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiVWlzcGYzVFd4RnE1OEpSRTFMdEZmYjZwejlTUDVHUDJvSnpqVFl6UyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NztzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0MjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2NhdGVnb3J5L2xpc3Q/cGFnZT0xIjt9fQ==', 1690064757),
('GDCNvaWica00Bu6Shgv1PRwNIGPhxNCWqlyVYkuo', 8, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiR0YzM3FvQkhNaW5ocVQ4TVlVWWlBcGVFNXFqbU84VTdrWG5zSEdxSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c2VyL3BpenphL2RldGFpbHMvMSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjg7fQ==', 1689225049),
('JdatINCOxsCT0HtJ5Qn3yTZkTkxn3i8SW9ug0ptC', 8, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiR0RlMURKWW9PaXdVUHNtbUlYZTI4aXNkeTlNOHgxa1JNNkd3MG5NcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC91c2VyL2hvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo4O30=', 1689327132);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL DEFAULT '0',
  `gender` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `current_team_id` bigint(20) UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `gender`, `image`, `address`, `role`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(2, 'Aye', 'parkjinny02@gmail.com', '89', 'male', '642f3f89ac7885536f39d7114663279d383c7687c0b28.jpg', 'yangon', 'user', NULL, '$2y$10$Rm7NZuMXz.8bA0rt84fytu5w8u8GSEIBaIcZhW0vi4DIbMtVKg5Eu', NULL, NULL, NULL, NULL, NULL, NULL, '2023-04-06 15:06:50', '2023-04-08 08:51:00'),
(7, 'admin', 'admin@gmail.com', '09767624434', 'male', NULL, 'yangon', 'admin', NULL, '$2y$10$qvEfoShDmaIVlBlFd80Fu.aGWhfu4D5u4/e.6c.Coz0Nsdf0TzXkm', NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-26 01:10:03', '2023-06-26 01:10:03'),
(8, 'user', 'user@gmail.com', '09767643216', 'male', NULL, 'yangon', 'user', NULL, '$2y$10$lsl7OX6Xxvf/1tJICv3lQuIRNBNB6/UeUV4SaueQfjxaIpiJ/9b8W', NULL, NULL, NULL, NULL, NULL, NULL, '2023-06-26 01:10:03', '2023-06-26 01:10:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_lists`
--
ALTER TABLE `order_lists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_lists`
--
ALTER TABLE `order_lists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
