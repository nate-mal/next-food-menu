-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: gateway01.us-west-2.prod.aws.tidbcloud.com    Database: food_menu
-- ------------------------------------------------------
-- Server version	5.7.25-TiDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Breakfast'),(2,'Beef & Pork'),(3,'Chicken & Fish'),(4,'Salads'),(5,'Snacks & Sides'),(6,'Desserts'),(7,'Beverages'),(8,'Coffee & Tea'),(9,'Smoothies & Shakes');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `_address` text NOT NULL,
  `tel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=2120001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (2030001,'nat','natanael@gmail.com','Street','2478548564'),(2030002,'Malita Natanael','natanael@gmail.com','Street','2478548564'),(2030003,'Malita Natanael','natanael@gmail.com','Street','2478548564'),(2030004,'YORKI','natanael@gmail.com','Street','2478548564'),(2060001,'YORKI','natanaelmalita@gmail.com','Strada Dorobanţilor Str. Dorobanti nr.6','0747390307'),(2090001,'Vikisor','viki_dragutza@yahoo.com','Gheorghe Magheru 40','0753421343');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `set_time` timestamp DEFAULT CURRENT_TIMESTAMP,
  `completed_time` timestamp NULL DEFAULT NULL,
  `obs` text DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  CONSTRAINT `fk_1` FOREIGN KEY (`client_id`) REFERENCES `food_menu`.`clients` (`id`) /*T![FOREIGN KEY] INVALID */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=120001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (30001,2030001,'2023-01-23 19:49:11',NULL,NULL),(30002,2030002,'2023-01-23 19:49:20',NULL,NULL),(30003,2030003,'2023-01-23 19:52:15',NULL,NULL),(30004,2030004,'2023-01-23 20:00:38',NULL,NULL),(60001,2060001,'2023-01-23 22:16:52',NULL,NULL),(90001,2090001,'2023-01-23 23:44:15',NULL,NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_products`
--

DROP TABLE IF EXISTS `orders_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  CONSTRAINT `fk_1` FOREIGN KEY (`order_id`) REFERENCES `food_menu`.`orders` (`id`) ON DELETE CASCADE /*T![FOREIGN KEY] INVALID */,
  CONSTRAINT `fk_2` FOREIGN KEY (`product_id`) REFERENCES `food_menu`.`products` (`id`) /*T![FOREIGN KEY] INVALID */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=120001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
INSERT INTO `orders_products` VALUES (30001,30001,2,1,15.3),(30002,30002,2,1,15.3),(30003,30003,2,1,15.3),(30004,30004,1,1,16.3),(30005,30004,2,1,15.3),(30006,30004,5,1,16.2),(30007,30004,8,1,21.7),(30008,30004,10,1,19.8),(60001,60001,193,1,28.8),(60002,60001,6,2,19.9),(60003,60001,111,1,9.1),(60004,60001,137,5,0),(60005,60001,136,1,39.3),(60006,60001,86,2,25.5),(90001,90001,94,3,11.1),(90002,90001,100,3,4.7),(90003,90001,112,3,12.8);
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Belgian Waffles','Two of our famous Belgian Waffles with plenty of real maple syrup',5.95),(2,'Strawberry Belgian Waffles','Light Belgian waffles covered with strawberries and whipped cream',6.95),(3,'Berry-Berry Belgian Waffles','Light Belgian waffles covered with an assortment of fresh berries and whipped cream',12.35),(4,'French Toast','Thick slices made from our homemade sourdough bread',12.99),(5,'Homestyle Breakfast','Two eggs, bacon or sausage, toast, and our ever-popular hash browns',8.99),(6,'Belgian Waffles','Two of our famous Belgian Waffles with plenty of real maple syrup',5.95),(7,'Strawberry Belgian Waffles','Light Belgian waffles covered with strawberries and whipped cream',6.95),(8,'Berry-Berry Belgian Waffles','Light Belgian waffles covered with an assortment of fresh berries and whipped cream',12.35),(9,'French Toast','Thick slices made from our homemade sourdough bread',12.99),(10,'Homestyle Breakfast','Two eggs, bacon or sausage, toast, and our ever-popular hash browns',8.99);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products2`
--

DROP TABLE IF EXISTS `products2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products2` (
  `category_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `serving_size` varchar(200) NOT NULL,
  `price` float NOT NULL,
  `calories` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) /*T![clustered_index] CLUSTERED */,
  CONSTRAINT `fk_1` FOREIGN KEY (`category_id`) REFERENCES `food_menu`.`category` (`id`) /*T![FOREIGN KEY] INVALID */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin AUTO_INCREMENT=30001;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products2`
--

LOCK TABLES `products2` WRITE;
/*!40000 ALTER TABLE `products2` DISABLE KEYS */;
INSERT INTO `products2` VALUES (1,1,'Egg McMuffin',NULL,'4.8 oz (136 g)',16.3,300),(1,2,'Egg White Delight',NULL,'4.8 oz (135 g)',15.3,250),(1,3,'Sausage McMuffin',NULL,'3.9 oz (111 g)',15.2,370),(1,4,'Sausage McMuffin with Egg',NULL,'5.7 oz (161 g)',18,450),(1,5,'Sausage McMuffin with Egg Whites',NULL,'5.7 oz (161 g)',16.2,400),(1,6,'Steak & Egg McMuffin',NULL,'6.5 oz (185 g)',19.9,430),(1,7,'Bacon, Egg & Cheese Biscuit (Regular Biscuit)',NULL,'5.3 oz (150 g)',18.4,460),(1,8,'Bacon, Egg & Cheese Biscuit (Large Biscuit)',NULL,'5.8 oz (164 g)',21.7,520),(1,9,'Bacon, Egg & Cheese Biscuit with Egg Whites (Regular Biscuit)',NULL,'5.4 oz (153 g)',16.9,410),(1,10,'Bacon, Egg & Cheese Biscuit with Egg Whites (Large Biscuit)',NULL,'5.9 oz (167 g)',19.8,470),(1,11,'Sausage Biscuit (Regular Biscuit)',NULL,'4.1 oz (117 g)',13.2,430),(1,12,'Sausage Biscuit (Large Biscuit)',NULL,'4.6 oz (131 g)',15.7,480),(1,13,'Sausage Biscuit with Egg (Regular Biscuit)',NULL,'5.7 oz (163 g)',16.1,510),(1,14,'Sausage Biscuit with Egg (Large Biscuit)',NULL,'6.2 oz (177 g)',18.4,570),(1,15,'Sausage Biscuit with Egg Whites (Regular Biscuit)',NULL,'5.9 oz (167 g)',14.6,460),(1,16,'Sausage Biscuit with Egg Whites (Large Biscuit)',NULL,'6.4 oz (181 g)',16.9,520),(1,17,'Southern Style Chicken Biscuit (Regular Biscuit)',NULL,'5 oz (143 g)',15.5,410),(1,18,'Southern Style Chicken Biscuit (Large Biscuit)',NULL,'5.5 oz (157 g)',17.9,470),(1,19,'Steak & Egg Biscuit (Regular Biscuit)',NULL,'7.1 oz (201 g)',20.7,540),(1,20,'Bacon, Egg & Cheese McGriddles',NULL,'6.1 oz (174 g)',21.6,460),(1,21,'Bacon, Egg & Cheese McGriddles with Egg Whites',NULL,'6.3 oz (178 g)',19.9,400),(1,22,'Sausage McGriddles',NULL,'5 oz (141 g)',15.6,420),(1,23,'Sausage, Egg & Cheese McGriddles',NULL,'7.1 oz (201 g)',21,550),(1,24,'Sausage, Egg & Cheese McGriddles with Egg Whites',NULL,'7.2 oz (205 g)',19.5,500),(1,25,'Bacon, Egg & Cheese Bagel',NULL,'6.9 oz (197 g)',26.4,620),(1,26,'Bacon, Egg & Cheese Bagel with Egg Whites',NULL,'7.1 oz (201 g)',24.8,570),(1,27,'Steak, Egg & Cheese Bagel',NULL,'8.5 oz (241 g)',26.7,670),(1,28,'Big 1 (Regular Biscuit)',NULL,'9.5 oz (269 g)',23.6,740),(1,29,'Big 1 (Large Biscuit)',NULL,'10 oz (283 g)',25.9,800),(1,30,'Big 1 with Egg Whites (Regular Biscuit)',NULL,'9.6 oz (272 g)',20.4,640),(1,31,'Big 1 with Egg Whites (Large Biscuit)',NULL,'10.1 oz (286 g)',22.6,690),(1,32,'Big 1 with Hotcakes (Regular Biscuit)',NULL,'14.8 oz (420 g)',40.2,1090),(1,33,'Big 1 with Hotcakes (Large Biscuit)',NULL,'15.3 oz (434 g)',42.4,1150),(1,34,'Big 1 with Hotcakes and Egg Whites (Regular Biscuit)',NULL,'14.9 oz (423 g)',37.6,990),(1,35,'Big 1 with Hotcakes and Egg Whites (Large Biscuit)',NULL,'15.4 oz (437 g)',39.7,1050),(1,36,'Hotcakes',NULL,'5.3 oz (151 g)',16.9,350),(1,37,'Hotcakes and Sausage',NULL,'6.8 oz (192 g)',19.2,520),(1,38,'Sausage Burrito',NULL,'3.9 oz (111 g)',13,300),(1,39,'Hash Brown',NULL,'2 oz (56 g)',4.6,150),(1,40,'Cinnamon Melts',NULL,'4 oz (114 g)',18,460),(1,41,'Fruit & Maple Oatmeal',NULL,'9.6 oz (251 g)',29.7,290),(1,42,'Fruit & Maple Oatmeal without Brown Sugar',NULL,'9.6 oz (251 g)',26.8,260),(2,43,'Big Mac',NULL,'7.4 oz (211 g)',21,530),(2,44,'Quarter Pounder with Cheese',NULL,'7.1 oz (202 g)',22.2,520),(2,45,'Quarter Pounder with Bacon & Cheese',NULL,'8 oz (227 g)',26.4,600),(2,46,'Quarter Pounder with Bacon Habanero Ranch',NULL,'8.3 oz (235 g)',25.7,610),(2,47,'Quarter Pounder Deluxe',NULL,'8.6 oz (244 g)',22.7,540),(2,48,'Double Quarter Pounder with Cheese',NULL,'10 oz (283 g)',25.8,750),(2,49,'Hamburger',NULL,'3.5 oz (98 g)',11.7,240),(2,50,'Cheeseburger',NULL,'4 oz (113 g)',14.6,290),(2,51,'Double Cheeseburger',NULL,'5.7 oz (161 g)',19.3,430),(2,52,'Bacon Clubhouse Burger',NULL,'9.5 oz (270 g)',28.8,720),(2,53,'McDouble',NULL,'5.2 oz (147 g)',16.6,380),(2,54,'Bacon McDouble',NULL,'5.7 oz (161 g)',19.2,440),(2,55,'Daily Double',NULL,'6.7 oz (190 g)',17.2,430),(2,56,'Jalapeño Double',NULL,'5.6 oz (159 g)',18.1,430),(2,57,'McRib',NULL,'7.3 oz (208 g)',18.5,500),(3,58,'Premium Crispy Chicken Classic Sandwich',NULL,'7.5 oz (213 g)',20.9,510),(3,59,'Premium Grilled Chicken Classic Sandwich',NULL,'7 oz (200 g)',18.9,350),(3,60,'Premium Crispy Chicken Club Sandwich',NULL,'8.8 oz (249 g)',27.8,670),(3,61,'Premium Grilled Chicken Club Sandwich',NULL,'8.3 oz (235 g)',25.4,510),(3,62,'Premium Crispy Chicken Ranch BLT Sandwich',NULL,'8.1 oz (230 g)',25.2,610),(3,63,'Premium Grilled Chicken Ranch BLT Sandwich',NULL,'7.6 oz (217 g)',22.8,450),(3,64,'Bacon Clubhouse Crispy Chicken Sandwich',NULL,'10 oz (284 g)',30.8,750),(3,65,'Bacon Clubhouse Grilled Chicken Sandwich',NULL,'9.5 oz (270 g)',28.9,590),(3,66,'Southern Style Crispy Chicken Sandwich',NULL,'5.6 oz (160 g)',16.8,430),(3,67,'McChicken',NULL,'5.1 oz (143 g)',14.1,360),(3,68,'Bacon Cheddar McChicken',NULL,'6 oz (171 g)',19.7,480),(3,69,'Bacon Buffalo Ranch McChicken',NULL,'5.7 oz (161 g)',18.5,430),(3,70,'Buffalo Ranch McChicken',NULL,'5.2 oz (148 g)',15.6,360),(3,71,'Premium McWrap Chicken & Bacon (Crispy Chicken)',NULL,'11.1 oz (316 g)',31.4,630),(3,72,'Premium McWrap Chicken & Bacon (Grilled Chicken)',NULL,'10.7 oz (302 g)',29.6,480),(3,73,'Premium McWrap Chicken & Ranch (Crispy Chicken)',NULL,'10.9 oz (310 g)',29.8,610),(3,74,'Premium McWrap Chicken & Ranch (Grilled Chicken)',NULL,'10.5 oz (297 g)',26.8,450),(3,75,'Premium McWrap Southwest Chicken (Crispy Chicken)',NULL,'11.1 oz (314 g)',33.1,670),(3,76,'Premium McWrap Southwest Chicken (Grilled Chicken)',NULL,'11.2 oz (318 g)',31.9,520),(3,77,'Premium McWrap Chicken Sweet Chili (Crispy Chicken)',NULL,'10.7 oz (304 g)',28.9,540),(3,78,'Premium McWrap Chicken Sweet Chili (Grilled Chicken)',NULL,'10.3 oz (291 g)',26.6,380),(3,79,'Chicken McNuggets (4 piece)',NULL,'2.3 oz (65 g)',4.7,190),(3,80,'Chicken McNuggets (6 piece)',NULL,'3.4 oz (97 g)',7.2,280),(3,81,'Chicken McNuggets (10 piece)',NULL,'5.7 oz (162 g)',11.9,470),(3,82,'Chicken McNuggets (20 piece)',NULL,'11.4 oz (323 g)',23.5,940),(3,83,'Chicken McNuggets (40 piece)',NULL,'22.8 oz (646 g)',47.3,1880),(3,84,'Filet-O-Fish',NULL,'5 oz (142 g)',13.2,390),(4,85,'Premium Bacon Ranch Salad (without Chicken)',NULL,'7.9 oz (223 g)',27.5,140),(4,86,'Premium Bacon Ranch Salad with Crispy Chicken',NULL,'9 oz (255 g)',25.5,380),(4,87,'Premium Bacon Ranch Salad with Grilled Chicken',NULL,'8.5 oz (241 g)',24.8,220),(4,88,'Premium Southwest Salad (without Chicken)',NULL,'8.1 oz (230 g)',28.4,140),(4,89,'Premium Southwest Salad with Crispy Chicken',NULL,'12.3 oz (348 g)',39.1,450),(4,90,'Premium Southwest Salad with Grilled Chicken',NULL,'11.8 oz (335 g)',36.7,290),(5,91,'Chipotle BBQ Snack Wrap (Crispy Chicken)',NULL,'4.6 oz (130 g)',13.5,340),(5,92,'Chipotle BBQ Snack Wrap (Grilled Chicken)',NULL,'4.3 oz (123 g)',12.5,260),(5,93,'Honey Mustard Snack Wrap (Crispy Chicken)',NULL,'4.3 oz (123 g)',12,330),(5,94,'Honey Mustard Snack Wrap (Grilled Chicken)',NULL,'4.1 oz (116 g)',11.1,250),(5,95,'Ranch Snack Wrap (Crispy Chicken)',NULL,'4.5 oz (128 g)',12.3,360),(5,96,'Ranch Snack Wrap (Grilled Chicken)',NULL,'4.3 oz (121 g)',11.1,280),(5,97,'Small French Fries',NULL,'2.6 oz (75 g)',9.3,230),(5,98,'Medium French Fries',NULL,'3.9 oz (111 g)',14,340),(5,99,'Large French Fries',NULL,'5.9 oz (168 g)',21.4,510),(5,100,'Kids French Fries',NULL,'1.3 oz (38 g)',4.7,110),(5,101,'Side Salad',NULL,'3.1 oz (87 g)',9.1,20),(5,102,'Apple Slices',NULL,'1.2 oz (34 g)',17,15),(5,103,'Fruit \'n Yogurt Parfait',NULL,'5.2 oz (149 g)',10.5,150),(6,104,'Baked Apple Pie',NULL,'2.7 oz (77 g)',12.1,250),(6,105,'Chocolate Chip Cookie',NULL,'1 cookie (33 g)',6.5,160),(6,106,'Oatmeal Raisin Cookie',NULL,'1 cookie (33 g)',6.4,150),(6,107,'Kids Ice Cream Cone',NULL,'1 oz (29 g)',2.3,45),(6,108,'Hot Fudge Sundae',NULL,'6.3 oz (179 g)',17.9,330),(6,109,'Hot Caramel Sundae',NULL,'6.4 oz (182 g)',17.1,340),(6,110,'Strawberry Sundae',NULL,'6.3 oz (178 g)',15.2,280),(7,111,'Coca-Cola Classic (Small)',NULL,'16 fl oz cup',9.1,140),(7,112,'Coca-Cola Classic (Medium)',NULL,'21 fl oz cup',12.8,200),(7,113,'Coca-Cola Classic (Large)',NULL,'30 fl oz cup',17.7,280),(7,114,'Coca-Cola Classic (Child)',NULL,'12 fl oz cup',6.5,100),(7,115,'Diet Coke (Small)',NULL,'16 fl oz cup',0,0),(7,116,'Diet Coke (Medium)',NULL,'21 fl oz cup',0.1,0),(7,117,'Diet Coke (Large)',NULL,'30 fl oz cup',0.1,0),(7,118,'Diet Coke (Child)',NULL,'12 fl oz cup',0.1,0),(7,119,'Dr Pepper (Small)',NULL,'16 fl oz cup',8.6,140),(7,120,'Dr Pepper (Medium)',NULL,'21 fl oz cup',12.5,190),(7,121,'Dr Pepper (Large)',NULL,'30 fl oz cup',17,270),(7,122,'Dr Pepper (Child)',NULL,'12 fl oz cup',6.3,100),(7,123,'Diet Dr Pepper (Small)',NULL,'16 fl oz cup',0.5,0),(7,124,'Diet Dr Pepper (Medium)',NULL,'21 fl oz cup',0.7,0),(7,125,'Diet Dr Pepper (Large)',NULL,'30 fl oz cup',1,0),(7,126,'Diet Dr Pepper (Child)',NULL,'12 fl oz cup',0.3,0),(7,127,'Sprite (Small)',NULL,'16 fl oz cup',8.7,140),(7,128,'Sprite (Medium)',NULL,'21 fl oz cup',12.8,200),(7,129,'Sprite (Large)',NULL,'30 fl oz cup',17.6,280),(7,130,'Sprite (Child)',NULL,'12 fl oz cup',6.4,100),(7,131,'1% Low Fat Milk Jug',NULL,'1 carton (236 ml)',8.5,100),(7,132,'Fat Free Chocolate Milk Jug',NULL,'1 carton (236 ml)',11.9,130),(7,133,'Minute Maid 100% Apple Juice Box',NULL,'6 fl oz (177 ml)',15.8,80),(7,134,'Minute Maid Orange Juice (Small)',NULL,'12 fl oz cup',20.9,150),(7,135,'Minute Maid Orange Juice (Medium)',NULL,'16 fl oz cup',26.5,190),(7,136,'Minute Maid Orange Juice (Large)',NULL,'22 fl oz cup',39.3,280),(7,137,'Dasani Water Bottle',NULL,'16.9 fl oz',0,0),(8,138,'Iced Tea (Small)',NULL,'16 fl oz cup',0,0),(8,139,'Iced Tea (Medium)',NULL,'21 fl oz cup',0,0),(8,140,'Iced Tea (Large)',NULL,'30 fl oz cup',0.1,0),(8,141,'Iced Tea (Child)',NULL,'12 fl oz cup',0,0),(8,142,'Sweet Tea (Small)',NULL,'16 fl oz cup',8.5,150),(8,143,'Sweet Tea (Medium)',NULL,'21 fl oz cup',10.6,180),(8,144,'Sweet Tea (Large)',NULL,'30 fl oz cup',12.8,220),(8,145,'Sweet Tea (Child)',NULL,'12 fl oz cup',6.3,110),(8,146,'Coffee (Small)',NULL,'12 fl oz cup',0,0),(8,147,'Coffee (Medium)',NULL,'16 fl oz cup',0,0),(8,148,'Coffee (Large)',NULL,'16 fl oz cup',0,0),(8,149,'Latte (Small)',NULL,'12 fl oz cup',8.8,170),(8,150,'Latte (Medium)',NULL,'16 fl oz cup',10.6,210),(8,151,'Latte (Large)',NULL,'20 fl oz cup',14.9,280),(8,152,'Caramel Latte (Small)',NULL,'12 fl oz cup',14.7,270),(8,153,'Caramel Latte (Medium)',NULL,'16 fl oz cup',18.2,340),(8,154,'Caramel Latte (Large)',NULL,'20 fl oz cup',23.9,430),(8,155,'Hazelnut Latte (Small)',NULL,'12 fl oz cup',14.7,270),(8,156,'Hazelnut Latte (Medium)',NULL,'16 fl oz cup',18.1,330),(8,157,'Hazelnut Latte (Large)',NULL,'20 fl oz cup',23.8,430),(8,158,'French Vanilla Latte (Small)',NULL,'12 fl oz cup',14.3,260),(8,159,'French Vanilla Latte (Medium)',NULL,'16 fl oz cup',17.8,330),(8,160,'French Vanilla Latte (Large)',NULL,'20 fl oz cup',23.3,420),(8,161,'Latte with Sugar Free French Vanilla Syrup (Small)',NULL,'12 fl oz cup',10.2,210),(8,162,'Latte with Sugar Free French Vanilla Syrup (Medium)',NULL,'16 fl oz cup',12.5,260),(8,163,'Latte with Sugar Free French Vanilla Syrup (Large)',NULL,'20 fl oz cup',17,330),(8,164,'Nonfat Latte (Small)',NULL,'12 fl oz cup',9.2,100),(8,165,'Nonfat Latte (Medium)',NULL,'16 fl oz cup',11.9,130),(8,166,'Nonfat Latte (Large)',NULL,'20 fl oz cup',15.1,170),(8,167,'Nonfat Caramel Latte (Small)',NULL,'12 fl oz cup',15.3,200),(8,168,'Nonfat Caramel Latte (Medium)',NULL,'16 fl oz cup',19.4,250),(8,169,'Nonfat Caramel Latte (Large)',NULL,'20 fl oz cup',24,310),(8,170,'Nonfat Hazelnut Latte (Small)',NULL,'12 fl oz cup',15,200),(8,171,'Nonfat Hazelnut Latte (Medium)',NULL,'16 fl oz cup',19.4,250),(8,172,'Nonfat Hazelnut Latte (Large)',NULL,'20 fl oz cup',24,310),(8,173,'Nonfat French Vanilla Latte (Small)',NULL,'12 fl oz cup',14.8,190),(8,174,'Nonfat French Vanilla Latte (Medium)',NULL,'16 fl oz cup',19.1,240),(8,175,'Nonfat French Vanilla Latte (Large)',NULL,'20 fl oz cup',23.4,300),(8,176,'Nonfat Latte with Sugar Free French Vanilla Syrup (Small)',NULL,'12 fl oz cup',10.6,140),(8,177,'Nonfat Latte with Sugar Free French Vanilla Syrup (Medium)',NULL,'16 fl oz cup',13.7,170),(8,178,'Nonfat Latte with Sugar Free French Vanilla Syrup (Large)',NULL,'20 fl oz cup',17.4,220),(8,179,'Mocha (Small)',NULL,'12 fl oz cup',17.7,340),(8,180,'Mocha (Medium)',NULL,'16 fl oz cup',22,410),(8,181,'Mocha (Large)',NULL,'20 fl oz cup',27,500),(8,182,'Mocha with Nonfat Milk (Small)',NULL,'12 fl oz cup',18.4,270),(8,183,'Mocha with Nonfat Milk (Medium)',NULL,'16 fl oz cup',22.5,330),(8,184,'Mocha with Nonfat Milk (Large)',NULL,'20 fl oz cup',27.8,390),(8,185,'Caramel Mocha (Small)',NULL,'12 fl oz cup',16.3,320),(8,186,'Caramel Mocha (Medium)',NULL,'16 fl oz cup',20.6,390),(8,187,'Caramel Mocha (Large)',NULL,'20 fl oz cup',25,480),(8,188,'Nonfat Caramel Mocha (Small)',NULL,'12 fl oz cup',16.9,250),(8,189,'Nonfat Caramel Mocha (Medium)',NULL,'16 fl oz cup',21,310),(8,190,'Nonfat Caramel Mocha (Large)',NULL,'20 fl oz cup',25.8,370),(8,191,'Hot Chocolate (Small)',NULL,'12 fl oz cup',19.1,360),(8,192,'Hot Chocolate (Medium)',NULL,'16 fl oz cup',23.1,440),(8,193,'Hot Chocolate (Large)',NULL,'20 fl oz cup',28.8,540),(8,194,'Hot Chocolate with Nonfat Milk (Small)',NULL,'12 fl oz cup',19.7,280),(8,195,'Hot Chocolate with Nonfat Milk (Medium)',NULL,'16 fl oz cup',24.2,340),(8,196,'Hot Chocolate with Nonfat Milk (Large)',NULL,'20 fl oz cup',29.8,400),(8,197,'Regular Iced Coffee (Small)',NULL,'16 fl oz cup',6.3,140),(8,198,'Regular Iced Coffee (Medium)',NULL,'22 fl oz cup',8.2,190),(8,199,'Regular Iced Coffee (Large)',NULL,'32 fl oz cup',12.7,270),(8,200,'Caramel Iced Coffee (Small)',NULL,'16 fl oz cup',6.1,130),(8,201,'Caramel Iced Coffee (Medium)',NULL,'22 fl oz cup',7.8,180),(8,202,'Caramel Iced Coffee (Large)',NULL,'32 fl oz cup',11.6,260),(8,203,'Hazelnut Iced Coffee (Small)',NULL,'16 fl oz cup',5.8,130),(8,204,'Hazelnut Iced Coffee (Medium)',NULL,'22 fl oz cup',7.8,180),(8,205,'Hazelnut Iced Coffee (Large)',NULL,'32 fl oz cup',11.7,250),(8,206,'French Vanilla Iced Coffee (Small)',NULL,'16 fl oz cup',5.7,120),(8,207,'French Vanilla Iced Coffee (Medium)',NULL,'22 fl oz cup',7.3,170),(8,208,'French Vanilla Iced Coffee (Large)',NULL,'32 fl oz cup',11.3,240),(8,209,'Iced Coffee with Sugar Free French Vanilla Syrup (Small)',NULL,'16 fl oz cup',2.5,80),(8,210,'Iced Coffee with Sugar Free French Vanilla Syrup (Medium)',NULL,'22 fl oz cup',3.1,120),(8,211,'Iced Coffee with Sugar Free French Vanilla Syrup (Large)',NULL,'32 fl oz cup',4.8,160),(8,212,'Iced Mocha (Small)',NULL,'12 fl oz cup',14.6,290),(8,213,'Iced Mocha (Medium)',NULL,'16 fl oz cup',17.7,350),(8,214,'Iced Mocha (Large)',NULL,'22 fl oz cup',25.1,480),(8,215,'Iced Mocha with Nonfat Milk (Small)',NULL,'12 fl oz cup',14.7,240),(8,216,'Iced Mocha with Nonfat Milk (Medium)',NULL,'16 fl oz cup',18.3,290),(8,217,'Iced Mocha with Nonfat Milk (Large)',NULL,'22 fl oz cup',26.3,390),(8,218,'Iced Caramel Mocha (Small)',NULL,'12 fl oz cup',13.5,280),(8,219,'Iced Caramel Mocha (Medium)',NULL,'16 fl oz cup',16.3,340),(8,220,'Iced Caramel Mocha (Large)',NULL,'22 fl oz cup',23.2,460),(8,221,'Iced Nonfat Caramel Mocha (Small)',NULL,'12 fl oz cup',13.5,230),(8,222,'Iced Nonfat Caramel Mocha (Medium)',NULL,'16 fl oz cup',17.1,270),(8,223,'Iced Nonfat Caramel Mocha (Large)',NULL,'22 fl oz cup',24.3,370),(8,224,'Frappé Mocha (Small)',NULL,'12 fl oz cup',19.9,450),(8,225,'Frappé Mocha (Medium)',NULL,'16 fl oz cup',24.3,550),(8,226,'Frappé Mocha (Large)',NULL,'22 fl oz cup',30.2,670),(8,227,'Frappé Caramel (Small)',NULL,'12 fl oz cup',19.6,450),(8,228,'Frappé Caramel (Medium)',NULL,'16 fl oz cup',24.4,550),(8,229,'Frappé Caramel (Large)',NULL,'22 fl oz cup',29.2,670),(8,230,'Frappé Chocolate Chip (Small)',NULL,'12 fl oz cup',23.2,530),(8,231,'Frappé Chocolate Chip (Medium)',NULL,'16 fl oz cup',27.3,630),(8,232,'Frappé Chocolate Chip (Large)',NULL,'22 fl oz cup',33.4,760),(9,233,'Blueberry Pomegranate Smoothie (Small)',NULL,'12 fl oz cup',14,220),(9,234,'Blueberry Pomegranate Smoothie (Medium)',NULL,'16 fl oz cup',17.5,260),(9,235,'Blueberry Pomegranate Smoothie (Large)',NULL,'22 fl oz cup',22.2,340),(9,236,'Strawberry Banana Smoothie (Small)',NULL,'12 fl oz cup',16.5,210),(9,237,'Strawberry Banana Smoothie (Medium)',NULL,'16 fl oz cup',20,250),(9,238,'Strawberry Banana Smoothie (Large)',NULL,'22 fl oz cup',25.6,330),(9,239,'Mango Pineapple Smoothie (Small)',NULL,'12 fl oz cup',18.2,210),(9,240,'Mango Pineapple Smoothie (Medium)',NULL,'16 fl oz cup',22.3,260),(9,241,'Mango Pineapple Smoothie (Large)',NULL,'22 fl oz cup',28.3,340),(9,242,'Vanilla Shake (Small)',NULL,'12 fl oz cup',25.6,530),(9,243,'Vanilla Shake (Medium)',NULL,'16 fl oz cup',32.4,660),(9,244,'Vanilla Shake (Large)',NULL,'22 fl oz cup',40,820),(9,245,'Strawberry Shake (Small)',NULL,'12 fl oz cup',27.8,550),(9,246,'Strawberry Shake (Medium)',NULL,'16 fl oz cup',35.1,690),(9,247,'Strawberry Shake (Large)',NULL,'22 fl oz cup',43.9,850),(9,248,'Chocolate Shake (Small)',NULL,'12 fl oz cup',29.4,560),(9,249,'Chocolate Shake (Medium)',NULL,'16 fl oz cup',37,700),(9,250,'Chocolate Shake (Large)',NULL,'22 fl oz cup',45.8,850),(9,251,'Shamrock Shake (Medium)',NULL,'16 fl oz cup',33.6,660),(9,252,'Shamrock Shake (Large)',NULL,'22 fl oz cup',41.4,820),(9,253,'McFlurry with M&M\'s™ Candies (Small)',NULL,'10.9 oz (310 g)',31.2,650),(9,254,'McFlurry with M&M\'s™ Candies (Medium)',NULL,'16.2 oz (460 g)',45.8,930),(9,255,'McFlurry with M&M\'s™ Candies (Snack)',NULL,'7.3 oz (207 g)',20.7,430),(9,256,'McFlurry with Oreo Cookies (Small)',NULL,'10.1 oz (285 g)',26.3,510),(9,257,'McFlurry with Oreo Cookies (Medium)',NULL,'13.4 oz (381 g)',34.3,690),(9,258,'McFlurry with Oreo Cookies (Snack)',NULL,'6.7 oz (190 g)',17.4,340),(9,259,'McFlurry with Reese\'s Peanut Butter Cups (Medium)',NULL,'14.2 oz (403 g)',39,810),(9,260,'McFlurry with Reese\'s Peanut Butter Cups (Snack)',NULL,'7.1 oz (202 g)',19.5,410);
/*!40000 ALTER TABLE `products2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-24 11:56:14
