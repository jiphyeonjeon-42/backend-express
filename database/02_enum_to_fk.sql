ALTER TABLE `book_info`
  RENAME COLUMN `category` TO `categoryEnum`;
ALTER TABLE `book_info`
  MODIFY COLUMN `categoryEnum` varchar(255);

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
  `name` varchar(255) NOT NULL UNIQUE
);

ALTER TABLE `book_info`
  ADD COLUMN (
    categoryId int
  ),
  ADD FOREIGN KEY (`categoryId`)
    REFERENCES `category` (`id`);


DROP PROCEDURE IF EXISTS category_reseting;

DELIMITER $$

CREATE PROCEDURE category_reseting()
BEGIN
  DECLARE n int DEFAULT 0;
  DECLARE i int DEFAULT 0;
  DECLARE cateId int DEFAULT -1;
  DECLARE cateName varchar(255) DEFAULT '';
  SELECT MAX(`id`) FROM `book_info` INTO n;
  SET i = 0;
  loop_0: WHILE i < n DO
    SELECT `categoryEnum`
      FROM `book_info`
      WHERE `id` = i
      INTO cateName;
    IF cateName = '' THEN
      SET i = i + 1;
      ITERATE loop_0;
    END IF;
    SELECT `id`
      FROM `category`
      WHERE
        `name` = cateName
      INTO cateId;
    IF cateId = -1 THEN
      INSERT INTO `category`(`name`)
        VALUES (
          (
            SELECT `categoryEnum`
              FROM `book_info`
            WHERE `id` = i
          )
        );
      UPDATE `book_info`
        SET `categoryId` = LAST_INSERT_ID()
        WHERE `id` = i;
    ELSE
      UPDATE `book_info`
        SET `categoryId` = cateId
        WHERE `id` = i;
    END IF;
  SET i = i + 1;
  SET cateId = -1;
  SET cateName = '';
  END WHILE;
END $$

DELIMITER ;

CALL category_reseting;