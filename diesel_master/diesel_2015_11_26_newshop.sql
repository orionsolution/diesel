-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2015 at 10:18 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `diesel_2015_11_26`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
`cart_id` int(32) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `product_id` int(32) NOT NULL,
  `level_id` int(32) NOT NULL,
  `sku` int(32) NOT NULL,
  `code` varchar(50) NOT NULL,
  `prod_type` enum('Sports','Apparel','Jacket') NOT NULL,
  `color` varchar(50) NOT NULL,
  `size` varchar(50) NOT NULL,
  `qty` int(32) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `price_sale` decimal(19,2) NOT NULL,
  `product_price` decimal(19,2) NOT NULL,
  `ret_set` enum('Yes','No') NOT NULL DEFAULT 'No',
  `promo_code` varchar(50) NOT NULL,
  `discount` float NOT NULL,
  `created_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `prod_attributes`
--

CREATE TABLE IF NOT EXISTS `prod_attributes` (
`prod_attributes_id` int(11) NOT NULL,
  `style` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `attr_value` varchar(700) COLLATE utf8_unicode_ci NOT NULL,
  `attr_id` varchar(35) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `prod_barcode`
--

CREATE TABLE IF NOT EXISTS `prod_barcode` (
`prod_barcode_id` int(11) NOT NULL,
  `style` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `barcode` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `microcolor` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `macrocolor` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `prod_images`
--

CREATE TABLE IF NOT EXISTS `prod_images` (
`prod_images_id` int(11) NOT NULL,
  `style` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `variation_code` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `image_path` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `prod_mast`
--

CREATE TABLE IF NOT EXISTS `prod_mast` (
`product_mast_id` int(11) NOT NULL,
  `style` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `ageRangeCode` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `fitCode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `genderCode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `madeInCode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `nameCode` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `seasonCode` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `sizeScaleCode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `themeCode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `washCode` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `min_order_qty` int(11) NOT NULL,
  `disp_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `short_desc` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `long_desc` text COLLATE utf8_unicode_ci NOT NULL,
  `online_flag` enum('Yes','No') COLLATE utf8_unicode_ci NOT NULL,
  `available_flag` enum('Yes','No') COLLATE utf8_unicode_ci NOT NULL,
  `searchable_flag` enum('Yes','No') COLLATE utf8_unicode_ci NOT NULL,
  `page_title` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `prod_variation`
--

CREATE TABLE IF NOT EXISTS `prod_variation` (
`prod_variation_id` int(11) NOT NULL,
  `style` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `attr_type` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `attr_code` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `attr_value` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE IF NOT EXISTS `register` (
`user_id` int(32) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(30) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `postcode` bigint(10) NOT NULL,
  `dob` varchar(50) NOT NULL,
  `day` int(2) NOT NULL,
  `month` int(2) NOT NULL,
  `year` int(4) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  `created_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=99 ;

-- --------------------------------------------------------

--
-- Table structure for table `store_mast`
--

CREATE TABLE IF NOT EXISTS `store_mast` (
`storeid` int(11) NOT NULL,
  `store` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(250) NOT NULL,
  `suburb` varchar(250) NOT NULL,
  `state` varchar(10) NOT NULL,
  `postcode` varchar(10) NOT NULL,
  `website` varchar(150) NOT NULL,
  `store_image` varchar(100) NOT NULL,
  `latitude` float(10,6) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  `priority` int(11) NOT NULL,
  `open_hours` varchar(250) NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `subscribe`
--

CREATE TABLE IF NOT EXISTS `subscribe` (
  `user_id` int(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `postcode` bigint(10) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `created_dt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
 ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `prod_attributes`
--
ALTER TABLE `prod_attributes`
 ADD PRIMARY KEY (`prod_attributes_id`), ADD KEY `attr_id` (`attr_value`(255)), ADD KEY `attr_value` (`attr_id`);

--
-- Indexes for table `prod_barcode`
--
ALTER TABLE `prod_barcode`
 ADD PRIMARY KEY (`prod_barcode_id`);

--
-- Indexes for table `prod_images`
--
ALTER TABLE `prod_images`
 ADD PRIMARY KEY (`prod_images_id`);

--
-- Indexes for table `prod_mast`
--
ALTER TABLE `prod_mast`
 ADD PRIMARY KEY (`product_mast_id`);

--
-- Indexes for table `prod_variation`
--
ALTER TABLE `prod_variation`
 ADD PRIMARY KEY (`prod_variation_id`);

--
-- Indexes for table `register`
--
ALTER TABLE `register`
 ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `store_mast`
--
ALTER TABLE `store_mast`
 ADD PRIMARY KEY (`storeid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
MODIFY `cart_id` int(32) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prod_attributes`
--
ALTER TABLE `prod_attributes`
MODIFY `prod_attributes_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prod_barcode`
--
ALTER TABLE `prod_barcode`
MODIFY `prod_barcode_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prod_images`
--
ALTER TABLE `prod_images`
MODIFY `prod_images_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prod_mast`
--
ALTER TABLE `prod_mast`
MODIFY `product_mast_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `prod_variation`
--
ALTER TABLE `prod_variation`
MODIFY `prod_variation_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
MODIFY `user_id` int(32) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `store_mast`
--
ALTER TABLE `store_mast`
MODIFY `storeid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
