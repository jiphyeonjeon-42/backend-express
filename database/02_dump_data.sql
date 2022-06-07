
--
-- Dumping data for table `lending`
--

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*미인증 유저 예시 데이터*/
INSERT INTO `user` (email, password) VALUES ("example_role0_1@gmail.com","1234"),("example_role0_2@gmail.com","1234"),("example_role0_3@gmail.com","1234"),("example_role0_4@gmail.com","1234"),("example_role0_5@gmail.com","1234"),("example_role0_6@gmail.com","1234"),("example_role0_7@gmail.com","1234"),("example_role0_8@gmail.com","1234"),("example_role0_9@gmail.com","1234"),("example_role0_10@gmail.com","1234"),("example_role0_11@gmail.com","1234"),("example_role0_12@gmail.com","1234"),("example_role0_13@gmail.com","1234"),("examp1e_role0_14@gmail.com","1234"),("example_role0_15@gmail.com","1234"),("example_role0_16@gmail.com","1234");
/*인증유저 예시 데이터*/
INSERT INTO `user` (email, password, nickname, intraId, role) VALUES ("example_role1_1@gmail.com","1234", "seongyle1", 1, 1),("example_role1_2@gmail.com","1234", "seongyle2", 2, 1),("example_role_1_3@gmail.com","1234", "seongyle3", 3, 1),("example_role1_4@gmail.com","1234", "seongyle4", 4, 1),("example_role_1_5@gmail.com","1234", "seongyle5", 5, 1),("example_role1_6@gmail.com","1234", "seongyle6", 6, 1),("example_role1_7@gmail.com","1234", "seongyle7", 7, 1),("example_role1_8@gmail.com","1234", "seongyle8", 8, 1),("example_role1_9@gmail.com","1234", "seongyle9", 9, 1),("example_role1_10@gmail.com","1234", "seongyle10", 10, 1),("example_role1_11@gmail.com","1234", "seongyle11", 11, 1),("example_role1_12@gmail.com","1234", "seongyle12", 12, 1),("example_role1_13@gmail.com","1234", "seongyle13", 13, 1);
/*기타 운영진 예시 데이터*/
INSERT INTO `user` (email, password, nickname, role) VALUES ("example_role2_1@gmail.com","1234", "vocal1", 2),("example_role2_2@gmail.com","1234", "vocal2", 2),("example_role2_3@gmail.com","1234", "vocal3", 2),("example_role2_4@gmail.com","1234", "vocal4", 2),("example_role2_5@gmail.com","1234", "vocal5", 2),("example_role2_6@gmail.com","1234", "vocal6", 2),("example_role2_7@gmail.com","1234", "vocal7", 2),("example_role2_8@gmail.com","1234", "vocal8", 2),("example_role2_9@gmail.com","1234", "vocal9", 2),("example_role2_10@gmail.com","1234", "vocal10", 2),("example_role2_11@gmail.com","1234", "vocal11", 2),("example_role2_12@gmail.com","1234", "vocal12", 2),("example_role2_13@gmail.com","1234", "vocal13", 2);
/*사서유저 예시 데이터*/
INSERT INTO `user` (email, password, nickname, intraId, role) VALUES ("example_role3_1@gmail.com","1234", "seongyle_librian1", 14, 3),("example_role3_2@gmail.com","1234", "seongyle_librian2", 15, 3),("example_role3_3@gmail.com","1234", "seongyle_librian3", 16, 3),("example_role3_4@gmail.com","1234", "seongyle_librian4", 17, 3),("example_role3_5@gmail.com","1234", "seongyle_librian5", 18, 3),("example_role3_6@gmail.com","1234", "seongyle_librian6", 19, 3),("example_role3_7@gmail.com","1234", "seongyle_librian7", 20, 3),("example_role3_8@gmail.com","1234", "seongyle_librian8", 21, 3),("example_role3_9@gmail.com","1234", "seongyle_librian9", 22, 3),("example_role3_10@gmail.com","1234", "seongyle_librian10", 23, 3),("example_role3_11@gmail.com","1234", "seongyle_librian11", 24, 3),("example_role3_12@gmail.com","1234", "seongyle_librian12", 25, 3),("example_role3_13@gmail.com","1234", "seongyle_librian13", 26, 3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `lending` WRITE;
/*!40000 ALTER TABLE `lending` DISABLE KEYS */;
/*대출 (반납X) 예시 데이터 */
INSERT INTO `lending` (lendingLibrarianId, userId, bookId) VALUES (1435, 1408, 1), (1435, 1408, 2), (1435, 1409, 3), (1435, 1408, 4), (1435, 1409, 5), (1435, 1409, 6), (1435, 1410, 7), (1436, 1411, 8), (1439, 1411, 9), (1446, 1434, 10);
/*대출 (반납O) 예시 데이터 */
INSERT INTO `lending` (lendingLibrarianId, userId, bookId, returningLibrarianId, returnedAt) VALUES (1436, 1435, 1, 1436, "2022-05-18 18:30:52.363687"), (1436, 1408, 2, 1446, "2022-05-18 19:30:51.363687"), (1440, 1410, 1, 1436, "2022-05-18 20:30:52.363687"), (1446, 1446, 12, 1436, "2022-05-20 20:30:52.363687"), (1436, 1410, 22, 1436, "2022-05-20 20:31:52.363687"), (1442, 1409, 3, 1436, "2022-05-20 20:42:52.363687");
/*!40000 ALTER TABLE `lending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (2,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1434,NULL,1),(3,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1408,NULL,2),(4,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1444,NULL,12),(5,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1434,NULL,4),(6,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1435,NULL,9),(7,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1435,NULL,6),(8,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1410,NULL,7),(9,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1411,NULL,9),(10,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1412,NULL,43),(11,NULL,'2022-05-18 18:20:28.073181','2022-05-18 18:20:28.073181',0,1408,NULL,44),(12,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.606254',0,1434,NULL,1),(13,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.608018',0,1408,NULL,2),(14,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.609077',0,1444,NULL,2),(15,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.609996',0,1434,NULL,4),(16,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.610846',0,1435,NULL,9),(17,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.611701',0,1435,NULL,6),(18,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.612644',0,1410,NULL,7),(19,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.613582',0,1411,NULL,9),(20,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.614508',0,1412,NULL,43),(21,NULL,'2022-05-18 18:20:28.079697','2022-05-30 08:12:46.615448',0,1408,NULL,44),(22,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.508618',1,1433,1,1),(23,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.511404',1,1407,1,2),(24,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.512632',1,1443,1,2),(25,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.513794',1,1433,8,4),(26,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.514958',1,1434,15,9),(27,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.516176',1,1434,10,6),(28,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.517273',1,1409,11,7),(29,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.518178',1,1410,15,9),(30,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.519016',1,1411,82,43),(31,'2022-05-20 18:20:28','2022-05-18 18:20:28.085812','2022-05-18 18:27:40.519866',1,1409,83,44),(32,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.520884',2,1443,1,1),(33,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.521666',2,1419,1,2),(34,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.522417',2,1441,1,2),(35,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.523168',2,1429,8,4),(36,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.523908',2,1430,15,9),(37,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.524656',2,1433,10,6),(38,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.525890',2,1411,11,7),(39,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.526953',2,1412,15,9),(40,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.528111',2,1413,82,43),(41,'2022-05-20 18:20:28','2022-05-18 18:20:28.091788','2022-05-18 18:27:40.529187',2,1414,83,44),(42,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.530098',3,1422,1,1),(43,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.530976',3,1419,1,2),(44,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.531754',3,1420,1,2),(45,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.532678',3,1422,8,4),(46,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.533828',3,1423,15,9),(47,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.534997',3,1424,10,6),(48,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.538100',3,1425,11,7),(49,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.536088',3,1426,15,9),(50,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.537109',3,1427,82,43),(51,'2022-05-20 18:20:28','2022-05-18 18:20:28.096845','2022-05-18 18:27:40.539255',3,1428,83,44);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2022-02-03 11:46:54