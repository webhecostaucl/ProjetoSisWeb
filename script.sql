CREATE DATABASE `projetosistemasweb` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `projetosistemasweb`.`login` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(510) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC))
  ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `projetosistemasweb`.`login` 
ADD COLUMN `perfil` INT(11) NULL COMMENT 'Chave que será usada para guardar perfil do funcionário' AFTER `senha`;
