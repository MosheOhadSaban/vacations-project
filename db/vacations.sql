CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followedvacations`
--

DROP TABLE IF EXISTS `followedvacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followedvacations` (
  `followId` int NOT NULL,
  `vacationId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`followId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followedvacations`
--

LOCK TABLES `followedvacations` WRITE;
/*!40000 ALTER TABLE `followedvacations` DISABLE KEYS */;
INSERT INTO `followedvacations` VALUES (285102783,5,2),(368393899,6,2),(931691393,7,2);
/*!40000 ALTER TABLE `followedvacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `userType` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UserId_UNIQUE` (`userId`),
  UNIQUE KEY `UserName_UNIQUE` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','364b963f107492c840bcf92696ff446b','Admin','Admin','ADMIN'),(2,'User1','8573bc71a32ab50d61d95f55393bca62','User1','User1','CUSTOMER'),(16,'User2','b284b613576afdd572832d592716bc7b','Moshe','Saban','CUSTOMER'),(17,'Saban123','ac20839ab9e90a5362a0ed9d6b6b743d','Moshe','Ohad','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacationsdetails`
--

DROP TABLE IF EXISTS `vacationsdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacationsdetails` (
  `vacationId` int NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `destination` varchar(45) DEFAULT NULL,
  `description` longtext,
  `price` int DEFAULT NULL,
  `startDate` varchar(45) DEFAULT NULL,
  `endDate` varchar(45) DEFAULT NULL,
  `image` longtext,
  PRIMARY KEY (`vacationId`),
  UNIQUE KEY `VacationId_UNIQUE` (`vacationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacationsdetails`
--

LOCK TABLES `vacationsdetails` WRITE;
/*!40000 ALTER TABLE `vacationsdetails` DISABLE KEYS */;
INSERT INTO `vacationsdetails` VALUES (1,'South Island','New Zealand','New Zealand\'s South Island brims with majestic landscapes at every turn, from dramatic mountains to fjords to glaciers. Here, you can admire the mountains of Fiordland National Park, a UNESCO World Heritage Site, from hiking trails or a boat on Milford Sound.',432,'2021-10-26','2021-10-31','http://127.0.0.1:3001/south-iland.jpeg'),(3,'Bora Bora','French Polynesia','What this small French Polynesian island may lack in size it makes up for in sheer tropical beauty. Here, you\'ll find picturesque beaches, lush jungles and luxurious resorts.',953,'2021-12-03','2021-12-13','http://127.0.0.1:3001/bora-bora.jpeg'),(4,'Maui','Hawaii','Whether you\'re driving along the Road to Hana, enjoying a bird\'s-eye view of the lush coastline from a helicopter, snorkeling with sea turtles or simply relaxing on the Hawaiian island\'s honey- or black-colored beaches, you\'ll find that Maui is unlike any other tropical destination.',1500,'2022-06-05','2022-06-15','http://127.0.0.1:3001/Maui.jpeg'),(5,'Tahiti','French Polynesia','Travel to this island – the largest in French Polynesia – if you\'ve been dreaming of a vacation spent lazing in a lavish overwater bungalow. Beyond the posh resorts, Tahiti boasts black sand beaches, a bustling capital and prime snorkeling and surfing conditions.',2000,'2022-08-05','2022-08-18','http://127.0.0.1:3001/tahiti.jpg'),(6,'London','United Kingdom','London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, plan to visit the Tower of London, Tate Modern, Buckingham Palace or the British Museum before sitting down to a classic afternoon tea.',1350,'2021-12-20','2022-01-02','http://127.0.0.1:3001/london.jpeg'),(7,'Tokyo','Japan','Simply setting foot in Japan\'s cosmopolitan capital is an experience within itself. A city known for its bustling streets and flashing neon signs, Tokyo has an electric energy and plenty of attractions to discover. Foodies won\'t be let down by the city\'s fresh sushi and hearty ramen. Budding photographers and adrenaline junkies will love taking in the sweeping panoramas from the top of the Tokyo Skytree',500,'16-12-2021','23-12-2021','http://127.0.0.1:3001/tokyo.jpeg'),(8,'Pucket','Thailand','Located in southern Thailand, Phuket offers something for everyone, especially budget-minded travelers. Activities like spa treatments and boat tours come with low price tags, as do accommodations.',750,'11-01-2022','20-01-2022','http://127.0.0.1:3001/phuket.jpeg'),(9,'Paris','France','The magnetic City of Light draws visitors from around the globe who come to see iconic attractions like the Eiffel Tower, the Louvre and the Arc de Triomphe. But what travelers really fall in love with are the city\'s quaint cafes, vibrant markets, trendy shopping districts and unmistakable je ne sais quoi charm.',1050,'01-03-2022','06-03-2022','http://127.0.0.1:3001/paris.jpeg');
/*!40000 ALTER TABLE `vacationsdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-21 17:33:05
