/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.27-MariaDB : Database - hrms
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `advance` */

DROP TABLE IF EXISTS `advance`;

CREATE TABLE `advance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `recall_head` tinyint(2) DEFAULT NULL,
  `head_approval` tinyint(2) DEFAULT NULL,
  `status` enum('Approved','Rejected','Pending') DEFAULT NULL,
  `file_id` int(11) DEFAULT NULL,
  `payment_status` enum('Paid','Unpaid') DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `file_id` (`file_id`),
  KEY `approval_id` (`status_id`),
  CONSTRAINT `advance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `advance_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `advance_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `advance` */

insert  into `advance`(`id`,`employee_id`,`amount`,`recall_head`,`head_approval`,`status`,`file_id`,`payment_status`,`status_id`,`status_date`,`date`,`rejection_reason`) values 
(1,1,1200,1,1,'Rejected',NULL,NULL,1,'2023-04-21 16:25:54','2023-04-13 06:35:57','Any'),
(2,1,5000,1,1,NULL,49,NULL,NULL,NULL,'2023-04-13 06:36:17',NULL),
(3,1,5000,1,1,'Pending',54,'',NULL,NULL,'2023-04-13 06:36:23',NULL),
(4,1,1300,1,1,'Pending',252,'Unpaid',NULL,NULL,'2023-04-21 00:00:00',NULL),
(5,1,1300,1,1,'Pending',299,'Unpaid',NULL,NULL,'2023-04-21 00:00:00',NULL),
(6,1,1300,1,1,'Pending',300,'Unpaid',NULL,NULL,'2023-04-21 00:00:00',NULL),
(7,24,1400,1,1,'Approved',NULL,'Paid',1,'2023-04-29 11:57:48','2023-04-29 11:58:09',NULL),
(8,1,2000,1,1,'Pending',364,'Unpaid',NULL,NULL,'0000-00-00 00:00:00',NULL),
(9,1,200,1,1,'Pending',365,'Unpaid',NULL,NULL,'0000-00-00 00:00:00',NULL),
(10,1,200,1,1,'Pending',366,'Unpaid',NULL,NULL,'0000-00-00 00:00:00',NULL),
(11,1,200,1,1,'Pending',367,'Unpaid',NULL,NULL,'2023-05-19 00:00:00',NULL),
(12,1,120,1,1,'Pending',368,'Unpaid',NULL,NULL,'2023-05-19 00:00:00',NULL),
(13,1,200,1,0,'Pending',377,'Unpaid',NULL,NULL,'2023-05-24 00:00:00',NULL),
(14,20,1200,1,0,'Pending',378,'Unpaid',NULL,NULL,'2023-05-25 00:00:00',NULL);

/*Table structure for table `attendance` */

DROP TABLE IF EXISTS `attendance`;

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_in_datetime` datetime DEFAULT NULL,
  `status` enum('Absent','Present','On Leave','Pending') DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `approval_document_id` int(11) DEFAULT NULL,
  `status_by_id` int(11) DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `no_of_shifts` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `check_in_datetime_employee_id` (`employee_id`,`check_in_datetime`),
  KEY `approval_by_id` (`status_by_id`),
  KEY `approval_document_id` (`approval_document_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`status_by_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `attendance_ibfk_3` FOREIGN KEY (`approval_document_id`) REFERENCES `file_upload` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10863 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `attendance` */

insert  into `attendance`(`id`,`check_in_datetime`,`status`,`employee_id`,`approval_document_id`,`status_by_id`,`status_date`,`no_of_shifts`) values 
(10750,'2023-05-19 12:20:13','Present',1,371,1,'2023-05-22 12:20:22',1),
(10813,'2023-04-03 08:45:00','Present',1,NULL,NULL,NULL,NULL),
(10814,'2023-04-09 11:15:00','Absent',1,NULL,NULL,NULL,NULL),
(10815,'2023-04-17 10:30:00','Present',1,NULL,NULL,NULL,NULL),
(10816,'2023-04-05 09:00:00','Present',1,NULL,NULL,NULL,NULL),
(10817,'2023-04-23 00:00:00','Pending',1,NULL,NULL,NULL,NULL),
(10818,'2023-04-12 14:30:00','Absent',1,NULL,NULL,NULL,NULL),
(10819,'2023-04-29 08:15:00','Present',1,NULL,NULL,NULL,NULL),
(10820,'2023-04-07 11:45:00','Absent',1,NULL,NULL,NULL,NULL),
(10821,'2023-04-10 10:00:00','Present',1,NULL,NULL,NULL,NULL),
(10822,'2023-04-18 13:30:00','Absent',1,NULL,NULL,NULL,NULL),
(10823,'2023-04-26 09:30:00','Present',1,NULL,NULL,NULL,NULL),
(10824,'2023-04-02 08:15:00','Present',1,NULL,NULL,NULL,NULL),
(10825,'2023-04-16 12:00:00','Absent',1,NULL,NULL,NULL,NULL),
(10826,'2023-04-21 00:00:00','Pending',1,NULL,NULL,NULL,NULL),
(10827,'2023-04-27 14:00:00','Absent',1,NULL,NULL,NULL,NULL),
(10828,'2023-04-04 09:30:00','Present',1,NULL,NULL,NULL,NULL),
(10829,'2023-04-19 00:00:00','Pending',1,NULL,NULL,NULL,NULL),
(10830,'2023-04-14 13:45:00','Absent',1,NULL,NULL,NULL,NULL),
(10831,'2023-04-25 08:30:00','Present',1,NULL,NULL,NULL,NULL),
(10832,'2023-04-08 10:15:00','Present',1,NULL,NULL,NULL,NULL),
(10833,'2023-04-13 12:30:00','Absent',1,NULL,NULL,NULL,NULL),
(10834,'2023-04-30 09:00:00','Present',1,NULL,NULL,NULL,NULL),
(10835,'2023-04-06 11:45:00','Absent',1,NULL,NULL,NULL,NULL),
(10836,'2023-04-11 10:30:00','Present',1,NULL,NULL,NULL,NULL),
(10837,'2023-04-24 13:00:00','Absent',1,NULL,NULL,NULL,NULL),
(10838,'2023-04-01 08:30:00','Present',1,NULL,NULL,NULL,NULL),
(10839,'2023-04-22 00:00:00','Pending',1,NULL,NULL,NULL,NULL),
(10840,'2023-04-28 10:45:00','Present',1,NULL,NULL,NULL,NULL),
(10841,'2023-04-20 00:00:00','Pending',1,NULL,NULL,NULL,NULL),
(10842,'2023-04-15 14:30:00','Absent',1,NULL,NULL,NULL,NULL),
(10843,'2023-05-01 10:00:00','Present',1,371,1,'2023-05-24 12:19:10',1),
(10845,'2023-05-02 12:21:54','Absent',1,371,1,'2023-05-24 12:24:24',NULL),
(10858,'2023-05-03 00:00:00','On Leave',22,384,1,'2023-05-25 13:07:06',NULL),
(10859,'2023-05-04 00:00:00','On Leave',22,384,1,'2023-05-25 13:07:06',NULL),
(10860,'2023-05-05 00:00:00','Pending',5,385,NULL,NULL,NULL),
(10861,'2023-05-06 00:00:00','Pending',5,385,NULL,NULL,NULL),
(10862,'2023-05-07 00:00:00','Pending',5,385,NULL,NULL,NULL);

/*Table structure for table `attendance_copy` */

DROP TABLE IF EXISTS `attendance_copy`;

CREATE TABLE `attendance_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `check_in_datetime` datetime DEFAULT NULL,
  `status` enum('Absent','Present','On Leave','Pending') DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `approval_document_id` int(11) DEFAULT NULL,
  `status_by_id` int(11) DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `no_of_shifts` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `approval_document_id` (`approval_document_id`),
  KEY `approval_by_id` (`status_by_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5050 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `attendance_copy` */

insert  into `attendance_copy`(`id`,`check_in_datetime`,`status`,`employee_id`,`approval_document_id`,`status_by_id`,`status_date`,`no_of_shifts`) values 
(4952,'2023-04-01 11:38:31','Present',1,NULL,NULL,NULL,NULL),
(4953,'2023-04-02 11:39:40','Absent',1,NULL,NULL,NULL,NULL),
(4954,'2023-04-03 11:39:55','Absent',1,NULL,NULL,NULL,NULL),
(4955,'2023-04-05 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4957,'2023-04-06 11:40:09','Absent',1,NULL,NULL,NULL,NULL),
(4958,'2023-04-07 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4959,'2023-04-08 11:40:09','Absent',1,NULL,NULL,NULL,NULL),
(4960,'2023-04-09 11:40:09','Absent',1,NULL,NULL,NULL,NULL),
(4961,'2023-04-10 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4964,'2023-04-11 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4965,'2023-04-12 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4966,'2023-04-13 11:40:09','Absent',1,NULL,NULL,NULL,NULL),
(4967,'2023-04-14 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4968,'2023-04-15 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4969,'2023-04-16 11:40:09','Absent',1,NULL,NULL,NULL,NULL),
(4970,'2023-04-17 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4971,'2023-04-18 11:40:09','Present',1,NULL,NULL,NULL,NULL),
(4972,'2023-04-19 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4974,'2023-04-20 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4975,'2023-04-21 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4976,'2023-04-22 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4977,'2023-04-23 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4978,'2023-04-24 11:52:49','Present',1,NULL,NULL,NULL,NULL),
(4979,'2023-04-25 11:54:41','Absent',1,NULL,NULL,NULL,NULL),
(4985,'2023-04-26 11:57:44','On Leave',1,NULL,NULL,NULL,NULL),
(4986,'2023-04-27 11:58:03','On Leave',1,NULL,NULL,NULL,NULL),
(4987,'2023-04-28 11:58:29','On Leave',1,NULL,NULL,NULL,NULL),
(4988,'2023-04-29 11:58:43','On Leave',1,NULL,NULL,NULL,NULL),
(4989,'2023-04-30 11:59:20','On Leave',1,NULL,NULL,NULL,NULL),
(4990,'2023-04-11 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(4991,'2023-04-21 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(4992,'2023-04-29 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(4993,'2023-04-21 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(4994,'2023-04-25 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(4995,'2023-04-10 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(4996,'2023-04-24 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(4997,'2023-04-26 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(4998,'2023-04-22 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(4999,'2023-04-12 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5000,'2023-04-10 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5001,'2023-04-25 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5002,'2023-04-02 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5003,'2023-04-12 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5004,'2023-04-09 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5005,'2023-04-17 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5006,'2023-04-26 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5007,'2023-04-23 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5008,'2023-04-15 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5009,'2023-04-27 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5010,'2023-04-02 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5011,'2023-04-29 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5012,'2023-04-01 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5013,'2023-04-17 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5014,'2023-04-23 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5015,'2023-04-20 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5016,'2023-04-21 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5017,'2023-04-05 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5018,'2023-04-22 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5019,'2023-04-06 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5020,'2023-04-05 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5021,'2023-04-06 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5022,'2023-04-23 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5023,'2023-04-28 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5024,'2023-04-24 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5025,'2023-04-24 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5026,'2023-04-09 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5027,'2023-04-12 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5028,'2023-04-28 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5029,'2023-04-06 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5030,'2023-04-15 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5031,'2023-04-10 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5032,'2023-04-18 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5033,'2023-04-09 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5034,'2023-04-08 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5035,'2023-04-18 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5036,'2023-04-04 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5037,'2023-04-01 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5038,'2023-04-23 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5039,'2023-04-27 00:00:00','Absent',1,NULL,NULL,NULL,NULL),
(5040,'2023-04-11 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5041,'2023-04-14 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5042,'2023-04-08 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5043,'2023-04-18 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5044,'2023-04-05 00:00:00','Present',2,NULL,NULL,NULL,NULL),
(5045,'2023-04-23 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5046,'2023-04-13 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5047,'2023-04-02 00:00:00','Absent',2,NULL,NULL,NULL,NULL),
(5048,'2023-04-09 00:00:00','Present',1,NULL,NULL,NULL,NULL),
(5049,'2023-04-09 00:00:00','Present',1,NULL,NULL,NULL,NULL);

/*Table structure for table `attendance_requests` */

DROP TABLE IF EXISTS `attendance_requests`;

CREATE TABLE `attendance_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `attendance_id` int(11) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `type` enum('Out For Some Work','By Mistake') DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `attendance_id` (`attendance_id`),
  CONSTRAINT `attendance_requests_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `attendance_requests_ibfk_2` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `attendance_requests` */

insert  into `attendance_requests`(`id`,`employee_id`,`date_time`,`attendance_id`,`status`,`type`,`reason`) values 
(111,1,'2023-05-19 12:20:13',10750,'Approved','By Mistake',NULL),
(113,1,'2023-05-01 10:00:00',10843,'Approved','Out For Some Work',NULL),
(114,1,'2023-05-02 12:22:45',10845,'Rejected','Out For Some Work','For Project');

/*Table structure for table `attendance_requests_documents` */

DROP TABLE IF EXISTS `attendance_requests_documents`;

CREATE TABLE `attendance_requests_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `attendance_id` int(11) DEFAULT NULL,
  `document_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendance_id` (`attendance_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `attendance_requests_documents_ibfk_1` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`),
  CONSTRAINT `attendance_requests_documents_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `file_upload` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `attendance_requests_documents` */

/*Table structure for table `automated_grades` */

DROP TABLE IF EXISTS `automated_grades`;

CREATE TABLE `automated_grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT current_timestamp(),
  `WD_Grade` int(11) DEFAULT NULL,
  `COM_Grade` int(11) DEFAULT NULL,
  `Fine_Marks` int(11) DEFAULT NULL,
  `grade_1st_avg` int(11) DEFAULT NULL,
  `grade_2nd_avg` int(11) DEFAULT NULL,
  `grade_3rd_avg` int(11) DEFAULT NULL,
  `grade_4th_avg` int(11) DEFAULT NULL,
  `Total` int(11) DEFAULT NULL,
  `Grade_Equivalent` enum('A+','A','B','B+','C') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `automated_grades_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `automated_grades` */

insert  into `automated_grades`(`id`,`employee_id`,`date`,`WD_Grade`,`COM_Grade`,`Fine_Marks`,`grade_1st_avg`,`grade_2nd_avg`,`grade_3rd_avg`,`grade_4th_avg`,`Total`,`Grade_Equivalent`) values 
(1,1,'2023-04-30 12:46:54',10,10,0,4,5,7,9,65,'C'),
(3,1,'2023-05-23 15:48:41',NULL,NULL,NULL,4,5,6,10,NULL,NULL);

/*Table structure for table `bank_details` */

DROP TABLE IF EXISTS `bank_details`;

CREATE TABLE `bank_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `branch` varchar(45) DEFAULT NULL,
  `ifsc` varchar(45) DEFAULT NULL,
  `account_number` bigint(20) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bank_details` */

insert  into `bank_details`(`id`,`name`,`branch`,`ifsc`,`account_number`,`created_on`) values 
(1,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(2,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(3,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(4,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(5,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(6,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(7,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(8,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(9,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(10,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(11,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(12,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(13,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(14,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(15,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(16,'SBI','Patliputra','SBIN0001513',123456789,NULL),
(17,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 11:42:47'),
(18,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:24:45'),
(19,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:25:44'),
(20,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:26:12'),
(21,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:28:54'),
(22,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:29:46'),
(23,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:30:28'),
(24,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:30:48'),
(25,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:31:43'),
(26,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:47:13'),
(27,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:47:47'),
(28,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-21 15:48:26'),
(29,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-22 13:32:14'),
(30,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-22 13:32:55'),
(31,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-24 08:24:17'),
(32,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-24 13:16:58'),
(33,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-24 13:17:46'),
(34,'SBI','Patliputra','SBIN0001513',123456789,'2023-04-24 13:18:39');

/*Table structure for table `base_salaries` */

DROP TABLE IF EXISTS `base_salaries`;

CREATE TABLE `base_salaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `base_salaries_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `base_salaries` */

insert  into `base_salaries`(`id`,`amount`,`employee_id`) values 
(1,15052.800000000003,2),
(2,13000,30),
(3,7200,1),
(4,13000,31),
(5,13000,32),
(6,13000,33),
(7,13000,34),
(8,13000,3),
(9,15000,4),
(10,16000,5),
(11,15000,6),
(12,15000,7),
(13,15000,8),
(14,15000,9),
(15,15000,10),
(16,15000,11),
(17,15000,12),
(18,15000,13),
(19,15000,14),
(20,15000,15),
(21,15000,16),
(22,15000,17),
(23,15000,18),
(24,15000,19),
(25,15000,20),
(26,15000,21),
(27,15000,22),
(28,15000,23),
(29,15000,24),
(30,15000,25),
(31,15000,26),
(32,15000,27),
(33,15000,28),
(34,15000,29),
(35,15000,35),
(36,15000,36);

/*Table structure for table `bonus` */

DROP TABLE IF EXISTS `bonus`;

CREATE TABLE `bonus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `document_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `bonus_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `bonus_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `file_upload` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `bonus` */

insert  into `bonus`(`id`,`employee_id`,`amount`,`created_on`,`document_id`) values 
(1,1,1200,'2023-04-16 18:00:31',NULL),
(2,1,960,'2023-04-22 10:48:11',NULL),
(3,1,960,'2023-04-22 11:55:07',NULL),
(4,1,1200,'2023-04-22 16:47:34',NULL),
(5,1,1200,'2023-04-24 11:43:43',NULL),
(6,1,1200,'2023-05-22 10:07:41',NULL),
(7,1,1200,'2023-05-22 10:08:27',NULL),
(8,1,200,'2023-05-22 10:08:49',NULL),
(9,1,200,'2023-05-22 11:22:04',370);

/*Table structure for table `documents` */

DROP TABLE IF EXISTS `documents`;

CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `file_id` (`file_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `documents` */

insert  into `documents`(`id`,`file_id`,`employee_id`,`created_on`) values 
(1,199,18,NULL),
(2,212,23,NULL),
(3,213,23,NULL),
(4,285,26,'2023-04-21 15:30:48'),
(5,286,26,'2023-04-21 15:30:48'),
(6,288,27,'2023-04-21 15:31:43'),
(7,289,27,'2023-04-21 15:31:43'),
(8,291,28,'2023-04-21 15:47:13'),
(9,292,28,'2023-04-21 15:47:13'),
(10,294,29,'2023-04-21 15:47:47'),
(11,295,29,'2023-04-21 15:47:47'),
(12,297,30,'2023-04-21 15:48:26'),
(13,298,30,'2023-04-21 15:48:26'),
(14,310,31,'2023-04-22 13:32:55'),
(15,311,31,'2023-04-22 13:32:55'),
(16,314,32,'2023-04-24 08:24:17'),
(17,315,32,'2023-04-24 08:24:17'),
(18,325,33,'2023-04-24 13:17:46'),
(19,326,33,'2023-04-24 13:17:46'),
(20,328,34,'2023-04-24 13:18:39'),
(21,329,34,'2023-04-24 13:18:39'),
(22,130,24,'2023-04-29 11:00:06');

/*Table structure for table `employees` */

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` bigint(10) DEFAULT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  `emergency_number` bigint(10) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `father_name` varchar(45) DEFAULT NULL,
  `qualification` varchar(45) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `marital_status` varchar(45) DEFAULT NULL,
  `local_address` varchar(45) DEFAULT NULL,
  `permanent_address` varchar(45) DEFAULT NULL,
  `job_details_id` int(11) DEFAULT NULL,
  `photo_id` int(11) DEFAULT NULL,
  `bank_details_id` int(11) DEFAULT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `aadhar_no` bigint(12) DEFAULT NULL,
  `pan_no` varchar(255) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  `type` enum('Trial','Permanent') DEFAULT NULL,
  `uan_no` varchar(255) DEFAULT NULL,
  `fine_management` tinyint(2) DEFAULT NULL,
  `min_wages_as_per_rule` double DEFAULT NULL,
  `sub_type` enum('Cash','PF') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `job_details_id` (`job_details_id`),
  KEY `photo_id` (`photo_id`),
  KEY `bank_details_id` (`bank_details_id`),
  CONSTRAINT `employees_ibfk_5` FOREIGN KEY (`job_details_id`) REFERENCES `job_details` (`id`),
  CONSTRAINT `employees_ibfk_6` FOREIGN KEY (`photo_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `employees_ibfk_7` FOREIGN KEY (`bank_details_id`) REFERENCES `bank_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `employees` */

insert  into `employees`(`id`,`name`,`phone`,`email_address`,`emergency_number`,`dob`,`father_name`,`qualification`,`gender`,`marital_status`,`local_address`,`permanent_address`,`job_details_id`,`photo_id`,`bank_details_id`,`employee_id`,`aadhar_no`,`pan_no`,`created_on`,`type`,`uan_no`,`fine_management`,`min_wages_as_per_rule`,`sub_type`) values 
(1,'Ankita',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,'123',NULL,NULL,'2023-05-13 17:05:40','',NULL,NULL,16100,NULL),
(2,'Abhishek',NULL,NULL,NULL,NULL,NULL,NULL,'Male',NULL,NULL,NULL,2,NULL,NULL,'124',NULL,NULL,'2023-05-13 17:30:05','',NULL,NULL,20000,NULL),
(3,'Anjali',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,'125',NULL,NULL,NULL,'',NULL,NULL,16100,NULL),
(4,'Geeta',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,NULL,NULL,'126',NULL,NULL,NULL,'',NULL,NULL,16100,NULL),
(5,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','Male','Single','441, Nehru Nagar','441 Nehru Nagar',5,159,NULL,'127',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(6,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',6,162,NULL,'128',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(7,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',7,165,NULL,'129',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(8,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,168,NULL,'130',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(9,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,171,NULL,'131',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(10,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,174,NULL,'132',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(11,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',11,177,NULL,'133',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(12,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,180,NULL,'134',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(13,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,183,NULL,'135',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(14,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,186,NULL,'136',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(15,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',NULL,189,NULL,'137',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(16,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',14,192,9,'138',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(17,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',15,195,10,'139',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(18,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',16,198,11,'140',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(19,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',17,201,12,'141',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(20,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',18,203,13,'142',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(21,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',19,205,14,'143',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(22,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',20,208,15,'144',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(23,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',21,211,16,'145',629064651647,'A123',NULL,NULL,NULL,NULL,16100,NULL),
(24,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',27,282,22,'146',629064651647,'A123','2023-04-21 15:29:46','Permanent','AYD',1,16000,NULL),
(25,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',28,283,23,'147',629064651647,'A123','2023-04-21 15:30:28','Permanent','AYD',1,16000,NULL),
(26,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',29,284,24,'148',629064651647,'A123','2023-04-21 15:30:48','Permanent','AYD',1,16000,NULL),
(27,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',30,287,25,'149',629064651647,'A123','2023-04-21 15:31:43','Permanent','AYD',1,16000,NULL),
(28,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',31,290,26,'150',629064651647,'A123','2023-04-21 15:47:13',NULL,'AYD',1,16000,NULL),
(29,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',32,293,27,'151',629064651647,'A123','2023-04-21 15:47:47',NULL,'AYD',1,16000,NULL),
(30,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',33,296,28,'152',629064651647,'A123','2023-04-21 15:48:26',NULL,'AYD',1,16000,NULL),
(31,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',35,309,30,'153',629064651647,'A123','2023-04-22 13:32:55','','AYD',1,16000,NULL),
(32,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',36,313,31,'154',629064651647,'A123','2023-04-24 08:24:17','','AYD',1,16000,NULL),
(33,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',38,324,33,'155',629064651647,'A123','2023-04-24 13:17:46','','AYD',1,16000,''),
(34,'Amit',8210280739,'anki356@gmail.com',9934773240,'1990-06-17 00:00:00','S','M.Tech','','Single','441, Nehru Nagar','441 Nehru Nagar',39,327,34,'156',629064651647,'A123','2023-04-24 13:18:39','Trial','AYD',1,16000,NULL),
(35,'Anjali',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,40,NULL,NULL,'157',NULL,NULL,'2023-04-29 10:08:50',NULL,NULL,NULL,16100,NULL),
(36,'Amrendra',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'158',NULL,NULL,'2023-05-01 15:27:06',NULL,NULL,NULL,16100,NULL),
(38,'Aakash',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,43,NULL,NULL,NULL,NULL,NULL,'2023-05-19 10:31:14',NULL,NULL,NULL,NULL,NULL),
(39,'Amita',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,44,NULL,NULL,NULL,NULL,NULL,'2023-05-19 10:33:55',NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `expenses` */

DROP TABLE IF EXISTS `expenses`;

CREATE TABLE `expenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `status_by_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `category_id` (`category_id`),
  KEY `sub_category_id` (`sub_category_id`),
  KEY `approval_by_id` (`status_by_id`),
  CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `expenses_ibfk_4` FOREIGN KEY (`category_id`) REFERENCES `expenses_categories` (`id`),
  CONSTRAINT `expenses_ibfk_5` FOREIGN KEY (`sub_category_id`) REFERENCES `expenses_sub_categories` (`id`),
  CONSTRAINT `expenses_ibfk_7` FOREIGN KEY (`status_by_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `expenses` */

insert  into `expenses`(`id`,`category_id`,`sub_category_id`,`date`,`status`,`amount`,`employee_id`,`status_date`,`notes`,`status_by_id`) values 
(1,1,NULL,'2023-04-10 09:59:50','Rejected',1200,1,'2023-04-14 17:29:40',NULL,6),
(2,2,NULL,'2023-04-10 10:00:35','Rejected',600,1,NULL,NULL,NULL),
(3,3,1,'2023-04-10 10:01:19','Pending',2000,1,NULL,NULL,NULL),
(4,2,NULL,'2023-04-09 10:01:53','Pending',2000,1,NULL,NULL,NULL),
(5,1,NULL,'2023-04-10 00:00:00','Pending',2000,1,NULL,NULL,NULL),
(6,1,NULL,'2023-04-10 00:00:00','Pending',1200,1,NULL,NULL,NULL),
(7,1,NULL,'2023-04-10 00:00:00','Pending',1200,1,NULL,NULL,NULL),
(8,2,NULL,'2023-04-21 00:00:00','Approved',1500,2,'2023-04-21 11:22:42',NULL,6),
(9,1,NULL,'2023-04-21 11:10:05','Approved',1300,1,'2023-05-22 12:24:43',NULL,1),
(10,1,NULL,'2023-05-04 13:07:04','Pending',1500,1,NULL,NULL,NULL),
(11,1,NULL,'2023-05-06 13:50:17','Pending',2000,1,NULL,NULL,NULL),
(12,1,NULL,'2023-05-06 10:00:00','Pending',2000,1,NULL,'For Stationary',NULL),
(13,1,NULL,'2023-05-06 10:00:00','Pending',2000,1,NULL,'For Stationary',NULL),
(23,2,NULL,'2023-05-06 10:00:00','Pending',2000,1,NULL,'For Stationary',NULL),
(24,3,1,'2023-05-06 10:00:00','Pending',2000,1,NULL,'For accessories',NULL),
(25,1,NULL,'2023-05-09 11:25:52','Approved',2000,1,'2023-05-09 11:55:32',NULL,6),
(26,1,NULL,'2023-05-12 17:37:52','Approved',2000,1,'2023-05-12 18:46:15',NULL,1),
(27,1,NULL,'2023-05-13 10:23:22','Pending',2000,1,NULL,NULL,NULL),
(28,1,NULL,'2023-05-17 00:00:00','Pending',200,1,NULL,'For Some Out',NULL),
(29,3,1,'2023-05-17 00:00:00','Pending',200,5,NULL,'For Some Out',NULL),
(30,1,NULL,'2023-05-17 00:00:00','Pending',200,20,NULL,'',NULL),
(31,1,NULL,'2023-05-17 00:20:20','Pending',100,23,NULL,'',NULL),
(32,1,NULL,'2023-05-22 12:27:41','Rejected',200,1,'2023-05-22 12:28:08','',1);

/*Table structure for table `expenses_categories` */

DROP TABLE IF EXISTS `expenses_categories`;

CREATE TABLE `expenses_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `expenses_categories` */

insert  into `expenses_categories`(`id`,`name`) values 
(1,'Lunch'),
(2,'Conveyance'),
(3,'Others');

/*Table structure for table `expenses_sub_categories` */

DROP TABLE IF EXISTS `expenses_sub_categories`;

CREATE TABLE `expenses_sub_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `expenses_sub_categories_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `expenses_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `expenses_sub_categories` */

insert  into `expenses_sub_categories`(`id`,`category_id`,`name`) values 
(1,3,'Miscellaneous'),
(2,3,'Nap');

/*Table structure for table `file_upload` */

DROP TABLE IF EXISTS `file_upload`;

CREATE TABLE `file_upload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=386 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `file_upload` */

insert  into `file_upload`(`id`,`type`,`name`,`created_on`) values 
(1,'in_time_image','download-1681200860343.jfif','2023-04-11 17:27:20'),
(2,'in_time_image','download-1681200914021.jfif','2023-04-11 17:27:20'),
(3,'in_time_image','download-1681200954894.jfif','2023-04-11 17:27:20'),
(4,'in_time_image','download-1681200970134.jfif','2023-04-11 17:27:20'),
(5,'in_time_image','download-1681201034992.jfif','2023-04-11 17:27:20'),
(6,'in_time_image','download-1681201055208.jfif','2023-04-11 17:27:20'),
(7,'in_time_image','download-1681201096159.jfif','2023-04-11 17:27:20'),
(8,'in_time_image','download-1681201196108.jfif','2023-04-11 17:27:20'),
(9,'in_time_image','download-1681201242832.jfif','2023-04-11 17:27:20'),
(10,'in_time_image','download-1681207950670.jfif','2023-04-11 17:27:20'),
(11,'in_time_image','download-1681208027813.jfif','2023-04-11 17:27:20'),
(12,'in_time_image','download-1681208197461.jfif','2023-04-11 17:27:20'),
(13,'in_time_image','download-1681208256623.jfif','2023-04-11 17:27:20'),
(14,'in_time_image','download-1681208327040.jfif','2023-04-11 17:27:20'),
(15,'in_time_image','download-1681208500561.jfif','2023-04-11 17:27:20'),
(16,'in_time_image','download-1681208662875.jfif','2023-04-11 17:27:20'),
(17,'in_time_image','download-1681208696364.jfif','2023-04-11 17:27:20'),
(18,'in_time_image','download-1681208834646.jfif','2023-04-11 17:27:20'),
(19,'in_time_image','download-1681208971979.jfif','2023-04-11 17:27:20'),
(20,'in_time_image','download-1681209067861.jfif','2023-04-11 17:27:20'),
(21,'loan_document_image','download-1681265544631.jfif','2023-04-12 07:42:24'),
(22,'loan_document_image','download-1681265772313.jfif','2023-04-12 07:46:12'),
(23,'loan_document_image','download-1681265834263.jfif','2023-04-12 07:47:14'),
(24,'loan_document_image','download-1681265906550.jfif','2023-04-12 07:48:26'),
(25,'loan_document_image','download-1681275288919.jfif','2023-04-12 10:24:48'),
(26,'loan_document_image','download-1681275360410.jfif','2023-04-12 10:26:00'),
(27,'loan_document_image','download-1681275467659.jfif','2023-04-12 10:27:47'),
(28,'loan_document_image','download-1681275557931.jfif','2023-04-12 10:29:17'),
(29,'loan_document_image','download-1681275627181.jfif','2023-04-12 10:30:27'),
(30,'loan_document_image','download-1681282733527.jfif','2023-04-12 12:28:53'),
(31,'loan_document_image','download-1681282788806.jfif','2023-04-12 12:29:48'),
(32,'loan_document_image','download-1681282841387.jfif','2023-04-12 12:30:41'),
(33,'loan_document_image','download-1681282975915.jfif','2023-04-12 12:32:55'),
(34,'loan_document_image','download-1681283102622.jfif','2023-04-12 12:35:02'),
(35,'loan_document_image','download-1681283367080.jfif','2023-04-12 12:39:27'),
(36,'loan_document_image','download-1681283390143.jfif','2023-04-12 12:39:50'),
(37,'loan_document_image','download-1681283442541.jfif','2023-04-12 12:40:42'),
(38,'loan_document_image','download-1681283584526.jfif','2023-04-12 12:43:04'),
(39,'loan_document_image','download-1681283647523.jfif','2023-04-12 12:44:07'),
(40,'loan_document_image','download-1681283815426.jfif','2023-04-12 12:46:55'),
(41,'loan_document_image','download-1681283880700.jfif','2023-04-12 12:48:00'),
(42,'loan_document_image','download-1681284191472.jfif','2023-04-12 12:53:11'),
(43,'loan_document_image','download-1681284274354.jfif','2023-04-12 12:54:34'),
(44,'loan_document_image','download-1681284306965.jfif','2023-04-12 12:55:06'),
(45,'loan_document_image','download-1681284413927.jfif','2023-04-12 12:56:53'),
(46,'loan_document_image','download-1681284450690.jfif','2023-04-12 12:57:30'),
(47,'advance_document_image','download-1681287889832.jfif','2023-04-12 13:54:49'),
(48,'advance_document_image','download-1681287910891.jfif','2023-04-12 13:55:10'),
(49,'advance_document_image','download-1681287940616.jfif','2023-04-12 13:55:40'),
(50,'advance_document_image','download-1681291535693.jfif','2023-04-12 14:55:35'),
(51,'advance_document_image','download-1681291580323.jfif','2023-04-12 14:56:20'),
(52,'advance_document_image','download-1681291603144.jfif','2023-04-12 14:56:43'),
(53,'advance_document_image','download-1681291635320.jfif','2023-04-12 14:57:15'),
(54,'advance_document_image','download-1681291655407.jfif','2023-04-12 14:57:35'),
(55,'leave_document_image','download-1681361339763.jfif','2023-04-13 10:18:59'),
(56,'attendance_image','download-1681436248307.jfif','2023-04-14 07:07:28'),
(57,'attendance_image','download-1681436276642.jfif','2023-04-14 07:07:56'),
(58,'attendance_image','download-1681436313632.jfif','2023-04-14 07:08:33'),
(59,'attendance_image','download-1681436468690.jfif','2023-04-14 07:11:08'),
(60,'attendance_image','download-1681440632602.jpg','2023-04-14 08:20:32'),
(61,'attendance_image','download-1681440632603.jpg','2023-04-14 08:20:32'),
(62,'attendance_image','download-1681440743759.jpg','2023-04-14 08:22:23'),
(63,'attendance_image','download-1681440743759.jpg','2023-04-14 08:22:23'),
(64,'attendance_image','download-1681440850947.jpg','2023-04-14 08:24:10'),
(65,'attendance_image','download-1681440850948.jpg','2023-04-14 08:24:10'),
(66,'attendance_image','download-1681440917671.jpg','2023-04-14 08:25:17'),
(67,'attendance_image','download-1681440917672.jpg','2023-04-14 08:25:17'),
(68,'attendance_image','download-1681454923568.jfif','2023-04-14 12:18:43'),
(69,'leave_document_image','download-1681455324877.jfif','2023-04-14 12:25:24'),
(70,'attendance_image','download-1681461992053.jfif','2023-04-14 14:16:32'),
(71,'leave_document_image','download-1681523945623.jfif','2023-04-15 07:29:05'),
(72,'leave_document_image','download-1681524042148.jfif','2023-04-15 07:30:42'),
(73,'leave_document_image','download-1681525155697.jfif','2023-04-15 07:49:15'),
(74,'loan_document_image','download-1681526219985.jfif','2023-04-15 08:07:00'),
(75,'leave_document_image','download-1681535077971.jfif','2023-04-15 10:34:37'),
(76,'leave_document_image','download-1681535143545.jfif','2023-04-15 10:35:43'),
(77,'leave_document_image','download-1681535212652.jfif','2023-04-15 10:36:52'),
(78,'leave_document_image','download-1681535613185.jfif','2023-04-15 10:43:33'),
(79,'leave_document_image','download-1681535674850.jfif','2023-04-15 10:44:34'),
(80,'leave_document_image','download-1681535819569.jfif','2023-04-15 10:46:59'),
(81,'leave_document_image','download-1681535993959.jfif','2023-04-15 10:49:53'),
(82,'leave_document_image','download-1681536037988.jfif','2023-04-15 10:50:38'),
(83,'leave_document_image','download-1681536075802.jfif','2023-04-15 10:51:15'),
(84,'leave_document_image','download-1681536140664.jfif','2023-04-15 10:52:20'),
(85,'leave_document_image','download-1681536163140.jfif','2023-04-15 10:52:43'),
(86,'leave_document_image','download-1681536312056.jfif','2023-04-15 10:55:12'),
(87,'leave_document_image','download-1681536380949.jfif','2023-04-15 10:56:20'),
(88,'leave_document_image','download-1681536509993.jfif','2023-04-15 10:58:30'),
(89,'leave_document_image','download-1681536621331.jfif','2023-04-15 11:00:21'),
(90,'leave_document_image','download-1681536685874.jfif','2023-04-15 11:01:25'),
(91,'leave_document_image','download-1681537199286.jfif','2023-04-15 11:09:59'),
(92,'leave_document_image','download-1681537233161.jfif','2023-04-15 11:10:33'),
(93,'leave_document_image','download-1681537307092.jfif','2023-04-15 11:11:47'),
(94,'leave_document_image','download-1681537356007.jfif','2023-04-15 11:12:36'),
(95,'leave_document_image','download-1681537462733.jfif','2023-04-15 11:14:22'),
(96,'leave_document_image','download-1681537616284.jfif','2023-04-15 11:16:56'),
(97,'leave_document_image','download-1681537691285.jfif','2023-04-15 11:18:11'),
(98,'leave_document_image','download-1681537986926.jfif','2023-04-15 11:23:06'),
(99,'leave_document_image','download-1681538362177.jfif','2023-04-15 11:29:22'),
(100,'leave_document_image','download-1681538395957.jfif','2023-04-15 11:29:55'),
(101,'leave_document_image','download-1681538457203.jfif','2023-04-15 11:30:57'),
(102,'leave_document_image','download-1681538503136.jfif','2023-04-15 11:31:43'),
(103,'leave_document_image','download-1681538552342.jfif','2023-04-15 11:32:32'),
(104,'leave_document_image','download-1681538629168.jfif','2023-04-15 11:33:49'),
(105,'leave_document_image','download-1681538672284.jfif','2023-04-15 11:34:32'),
(106,'leave_document_image','download-1681538733436.jfif','2023-04-15 11:35:33'),
(107,'leave_document_image','download-1681538814047.jfif','2023-04-15 11:36:54'),
(108,'leave_document_image','download-1681538845506.jfif','2023-04-15 11:37:25'),
(109,'leave_document_image','download-1681538882562.jfif','2023-04-15 11:38:02'),
(110,'leave_document_image','download-1681538964395.jfif','2023-04-15 11:39:24'),
(111,'leave_document_image','download-1681538991949.jfif','2023-04-15 11:39:51'),
(112,'leave_document_image','download-1681539074728.jfif','2023-04-15 11:41:14'),
(113,'leave_document_image','download-1681539116381.jfif','2023-04-15 11:41:56'),
(114,'leave_document_image','download-1681539143317.jfif','2023-04-15 11:42:23'),
(115,'loan_document_image','download-1681541833211.jfif','2023-04-15 12:27:13'),
(116,'loan_document_image','download-1681541921311.jfif','2023-04-15 12:28:41'),
(117,'loan_document_image','download-1681542000231.jfif','2023-04-15 12:30:00'),
(118,'loan_document_image','download-1681542026573.jfif','2023-04-15 12:30:26'),
(119,'loan_document_image','download-1681542147031.jfif','2023-04-15 12:32:27'),
(120,'photo','photo-1681623660336.jpg','2023-04-16 11:11:00'),
(121,'photo','photo-1681623687458.jpg','2023-04-16 11:11:27'),
(122,'photo','photo-1681623736126.jpg','2023-04-16 11:12:16'),
(123,'photo','photo-1681623774447.jpg','2023-04-16 11:12:54'),
(124,'photo','photo-1681623828394.jpg','2023-04-16 11:13:48'),
(125,'photo','photo-1681623873651.jpg','2023-04-16 11:14:33'),
(126,'photo','photo-1681623953524.jpg','2023-04-16 11:15:53'),
(127,'photo','photo-1681624014216.jpg','2023-04-16 11:16:54'),
(128,'photo','photo-1681624086060.jpg','2023-04-16 11:18:06'),
(129,'photo','photo-1681624122183.jpg','2023-04-16 11:18:42'),
(130,'documents','document-1681624122182.jpg','2023-04-16 11:18:42'),
(131,'documents','document-1681624122183.jpg','2023-04-16 11:18:42'),
(132,'photo','photo-1681624160328.jpg','2023-04-16 11:19:20'),
(133,'documents','document-1681624160327.jpg','2023-04-16 11:19:20'),
(134,'documents','document-1681624160328.jpg','2023-04-16 11:19:20'),
(135,'photo','photo-1681624212859.jpg','2023-04-16 11:20:12'),
(136,'documents','document-1681624212859.jpg','2023-04-16 11:20:12'),
(137,'documents','document-1681624212859.jpg','2023-04-16 11:20:12'),
(138,'photo','photo-1681624255303.jpg','2023-04-16 11:20:55'),
(139,'documents','document-1681624255302.jpg','2023-04-16 11:20:55'),
(140,'documents','document-1681624255302.jpg','2023-04-16 11:20:55'),
(141,'photo','photo-1681624300751.jpg','2023-04-16 11:21:40'),
(142,'documents','document-1681624300750.jpg','2023-04-16 11:21:40'),
(143,'documents','document-1681624300751.jpg','2023-04-16 11:21:40'),
(144,'photo','photo-1681624326232.jpg','2023-04-16 11:22:06'),
(145,'documents','document-1681624326232.jpg','2023-04-16 11:22:06'),
(146,'documents','document-1681624326232.jpg','2023-04-16 11:22:06'),
(147,'photo','photo-1681624506117.jpg','2023-04-16 11:25:06'),
(148,'documents','document-1681624506115.jpg','2023-04-16 11:25:06'),
(149,'documents','document-1681624506116.jpg','2023-04-16 11:25:06'),
(150,'photo','photo-1681624608354.jpg','2023-04-16 11:26:48'),
(151,'documents','document-1681624608353.jpg','2023-04-16 11:26:48'),
(152,'documents','document-1681624608353.jpg','2023-04-16 11:26:48'),
(153,'photo','photo-1681624626653.jpg','2023-04-16 11:27:06'),
(154,'documents','document-1681624626652.jpg','2023-04-16 11:27:06'),
(155,'documents','document-1681624626652.jpg','2023-04-16 11:27:06'),
(156,'photo','photo-1681624688779.jpg','2023-04-16 11:28:08'),
(157,'documents','document-1681624688778.jpg','2023-04-16 11:28:08'),
(158,'documents','document-1681624688779.jpg','2023-04-16 11:28:08'),
(159,'photo','photo-1681624740276.jpg','2023-04-16 11:29:00'),
(160,'documents','document-1681624740276.jpg','2023-04-16 11:29:00'),
(161,'documents','document-1681624740276.jpg','2023-04-16 11:29:00'),
(162,'photo','photo-1681624797428.jpg','2023-04-16 11:29:57'),
(163,'documents','document-1681624797427.jpg','2023-04-16 11:29:57'),
(164,'documents','document-1681624797427.jpg','2023-04-16 11:29:57'),
(165,'photo','photo-1681624890834.jpg','2023-04-16 11:31:30'),
(166,'documents','document-1681624890833.jpg','2023-04-16 11:31:30'),
(167,'documents','document-1681624890834.jpg','2023-04-16 11:31:30'),
(168,'photo','photo-1681625035081.jpg','2023-04-16 11:33:55'),
(169,'documents','document-1681625035080.jpg','2023-04-16 11:33:55'),
(170,'documents','document-1681625035080.jpg','2023-04-16 11:33:55'),
(171,'photo','photo-1681625171002.jpg','2023-04-16 11:36:11'),
(172,'documents','document-1681625171001.jpg','2023-04-16 11:36:11'),
(173,'documents','document-1681625171001.jpg','2023-04-16 11:36:11'),
(174,'photo','photo-1681625308286.jpg','2023-04-16 11:38:28'),
(175,'documents','document-1681625308285.jpg','2023-04-16 11:38:28'),
(176,'documents','document-1681625308285.jpg','2023-04-16 11:38:28'),
(177,'photo','photo-1681625346470.jpg','2023-04-16 11:39:06'),
(178,'documents','document-1681625346469.jpg','2023-04-16 11:39:06'),
(179,'documents','document-1681625346470.jpg','2023-04-16 11:39:06'),
(180,'photo','photo-1681625421219.jpg','2023-04-16 11:40:21'),
(181,'documents','document-1681625421218.jpg','2023-04-16 11:40:21'),
(182,'documents','document-1681625421219.jpg','2023-04-16 11:40:21'),
(183,'photo','photo-1681625496256.jpg','2023-04-16 11:41:36'),
(184,'documents','document-1681625496255.jpg','2023-04-16 11:41:36'),
(185,'documents','document-1681625496256.jpg','2023-04-16 11:41:36'),
(186,'photo','photo-1681625551564.jpg','2023-04-16 11:42:31'),
(187,'documents','document-1681625551563.jpg','2023-04-16 11:42:31'),
(188,'documents','document-1681625551563.jpg','2023-04-16 11:42:31'),
(189,'photo','photo-1681625709018.jpg','2023-04-16 11:45:09'),
(190,'documents','document-1681625709017.jpg','2023-04-16 11:45:09'),
(191,'documents','document-1681625709018.jpg','2023-04-16 11:45:09'),
(192,'photo','photo-1681625997878.jpg','2023-04-16 11:49:57'),
(193,'documents','document-1681625997877.jpg','2023-04-16 11:49:57'),
(194,'documents','document-1681625997877.jpg','2023-04-16 11:49:57'),
(195,'photo','photo-1681626104509.jpg','2023-04-16 11:51:44'),
(196,'documents','document-1681626104508.jpg','2023-04-16 11:51:44'),
(197,'documents','document-1681626104509.jpg','2023-04-16 11:51:44'),
(198,'photo','photo-1681626297627.jpg','2023-04-16 11:54:57'),
(199,'documents','document-1681626297626.jpg','2023-04-16 11:54:57'),
(200,'documents','document-1681626297626.jpg','2023-04-16 11:54:57'),
(201,'photo','photo-1681626344716.jpg','2023-04-16 11:55:44'),
(202,'documents','document-1681626344714.jpg','2023-04-16 11:55:44'),
(203,'photo','photo-1681626357565.jpg','2023-04-16 11:55:57'),
(204,'documents','document-1681626357564.jpg','2023-04-16 11:55:57'),
(205,'photo','photo-1681626387979.jpg','2023-04-16 11:56:28'),
(206,'documents','document-1681626387978.jpg','2023-04-16 11:56:28'),
(207,'documents','document-1681626387979.jpg','2023-04-16 11:56:28'),
(208,'photo','photo-1681626420316.jpg','2023-04-16 11:57:00'),
(209,'documents','document-1681626420316.jpg','2023-04-16 11:57:00'),
(210,'documents','document-1681626420316.jpg','2023-04-16 11:57:00'),
(211,'photo','photo-1681626549803.jpg','2023-04-16 11:59:09'),
(212,'documents','document-1681626549803.jpg','2023-04-16 11:59:09'),
(213,'documents','document-1681626549803.jpg','2023-04-16 11:59:09'),
(214,'leave_document_image','download-1681896468431.jfif','2023-04-19 14:57:48'),
(215,'leave_document_image','download-1681896499214.jfif','2023-04-19 14:58:19'),
(216,'leave_document_image','download-1681896549678.jfif','2023-04-19 14:59:09'),
(217,'leave_document_image','download-1681896765915.jfif','2023-04-19 15:02:45'),
(218,'leave_document_image','download-1681896888550.jfif','2023-04-19 15:04:48'),
(219,'leave_document_image','download-1681897048347.jfif','2023-04-19 15:07:28'),
(220,'leave_document_image','download-1681897147597.jfif','2023-04-19 15:09:07'),
(221,'leave_document_image','download-1681897535040.jfif','2023-04-19 15:15:35'),
(222,'leave_document_image','download-1681897627631.jfif','2023-04-19 15:17:07'),
(223,'leave_document_image','download-1681897682061.jfif','2023-04-19 15:18:02'),
(224,'leave_document_image','download-1681897738002.jfif','2023-04-19 15:18:58'),
(225,'leave_document_image','download-1681897760703.jfif','2023-04-19 15:19:20'),
(226,'leave_document_image','download-1681897788203.jfif','2023-04-19 15:19:48'),
(227,'leave_document_image','download-1681897939396.jfif','2023-04-19 15:22:19'),
(228,'leave_document_image','download-1681897987271.jfif','2023-04-19 15:23:07'),
(229,'leave_document_image','download-1681898034927.jfif','2023-04-19 15:23:54'),
(230,'leave_document_image','download-1681898071268.jfif','2023-04-19 15:24:31'),
(231,'leave_document_image','download-1681898103480.jfif','2023-04-19 15:25:03'),
(232,'leave_document_image','download-1681898379385.jfif','2023-04-19 15:29:39'),
(233,'leave_document_image','download-1681898437204.jfif','2023-04-19 15:30:37'),
(234,'leave_document_image','download-1681898465546.jfif','2023-04-19 15:31:05'),
(235,'leave_document_image','download-1681898496510.jfif','2023-04-19 15:31:36'),
(236,'leave_document_image','download-1681898514383.jfif','2023-04-19 15:31:54'),
(237,'leave_document_image','download-1681898554464.jfif','2023-04-19 15:32:34'),
(238,'leave_document_image','download-1681898584675.jfif','2023-04-19 15:33:04'),
(239,'leave_document_image','download-1681898659922.jfif','2023-04-19 15:34:19'),
(240,'leave_document_image','download-1681898695197.jfif','2023-04-19 15:34:55'),
(241,'leave_document_image','download-1681898762245.jfif','2023-04-19 15:36:02'),
(242,'leave_document_image','download-1681898822502.jfif','2023-04-19 15:37:02'),
(243,'leave_document_image','download-1681898931707.jfif','2023-04-19 15:38:51'),
(244,'leave_document_image','download-1681899016715.jfif','2023-04-19 15:40:16'),
(245,'leave_document_image','download-1681899052267.jfif','2023-04-19 15:40:52'),
(246,'leave_document_image','download-1681899111777.jfif','2023-04-19 15:41:51'),
(247,'leave_document_image','download-1681899146962.jfif','2023-04-19 15:42:26'),
(248,'leave_document_image','download-1681899177413.jfif','2023-04-19 15:42:57'),
(249,'loan_document_image','download-1681988075668.jfif','2023-04-20 16:24:35'),
(250,'loan_document_image','download-1681988247477.jfif','2023-04-20 16:27:27'),
(251,'loan_document_image','download-1681988373195.jfif','2023-04-20 16:29:33'),
(252,'advance_document_image','download-1682052917129.jpg','2023-04-21 10:25:17'),
(253,'attendance_image','download-1682054749968.jfif','2023-04-21 10:55:49'),
(254,'attendance_image','download-1682054846531.jfif','2023-04-21 10:57:26'),
(255,'attendance_image','download-1682055915327.jfif','2023-04-21 11:15:15'),
(256,'in_time_image','download-1682056740268.jfif','2023-04-21 11:29:00'),
(257,'photo','photo-1682057567528.jpg','2023-04-21 11:42:47'),
(258,'loan_document_image','download-1682057660809.jfif','2023-04-21 11:44:20'),
(259,'leave_document_image','download-1682058666979.jfif','2023-04-21 12:01:07'),
(260,'attendance_image','download-1682064364113.jfif','2023-04-21 13:36:04'),
(261,'attendance_image','download-1682064403082.jfif','2023-04-21 13:36:43'),
(262,'attendance_image','download-1682064454183.jfif','2023-04-21 13:37:34'),
(263,'attendance_image','download-1682064552198.jfif','2023-04-21 13:39:12'),
(264,'attendance_image','download-1682064611061.jfif','2023-04-21 13:40:11'),
(265,'attendance_image','download-1682064646137.jfif','2023-04-21 13:40:46'),
(266,'attendance_image','download-1682064668871.jfif','2023-04-21 13:41:08'),
(267,'attendance_image','download-1682064697212.jfif','2023-04-21 13:41:37'),
(268,'attendance_image','download-1682064728841.jfif','2023-04-21 13:42:08'),
(269,'attendance_image','download-1682064778434.jfif','2023-04-21 13:42:58'),
(270,'attendance_image','download-1682064957189.jfif','2023-04-21 13:45:57'),
(271,'attendance_image','download-1682065047248.jfif','2023-04-21 13:47:27'),
(272,'attendance_image','download-1682065127183.jfif','2023-04-21 13:48:47'),
(273,'attendance_image','download-1682065188920.jfif','2023-04-21 13:49:48'),
(274,'attendance_image','download-1682065214939.jfif','2023-04-21 13:50:14'),
(275,'attendance_image','download-1682065338250.jfif','2023-04-21 13:52:18'),
(276,'attendance_image','download-1682065394048.jfif','2023-04-21 13:53:14'),
(277,'attendance_image','download-1682065420902.jfif','2023-04-21 13:53:40'),
(278,'photo','photo-1682070885459.jpg','2023-04-21 15:24:45'),
(279,'photo','photo-1682070944630.jpg','2023-04-21 15:25:44'),
(280,'photo','photo-1682070972917.jpg','2023-04-21 15:26:12'),
(281,'photo','photo-1682071134524.jpg','2023-04-21 15:28:54'),
(282,'photo','photo-1682071186827.jpg','2023-04-21 15:29:46'),
(283,'photo','photo-1682071228187.jpg','2023-04-21 15:30:28'),
(284,'photo','photo-1682071248125.jpg','2023-04-21 15:30:48'),
(285,'documents','document-1682071248124.jpg','2023-04-21 15:30:48'),
(286,'documents','document-1682071248125.jpg','2023-04-21 15:30:48'),
(287,'photo','photo-1682071303833.jpg','2023-04-21 15:31:43'),
(288,'documents','document-1682071303833.jpg','2023-04-21 15:31:43'),
(289,'documents','document-1682071303833.jpg','2023-04-21 15:31:43'),
(290,'photo','photo-1682072233587.jpg','2023-04-21 15:47:13'),
(291,'documents','document-1682072233586.jpg','2023-04-21 15:47:13'),
(292,'documents','document-1682072233586.jpg','2023-04-21 15:47:13'),
(293,'photo','photo-1682072267412.jpg','2023-04-21 15:47:47'),
(294,'documents','document-1682072267411.jpg','2023-04-21 15:47:47'),
(295,'documents','document-1682072267412.jpg','2023-04-21 15:47:47'),
(296,'photo','photo-1682072306131.jpg','2023-04-21 15:48:26'),
(297,'documents','document-1682072306130.jpg','2023-04-21 15:48:26'),
(298,'documents','document-1682072306131.jpg','2023-04-21 15:48:26'),
(299,'advance_document_image','download-1682074220870.jpg','2023-04-21 16:20:20'),
(300,'advance_document_image','download-1682136846677.jpg','2023-04-22 09:44:06'),
(301,'attendance_image','download-1682140076413.jpg','2023-04-22 10:37:56'),
(302,'attendance_image','download-1682140076415.jpg','2023-04-22 10:37:56'),
(303,'attendance_image','download-1682140179628.jpg','2023-04-22 10:39:39'),
(304,'attendance_image','download-1682140179628.jpg','2023-04-22 10:39:39'),
(305,'in_time_image','download-1682141889029.jfif','2023-04-22 11:08:09'),
(306,'attendance_image','download-1682143622388.jpg','2023-04-22 11:37:02'),
(307,'attendance_image','download-1682143622393.jpg','2023-04-22 11:37:02'),
(308,'photo','photo-1682150534001.jpg','2023-04-22 13:32:14'),
(309,'photo','photo-1682150575263.jpg','2023-04-22 13:32:55'),
(310,'documents','document-1682150575262.jpg','2023-04-22 13:32:55'),
(311,'documents','document-1682150575263.jpg','2023-04-22 13:32:55'),
(312,'attendance_image','download-1682152709483.jfif','2023-04-22 14:08:29'),
(313,'photo','photo-1682304857513.jpg','2023-04-24 08:24:17'),
(314,'documents','document-1682304857511.jpg','2023-04-24 08:24:17'),
(315,'documents','document-1682304857513.jpg','2023-04-24 08:24:17'),
(316,'attendance_image','download-1682315966708.jpg','2023-04-24 11:29:26'),
(317,'attendance_image','download-1682315966709.jpg','2023-04-24 11:29:26'),
(318,'in_time_image','download-1682318655456.jfif','2023-04-24 12:14:15'),
(319,'in_time_image','download-1682318736678.jfif','2023-04-24 12:15:36'),
(320,'in_time_image','download-1682318785739.jfif','2023-04-24 12:16:25'),
(321,'in_time_image','download-1682318799186.jfif','2023-04-24 12:16:39'),
(322,'in_time_image','download-1682318821705.jfif','2023-04-24 12:17:01'),
(323,'photo','photo-1682322418319.jpg','2023-04-24 13:16:58'),
(324,'photo','photo-1682322466458.jpg','2023-04-24 13:17:46'),
(325,'documents','document-1682322466457.jpg','2023-04-24 13:17:46'),
(326,'documents','document-1682322466457.jpg','2023-04-24 13:17:46'),
(327,'photo','photo-1682322519796.jpg','2023-04-24 13:18:39'),
(328,'documents','document-1682322519795.jpg','2023-04-24 13:18:39'),
(329,'documents','document-1682322519796.jpg','2023-04-24 13:18:39'),
(330,'in_time_image','download-1682335052958.jfif','2023-04-24 16:47:32'),
(331,'in_time_image','download-1682336317452.jfif','2023-04-24 17:08:37'),
(332,'in_time_image','download-1682336357567.jfif','2023-04-24 17:09:17'),
(333,'attendance_image','download-1682589566164.jfif','2023-04-27 15:29:26'),
(334,'attendance_image','download-1682648291814.jfif','2023-04-28 07:48:11'),
(335,'attendance_image','./uploads/1682653049359download.png','2023-04-28 09:07:29'),
(336,'attendance_image','./uploads/1682653384352download.jpeg','2023-04-28 09:13:04'),
(337,'attendance_image','./uploads/1682654540462download.jpeg','2023-04-28 09:32:20'),
(338,'attendance_image','./uploads/1682654786289download.jpeg','2023-04-28 09:36:26'),
(339,'attendance_image','./uploads/1682655003379download.png','2023-04-28 09:40:03'),
(340,'attendance_image','./uploads/1682658548066download.jpeg','2023-04-28 10:39:08'),
(341,'attendance_document',NULL,'2023-05-09 12:47:54'),
(342,'attendance_document',NULL,'2023-05-09 15:15:01'),
(343,'attendance_image','./uploads/1683889191858download.jpeg','2023-05-12 16:29:51'),
(344,'attendance_image','./uploads/1683891480345download.jpeg','2023-05-12 17:08:00'),
(345,'attendance_image','./uploads/1683891721397download.jpeg','2023-05-12 17:12:01'),
(346,'attendance_image','./uploads/1683891847937download.jpeg','2023-05-12 17:14:07'),
(347,'attendance_image','./uploads/1683891935645download.jpeg','2023-05-12 17:15:35'),
(348,'attendance_image','./uploads/1683892009868download.jpeg','2023-05-12 17:16:49'),
(349,'leave_document_image','download-1684402915884.jpg','2023-05-18 15:11:55'),
(350,'leave_document_image','download-1684403028929.jpg','2023-05-18 15:13:48'),
(351,'leave_document_image','download-1684403360052.jpg','2023-05-18 15:19:20'),
(352,'leave_document_image','download-1684403394737.jpg','2023-05-18 15:19:54'),
(353,'leave_document_image','download-1684403421148.jpg','2023-05-18 15:20:21'),
(354,'leave_document_image','download-1684403592235.jpg','2023-05-18 15:23:12'),
(355,'leave_document_image','download-1684403789826.jpg','2023-05-18 15:26:29'),
(356,'leave_document_image','download-1684403911323.jpg','2023-05-18 15:28:31'),
(357,'leave_document_image','download-1684403968337.jpg','2023-05-18 15:29:28'),
(358,'leave_document_image','download-1684404010755.jpg','2023-05-18 15:30:10'),
(359,'leave_document_image','download-1684404158316.jpg','2023-05-18 15:32:38'),
(360,'leave_document_image','download-1684404393812.jpg','2023-05-18 15:36:33'),
(361,'leave_document_image','download-1684404686905.jpg','2023-05-18 15:41:26'),
(362,'leave_document_image','download-1684404878117.jpg','2023-05-18 15:44:38'),
(363,'leave_document_image','download-1684405314762.jpg','2023-05-18 15:51:54'),
(364,'advance_document_image','download-1684412770651.jpg','2023-05-18 17:56:10'),
(365,'advance_document_image','download-1684412817271.jpg','2023-05-18 17:56:57'),
(366,'advance_document_image','download-1684412894121.jpg','2023-05-18 17:58:14'),
(367,'advance_document_image','download-1684471104255.jpg','2023-05-19 10:08:24'),
(368,'advance_document_image','download-1684479713113.jpg','2023-05-19 12:31:53'),
(369,'attendance_image','./uploads/1684573482922download.jpeg','2023-05-20 14:34:42'),
(370,'bonus_document','download-1684734724774.sql','2023-05-22 11:22:04'),
(371,'attendance_image','./uploads/1684738222004download.jpeg','2023-05-22 12:20:22'),
(372,'loan_document_image','download-1684924424095.sql','2023-05-24 16:03:44'),
(373,'loan_document_image','download-1684924433264.sql','2023-05-24 16:03:53'),
(374,'loan_document_image','download-1684924612785.sql','2023-05-24 16:06:52'),
(375,'loan_document_image','download-1684924646950.sql','2023-05-24 16:07:26'),
(376,'loan_document_image','download-1684925419924.sql','2023-05-24 16:20:19'),
(377,'advance_document','download-1684928848212.sql','2023-05-24 17:17:28'),
(378,'advance_document','download-1684989634048.sql','2023-05-25 10:10:34'),
(379,'leave_document_image','download-1684998987928.sql','2023-05-25 12:46:27'),
(380,'leave_document_image','download-1684999287648.sql','2023-05-25 12:51:27'),
(381,'leave_document_image','download-1684999645138.sql','2023-05-25 12:57:25'),
(382,'leave_document_image','download-1684999902374.sql','2023-05-25 13:01:42'),
(383,'leave_document_image','download-1685000015531.sql','2023-05-25 13:03:35'),
(384,'leave_document_image','download-1685000186806.sql','2023-05-25 13:06:26'),
(385,'leave_document_image','download-1685001350161.sql','2023-05-25 13:25:50');

/*Table structure for table `fine_requests` */

DROP TABLE IF EXISTS `fine_requests`;

CREATE TABLE `fine_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fine_id` int(11) DEFAULT NULL,
  `fine_document_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fine_id` (`fine_id`),
  KEY `fine_document_id` (`fine_document_id`),
  CONSTRAINT `fine_requests_ibfk_1` FOREIGN KEY (`fine_id`) REFERENCES `fines` (`id`),
  CONSTRAINT `fine_requests_ibfk_2` FOREIGN KEY (`fine_document_id`) REFERENCES `file_upload` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `fine_requests` */

/*Table structure for table `fines` */

DROP TABLE IF EXISTS `fines`;

CREATE TABLE `fines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `reason` longtext DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `recall_head` tinyint(2) DEFAULT 1,
  `head_approval` tinyint(2) DEFAULT 1,
  `status` enum('Pending','Approved','Rejected') DEFAULT NULL,
  `payment_status` enum('Paid','Unpaid') DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `status_by_id` int(11) DEFAULT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `approval_by_id` (`status_by_id`),
  CONSTRAINT `fines_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `fines_ibfk_2` FOREIGN KEY (`status_by_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `fines` */

insert  into `fines`(`id`,`employee_id`,`amount`,`reason`,`date`,`recall_head`,`head_approval`,`status`,`payment_status`,`status_date`,`status_by_id`,`rejection_reason`) values 
(2,1,1000,'Lorem Epsum','2023-04-12 15:47:47',NULL,NULL,'Approved','Unpaid','2023-04-22 14:28:15',1,'Any'),
(3,22,367,'Late Coming','2023-04-19 16:47:10',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(4,2,9,'Late Coming','2023-04-21 10:49:48',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(5,6,32,'Late Coming','2023-04-21 11:12:14',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(6,1,1000,'Lorem Epsum','2023-04-21 11:57:39',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(7,5,200,'Some','2023-05-25 13:44:06',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(8,5,200,'','2023-05-25 13:44:14',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(9,5,200,'Hello','2023-05-25 13:45:40',1,1,'Pending','Unpaid',NULL,NULL,NULL),
(10,5,200,'','2023-05-25 13:46:20',1,1,'Pending','Unpaid',NULL,NULL,NULL);

/*Table structure for table `floors` */

DROP TABLE IF EXISTS `floors`;

CREATE TABLE `floors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `floors` */

insert  into `floors`(`id`,`name`) values 
(1,'1st'),
(2,'2nd');

/*Table structure for table `grades` */

DROP TABLE IF EXISTS `grades`;

CREATE TABLE `grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `grade_1st` int(11) DEFAULT 10,
  `grade_2nd` int(11) DEFAULT NULL,
  `grade_3rd` int(11) DEFAULT NULL,
  `grade_4th` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `week` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `grades` */

insert  into `grades`(`id`,`employee_id`,`grade_1st`,`grade_2nd`,`grade_3rd`,`grade_4th`,`month`,`status`,`date`,`modified_date`,`year`,`week`) values 
(1,1,4,5,5,10,3,NULL,'2023-04-14 11:16:22','2023-04-15 14:11:51',NULL,NULL),
(2,2,9,10,10,10,3,NULL,'2023-04-20 11:01:49',NULL,2023,NULL),
(3,5,4,5,5,10,3,NULL,'2023-04-22 10:43:34',NULL,2023,NULL),
(4,7,4,5,5,10,3,NULL,'2023-04-22 11:41:33',NULL,2023,NULL),
(5,3,4,5,5,10,3,NULL,'2023-04-22 16:05:07',NULL,2023,NULL),
(7,4,4,5,5,10,3,NULL,'2023-04-22 16:05:41',NULL,2023,NULL),
(8,6,4,5,5,10,3,NULL,'2023-04-22 16:05:48',NULL,2023,NULL),
(9,8,4,5,5,10,3,NULL,'2023-04-22 16:05:54',NULL,2023,NULL),
(10,9,4,5,5,10,3,NULL,'2023-04-22 16:06:02',NULL,2023,NULL),
(11,10,4,5,5,10,3,NULL,'2023-04-22 16:06:08',NULL,2023,NULL),
(12,2,9,10,10,4,3,NULL,'2023-04-22 16:37:41',NULL,2023,NULL),
(13,2,9,10,10,4,3,NULL,'2023-04-24 11:41:26',NULL,2023,NULL),
(21,1,4,5,7,10,4,NULL,'2023-05-06 13:28:30',NULL,2023,NULL),
(22,1,4,5,7,9,4,NULL,'2023-04-07 13:28:30',NULL,2023,NULL),
(23,1,4,5,8,9,4,NULL,'2023-04-21 13:28:30',NULL,2023,NULL),
(31,1,4,5,5,10,4,NULL,'2023-05-23 15:48:41',NULL,2023,NULL);

/*Table structure for table `interview` */

DROP TABLE IF EXISTS `interview`;

CREATE TABLE `interview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `interviewer_employee_id` int(11) DEFAULT NULL,
  `expected_salary` double DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `remarks` longtext DEFAULT NULL,
  `status` enum('Trial','Reject','Permanent') DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `fathers_name` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `reference_id` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `designation_id` (`designation_id`),
  KEY `interviewer_employee_id` (`interviewer_employee_id`),
  KEY `reference_id` (`reference_id`),
  CONSTRAINT `interview_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `interview_ibfk_3` FOREIGN KEY (`interviewer_employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `interview_ibfk_4` FOREIGN KEY (`reference_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `interview` */

insert  into `interview`(`id`,`name`,`interviewer_employee_id`,`expected_salary`,`qualification`,`date_time`,`remarks`,`status`,`designation_id`,`fathers_name`,`experience`,`reference_id`) values 
(1,'Anjali',2,20000,'B.Tech','2023-04-14 00:00:00','Ok','Permanent',8,'S','3 Years',1),
(2,'Anjali',2,20000,'B.Tech','2023-04-14 00:00:00','Ok','Trial',8,'S','3 Years',1),
(3,'Anjali',2,20000,'B.Tech','2023-04-14 00:00:00','Ok','Trial',8,'S','3 Years',1),
(4,'Anjali',2,20000,'B.Tech','2023-04-14 00:00:00','Ok','Trial',8,'S','3 Years',1),
(5,'Anjali',2,20000,'B.Tech','2023-04-14 00:00:00','Ok',NULL,8,'S','3 Years',1);

/*Table structure for table `interview_documents` */

DROP TABLE IF EXISTS `interview_documents`;

CREATE TABLE `interview_documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `document_id` int(11) DEFAULT NULL,
  `interview_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `document_id` (`document_id`),
  KEY `interview_id` (`interview_id`),
  CONSTRAINT `interview_documents_ibfk_1` FOREIGN KEY (`document_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `interview_documents_ibfk_2` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `interview_documents` */

insert  into `interview_documents`(`id`,`document_id`,`interview_id`) values 
(1,66,1),
(2,67,1),
(3,301,2),
(4,302,2),
(5,303,3),
(6,304,3),
(7,306,4),
(8,307,4),
(9,316,5),
(10,317,5);

/*Table structure for table `job_details` */

DROP TABLE IF EXISTS `job_details`;

CREATE TABLE `job_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `head_employee_id` int(11) DEFAULT NULL,
  `hired_by_employee_id` int(11) DEFAULT NULL,
  `hiring_date_time` datetime DEFAULT NULL,
  `lead_from` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `floor_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `epf_no` varchar(255) DEFAULT NULL,
  `esi_no` varchar(255) DEFAULT NULL,
  `store_department_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `created_on` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `floor_id` (`floor_id`),
  KEY `head_employee_id` (`head_employee_id`),
  KEY `hired_by_employee_id` (`hired_by_employee_id`),
  KEY `role_id` (`role_id`),
  KEY `store_department_id` (`store_department_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `job_details_ibfk_3` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`id`),
  CONSTRAINT `job_details_ibfk_4` FOREIGN KEY (`head_employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `job_details_ibfk_5` FOREIGN KEY (`hired_by_employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `job_details_ibfk_6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `job_details_ibfk_7` FOREIGN KEY (`store_department_id`) REFERENCES `store_departments` (`id`),
  CONSTRAINT `job_details_ibfk_8` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `job_details` */

insert  into `job_details`(`id`,`head_employee_id`,`hired_by_employee_id`,`hiring_date_time`,`lead_from`,`location`,`floor_id`,`role_id`,`epf_no`,`esi_no`,`store_department_id`,`location_id`,`created_on`) values 
(1,2,2,'2023-04-02 09:05:17',NULL,NULL,2,8,NULL,NULL,1,2,NULL),
(2,35,NULL,NULL,NULL,NULL,1,3,NULL,NULL,1,2,NULL),
(3,NULL,NULL,NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL),
(4,NULL,NULL,NULL,NULL,NULL,NULL,6,NULL,NULL,NULL,NULL,NULL),
(5,35,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,10,'123','124',2,2,NULL),
(6,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(7,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(8,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(9,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(10,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(11,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(12,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(13,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(14,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(15,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(16,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(17,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(18,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(19,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(20,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,NULL),
(21,5,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',1,8,'123','124',2,2,NULL),
(22,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 11:42:47'),
(23,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:24:45'),
(24,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:25:44'),
(25,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:26:12'),
(26,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:28:54'),
(27,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:29:46'),
(28,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:30:28'),
(29,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:30:48'),
(30,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:31:43'),
(31,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:47:13'),
(32,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:47:47'),
(33,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-21 15:48:26'),
(34,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-22 13:32:14'),
(35,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-22 13:32:55'),
(36,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-24 08:24:17'),
(37,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-24 13:16:58'),
(38,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-24 13:17:46'),
(39,2,NULL,'2023-04-15 00:00:00','Ankita','New Delhi',2,8,'123','124',2,2,'2023-04-24 13:18:39'),
(40,3,NULL,NULL,NULL,NULL,NULL,9,NULL,NULL,NULL,2,'2023-04-29 10:09:21'),
(41,3,NULL,NULL,NULL,NULL,NULL,2,NULL,NULL,NULL,2,'2023-05-01 15:29:01'),
(43,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,'2023-05-19 10:29:42'),
(44,38,38,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,'2023-05-19 10:32:57');

/*Table structure for table `leaves` */

DROP TABLE IF EXISTS `leaves`;

CREATE TABLE `leaves` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `from_date` datetime DEFAULT NULL,
  `approval_status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `recall_head` tinyint(2) DEFAULT NULL,
  `head_approval` tinyint(2) DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `approval_document_id` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `approval_document_id` (`approval_document_id`),
  CONSTRAINT `leaves_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `leaves_ibfk_2` FOREIGN KEY (`approval_document_id`) REFERENCES `file_upload` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `leaves` */

insert  into `leaves`(`id`,`employee_id`,`from_date`,`approval_status`,`recall_head`,`head_approval`,`to_date`,`approval_document_id`,`reason`) values 
(6,1,'2023-04-13 00:00:00','Rejected',1,1,'2023-04-17 00:00:00',NULL,NULL),
(13,22,'2023-04-19 00:00:00','Pending',1,1,'2023-04-23 00:00:00',NULL,NULL),
(53,22,'2023-05-20 00:00:00','Pending',0,1,'2023-05-21 00:00:00',361,NULL),
(56,1,'2023-04-26 11:56:28','Pending',1,1,'2023-04-30 11:56:55',NULL,NULL),
(62,22,'2023-05-03 00:00:00','Approved',1,0,'2023-05-04 00:00:00',384,NULL),
(63,5,'2023-05-05 00:00:00','Pending',1,0,'2023-05-07 00:00:00',385,NULL);

/*Table structure for table `loan` */

DROP TABLE IF EXISTS `loan`;

CREATE TABLE `loan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `tenure` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `file_upload_id` int(11) DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `head_approval` tinyint(2) DEFAULT NULL,
  `recall_head` tinyint(2) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `rejection_reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `file_upload_id` (`file_upload_id`),
  KEY `loan_ibfk_3` (`status_id`),
  CONSTRAINT `loan_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `loan_ibfk_2` FOREIGN KEY (`file_upload_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `loan_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `loan` */

insert  into `loan`(`id`,`employee_id`,`amount`,`tenure`,`date`,`file_upload_id`,`status`,`head_approval`,`recall_head`,`status_id`,`status_date`,`rejection_reason`) values 
(30,1,5000,3,'2023-04-20 16:29:33',251,'Approved',1,1,1,'2023-05-18 12:42:15',NULL),
(31,5,5000,3,'2023-04-21 11:44:20',258,'Rejected',1,1,1,'2023-04-22 11:28:19','Any'),
(32,24,5000,3,'2023-04-29 12:31:51',NULL,'Rejected',1,1,1,'2023-05-18 12:47:27','Not Valid'),
(33,5,5000,3,'2023-05-18 16:27:42',NULL,'Pending',NULL,NULL,NULL,NULL,NULL),
(34,1,2000,2,'2023-05-24 16:07:26',375,'Pending',1,1,NULL,NULL,NULL),
(35,5,10000,5,'2023-05-24 16:20:19',376,'Pending',1,1,NULL,NULL,NULL);

/*Table structure for table `loan_repayment` */

DROP TABLE IF EXISTS `loan_repayment`;

CREATE TABLE `loan_repayment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loan_id` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `status` enum('Paid','Unpaid') DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `loan_id` (`loan_id`),
  CONSTRAINT `loan_repayment_ibfk_1` FOREIGN KEY (`loan_id`) REFERENCES `loan` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `loan_repayment` */

insert  into `loan_repayment`(`id`,`loan_id`,`date`,`status`,`month`,`year`,`amount`) values 
(154,30,12,'Unpaid',8,2023,2000),
(155,30,12,'Unpaid',9,2023,1000),
(156,30,12,'Unpaid',10,2023,20000),
(157,31,12,'Unpaid',3,2023,0),
(158,31,12,'Unpaid',9,2023,1000),
(159,31,12,'Unpaid',10,2023,4000),
(160,32,29,'Paid',3,2023,1000),
(161,32,29,'Unpaid',4,2023,0),
(162,32,29,'Unpaid',5,2023,4000),
(163,33,18,'Paid',4,2023,1000),
(164,33,18,'Unpaid',5,2023,0),
(165,33,18,'Unpaid',6,2023,4000),
(166,34,24,'Unpaid',5,2023,1000),
(167,34,24,'Unpaid',6,2023,1000),
(168,35,24,'Unpaid',5,2023,2000),
(169,35,24,'Unpaid',6,2023,2000),
(170,35,24,'Unpaid',7,2023,3000),
(171,35,24,'Unpaid',8,2023,1000),
(172,35,24,'Unpaid',9,2023,2000);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) DEFAULT NULL,
  `permissions` longtext DEFAULT NULL,
  `floor_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `floor_id` (`floor_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`floor_id`) REFERENCES `floors` (`id`),
  CONSTRAINT `roles_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`role_name`,`permissions`,`floor_id`,`location_id`) values 
(1,'Super Admin',NULL,NULL,NULL),
(2,'Guard',NULL,NULL,NULL),
(3,'Floor Incharge',NULL,1,2),
(5,'HR Assistant',NULL,NULL,NULL),
(6,'HR Head',NULL,NULL,NULL),
(7,'Admin',NULL,NULL,NULL),
(8,'Salesman',NULL,NULL,NULL),
(9,'location Incharge',NULL,NULL,2),
(10,'Floor Incharge',NULL,2,2),
(16,'Floor Incharge',NULL,1,1),
(17,'Floor Incharge',NULL,2,1);

/*Table structure for table `salaries` */

DROP TABLE IF EXISTS `salaries`;

CREATE TABLE `salaries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `working_days` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `computed` double DEFAULT NULL,
  `commission` double DEFAULT NULL,
  `expense` double DEFAULT NULL,
  `tea` double DEFAULT NULL,
  `advance` double DEFAULT NULL,
  `loan_emi` double DEFAULT NULL,
  `total_earnings` double DEFAULT NULL,
  `total_deductions` double DEFAULT NULL,
  `net_salary` double DEFAULT NULL,
  `status` enum('Paid','Pending') DEFAULT NULL,
  `esi` double DEFAULT NULL,
  `pf` double DEFAULT NULL,
  `basic_salary` double DEFAULT NULL,
  `hra` double DEFAULT NULL,
  `days_shown` int(11) DEFAULT NULL,
  `cash_incentive` double DEFAULT NULL,
  `net_payable_salary` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `salaries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `salaries` */

insert  into `salaries`(`id`,`employee_id`,`working_days`,`month`,`computed`,`commission`,`expense`,`tea`,`advance`,`loan_emi`,`total_earnings`,`total_deductions`,`net_salary`,`status`,`esi`,`pf`,`basic_salary`,`hra`,`days_shown`,`cash_incentive`,`net_payable_salary`) values 
(1,2,2,3,12500,1300,0,20,0,0,13800,20,13780,'Paid',103.35,992.16,8268,5512,21,220,12684.49);

/*Table structure for table `salaries_increment` */

DROP TABLE IF EXISTS `salaries_increment`;

CREATE TABLE `salaries_increment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `percentage` double DEFAULT NULL,
  `type` enum('Flat','Percentage') DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `salaries_increment_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `salaries_increment` */

insert  into `salaries_increment`(`id`,`employee_id`,`amount`,`date`,`percentage`,`type`,`status`) values 
(1,2,12000,'0000-00-00 00:00:00',NULL,'Flat',NULL),
(2,2,13440.000000000002,'0000-00-00 00:00:00',12,'Percentage',NULL),
(3,2,15052.800000000003,'2023-04-22 00:00:00',12,'Percentage',NULL),
(4,1,13440.000000000002,'2023-04-22 00:00:00',12,'Percentage',NULL),
(5,1,1200,'2023-04-22 00:00:00',NULL,'Flat',NULL),
(6,1,2000,'2023-04-22 00:00:00',NULL,'Flat',NULL),
(7,1,2000,'2023-04-24 00:00:00',NULL,'Flat',NULL),
(8,1,2000,'2023-04-24 00:00:00',NULL,'Flat',NULL);

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `settings` */

insert  into `settings`(`id`,`name`,`value`) values 
(1,'hra','40'),
(2,'basic','60');

/*Table structure for table `store_departments` */

DROP TABLE IF EXISTS `store_departments`;

CREATE TABLE `store_departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `store_departments` */

insert  into `store_departments`(`id`,`name`) values 
(1,'Kids'),
(2,'Men'),
(3,'Women');

/*Table structure for table `locations` */

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `locations` */

insert  into `locations`(`id`,`name`) values 
(1,'1st'),
(2,'2nd'),
(3,'3rd');

/*Table structure for table `timing` */

DROP TABLE IF EXISTS `timing`;

CREATE TABLE `timing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `out_time` time DEFAULT NULL,
  `in_time` time DEFAULT NULL,
  `timer` time DEFAULT NULL,
  `approval_status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  `reason` varchar(256) DEFAULT NULL,
  `file_upload_id` int(11) DEFAULT NULL,
  `created_datetime` datetime DEFAULT current_timestamp(),
  `modified_date_time` datetime DEFAULT NULL,
  `status_date` datetime DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `file_upload_id` (`file_upload_id`),
  KEY `approval_id` (`status_id`),
  CONSTRAINT `timing_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `timing_ibfk_3` FOREIGN KEY (`file_upload_id`) REFERENCES `file_upload` (`id`),
  CONSTRAINT `timing_ibfk_5` FOREIGN KEY (`status_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `timing` */

insert  into `timing`(`id`,`employee_id`,`date`,`out_time`,`in_time`,`timer`,`approval_status`,`reason`,`file_upload_id`,`created_datetime`,`modified_date_time`,`status_date`,`status_id`) values 
(1,1,'2023-04-10','08:20:10',NULL,NULL,'Rejected',NULL,NULL,'2023-04-11 14:54:51','2023-04-13 13:46:19','2023-04-13 13:46:19',6),
(2,1,'2023-04-10','10:00:00','11:00:00','01:00:00','Approved',NULL,NULL,'2023-04-11 14:54:51','2023-04-22 09:38:50',NULL,NULL),
(3,1,'2023-04-10','11:00:00','11:00:00','01:00:00','Approved','Washroom',20,'2023-04-11 14:54:51','2023-04-21 14:28:44',NULL,NULL),
(4,1,'2023-04-10','10:00:00','12:00:00','02:00:00','Rejected','Washroom',256,'2023-04-21 11:26:39','2023-04-24 16:48:26','2023-04-24 16:48:26',2),
(5,1,'2023-04-21','15:14:44','14:15:25','00:16:30','Approved','',NULL,'2023-04-21 15:14:44','2023-05-03 14:15:25',NULL,NULL),
(6,1,'2023-04-22','09:40:18','01:00:00','10:40:18','Approved','For Some Work',NULL,'2023-04-22 09:40:18',NULL,NULL,NULL),
(7,1,'2023-04-22','11:00:00','12:00:00','02:00:00','Approved','Washroom',305,'2023-04-22 11:06:55','2023-04-22 11:08:09',NULL,NULL),
(8,7,'2023-04-22','11:12:38','01:00:00','12:12:38','Approved','For Some Work',NULL,'2023-04-22 11:12:38',NULL,NULL,NULL),
(9,8,'2023-04-22','11:00:00','13:00:00','02:00:00','Approved','For Some Work',330,'2023-04-22 13:07:36','2023-04-24 16:47:32',NULL,NULL),
(10,8,'2023-04-24','12:00:00','13:00:00','01:00:00','Approved','For Some Work',332,'2023-04-24 08:21:26','2023-04-24 17:09:17',NULL,NULL),
(11,9,'2023-04-24',NULL,NULL,'01:00:00','Approved','For Some Work',NULL,'2023-04-24 11:05:11',NULL,NULL,NULL),
(12,1,'2023-05-01','04:49:59','04:54:42','12:04:43','Approved','For Purchase',NULL,'2023-05-01 11:19:05','2023-05-01 16:54:42','2023-05-01 14:53:31',3),
(14,8,'2023-05-01','05:21:26',NULL,NULL,'Approved','',NULL,'2023-05-01 17:21:26',NULL,NULL,NULL),
(15,8,'2023-05-01','17:24:06',NULL,NULL,'Approved','',NULL,'2023-05-01 17:24:06',NULL,NULL,NULL),
(16,8,'2023-05-01','17:27:10',NULL,NULL,'Approved','',NULL,'2023-05-01 17:27:10',NULL,NULL,NULL),
(17,8,'2023-05-01','17:43:37',NULL,NULL,'Approved','on',NULL,'2023-05-01 17:43:37',NULL,NULL,NULL),
(30,1,'2023-05-02','11:09:43','11:44:42','00:34:59','Approved','Washroom',NULL,'2023-05-02 11:09:43','2023-05-02 11:44:42',NULL,NULL),
(37,5,'2023-05-02','13:35:10','13:43:32','00:08:22','Approved','Washroom',NULL,'2023-05-02 13:35:10','2023-05-02 13:43:32',NULL,NULL),
(38,1,'2023-05-02','13:43:59','13:57:46','00:13:47','Approved','Lunch',NULL,'2023-05-02 13:43:59','2023-05-02 13:57:46',NULL,NULL),
(39,5,'2023-05-02','15:45:26',NULL,NULL,'Approved','Lunch',NULL,'2023-05-02 15:45:26',NULL,NULL,NULL),
(40,1,'2023-05-02','15:47:11',NULL,NULL,'Approved','Lunch',NULL,'2023-05-02 15:47:11',NULL,NULL,NULL),
(41,1,'2023-05-03','12:05:33','14:01:02','01:55:29','Approved','Washroom',NULL,'2023-05-03 12:05:33','2023-05-03 14:01:02',NULL,NULL),
(42,5,'2023-05-03','13:58:55','14:18:15','00:19:20','Approved','Washroom',NULL,'2023-05-03 13:58:55','2023-05-03 14:18:15',NULL,NULL),
(43,5,'2023-05-03','15:04:35',NULL,NULL,'Approved','Lunch',NULL,'2023-05-03 15:04:35',NULL,NULL,NULL),
(44,6,'2023-05-03',NULL,NULL,'00:15:00','Approved',NULL,NULL,'2023-05-03 16:07:26',NULL,NULL,3),
(45,1,'2023-05-05','13:08:33','13:08:43','00:00:10','Approved','Washroom',NULL,'2023-05-05 13:08:33','2023-05-05 13:08:43',NULL,NULL),
(46,1,'2023-05-05','01:11:33','13:29:41','12:18:08','Approved',NULL,NULL,'2023-05-05 13:10:50','2023-05-05 13:29:41',NULL,3),
(47,1,'2023-05-05','13:36:58','13:37:00','00:00:02','Approved','Washroom',NULL,'2023-05-05 13:36:58','2023-05-05 13:37:00',NULL,NULL),
(48,1,'2023-05-05','03:10:08','15:10:12','12:00:04','Approved',NULL,NULL,'2023-05-05 15:08:47','2023-05-05 15:10:12',NULL,3),
(49,6,'2023-05-05','15:40:20','15:48:39','00:08:19','Approved','Lunch',NULL,'2023-05-05 15:40:20','2023-05-05 15:48:39',NULL,NULL),
(50,1,'2023-05-05','16:06:13','16:06:36','00:00:23','Approved',NULL,NULL,'2023-05-05 15:43:51','2023-05-05 16:06:36',NULL,10),
(56,6,'2023-05-05','15:55:23','16:06:44','00:11:21','Approved','Lunch',NULL,'2023-05-05 15:55:23','2023-05-05 16:06:44',NULL,NULL),
(62,6,'2023-05-05','16:09:05','16:10:19','00:01:14','Approved',NULL,NULL,'2023-05-05 16:07:48','2023-05-05 16:10:19',NULL,3),
(63,1,'2023-05-05','18:17:13','18:17:18','00:00:05','Approved',NULL,NULL,'2023-05-05 18:16:23','2023-05-05 18:17:18',NULL,3),
(64,6,'2023-05-05','18:32:01','18:32:03','00:00:02','Approved','For Some Work',NULL,'2023-05-05 18:26:45','2023-05-05 18:32:03',NULL,3),
(65,1,'2023-05-06','08:20:36','08:21:01','00:00:25','Approved','Washroom',NULL,'2023-05-06 08:20:36','2023-05-06 08:21:01',NULL,NULL),
(66,1,'2023-05-06','08:36:44','08:36:47','00:00:03','Approved','For Some Work',NULL,'2023-05-06 08:22:29','2023-05-06 08:36:47',NULL,3),
(67,30,'2023-05-08',NULL,NULL,'01:00:00','Approved','For Some Office Work',NULL,'2023-05-08 10:39:36',NULL,NULL,3),
(68,1,'2023-05-09','12:16:18',NULL,'00:12:00','Approved','For Office Work',NULL,'2023-05-09 12:13:12',NULL,NULL,3),
(69,6,'2023-05-09',NULL,NULL,'00:10:00','Approved','For Some Work',NULL,'2023-05-09 15:21:24',NULL,'2023-05-09 15:21:24',3);

/*Table structure for table `timing_requests` */

DROP TABLE IF EXISTS `timing_requests`;

CREATE TABLE `timing_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timing_id` int(11) DEFAULT NULL,
  `status` enum('Approved','Pending','Rejected') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timing_id` (`timing_id`),
  CONSTRAINT `timing_requests_ibfk_1` FOREIGN KEY (`timing_id`) REFERENCES `timing` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `timing_requests` */

insert  into `timing_requests`(`id`,`timing_id`,`status`) values 
(1,9,'Approved'),
(2,9,'Approved'),
(3,10,'Approved');

/*Table structure for table `transfer_details` */

DROP TABLE IF EXISTS `transfer_details`;

CREATE TABLE `transfer_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `department_from` int(11) DEFAULT NULL,
  `department_to` int(11) DEFAULT NULL,
  `floor_id_from` int(11) DEFAULT NULL,
  `floor_id_to` int(11) DEFAULT NULL,
  `location_id_from` int(11) DEFAULT NULL,
  `location_id_to` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_id` (`employee_id`),
  KEY `floor_id_from` (`floor_id_from`),
  KEY `floor_id_to` (`floor_id_to`),
  KEY `department_from` (`department_from`),
  KEY `department_to` (`department_to`),
  KEY `location_id_from` (`location_id_from`),
  KEY `location_id_to` (`location_id_to`),
  CONSTRAINT `transfer_details_ibfk_10` FOREIGN KEY (`department_from`) REFERENCES `store_departments` (`id`),
  CONSTRAINT `transfer_details_ibfk_11` FOREIGN KEY (`department_to`) REFERENCES `store_departments` (`id`),
  CONSTRAINT `transfer_details_ibfk_12` FOREIGN KEY (`location_id_from`) REFERENCES `locations` (`id`),
  CONSTRAINT `transfer_details_ibfk_13` FOREIGN KEY (`location_id_to`) REFERENCES `locations` (`id`),
  CONSTRAINT `transfer_details_ibfk_6` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `transfer_details_ibfk_8` FOREIGN KEY (`floor_id_from`) REFERENCES `floors` (`id`),
  CONSTRAINT `transfer_details_ibfk_9` FOREIGN KEY (`floor_id_to`) REFERENCES `floors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `transfer_details` */

insert  into `transfer_details`(`id`,`employee_id`,`date`,`department_from`,`department_to`,`floor_id_from`,`floor_id_to`,`location_id_from`,`location_id_to`) values 
(2,1,'2023-04-13 15:46:18',1,2,1,2,NULL,NULL),
(3,1,'2023-04-13 15:47:21',1,2,1,2,NULL,NULL),
(4,1,'2023-04-13 15:47:57',1,2,1,2,NULL,NULL),
(5,1,'2023-04-13 15:48:12',1,2,1,2,NULL,NULL),
(6,1,'2023-04-13 16:52:07',1,2,1,2,NULL,NULL),
(7,1,'2023-04-13 16:52:34',1,2,1,2,NULL,NULL),
(8,1,'2023-04-13 16:53:01',1,2,1,2,NULL,NULL),
(9,1,'2023-04-13 16:53:58',1,2,1,2,NULL,NULL),
(10,1,'2023-04-13 17:30:44',1,2,1,2,1,2),
(11,1,'2023-04-21 12:06:32',2,1,2,2,NULL,NULL),
(12,5,'2023-04-22 11:35:07',1,2,1,2,1,2);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`role_id`,`username`,`password`) values 
(1,7,'admin','$2a$10$9IZ/esXuhNtP6ZRpqdh0C.B0MwsEAPwBGqRNqWuSbFslpujC2sKLS'),
(3,2,'guard@a.com','$2a$10$x28xBxsbUb4KkkmG8uZLoevx.rcm6/CzFf4gfDAejEpju/JG3ahae'),
(4,5,'hr','$2y$10$qbNWJ9HW8yk3fKdLE5u18.dLAr6MWWj2/AC13NoRV/UL8unsLjyq6'),
(5,6,'hrhead','$2y$10$j852IeQIR9zCpGI5QFqBcuM67zJBUPAbZ0qdIyYvA8ENmn1cfL11e'),
(6,3,'FI1st@a.com','$2y$10$qHds7bKX3tOS11L.tJYqee5gmGtqzen9mj3LR4KZX9tOXuWuCRo1K'),
(7,1,'super_admin','$2y$10$/R2rIBFL9yzWNGSwNfB3J./nhEutEsbmLJI99DQxbogIwsm9Pv2vu'),
(11,16,'FI3','$2a$10$B9fomdOjndyoOUVBro0cTOujFSqzBngyO096hs3EUY6iLtvBFqa6a'),
(12,17,'FI4','$2a$10$qi//42L3rkKPoMcubKE/7ug1LscAVrLx.ppwwZIM6MrJiiW8gjsgC');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
