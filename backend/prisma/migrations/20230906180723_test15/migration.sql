-- AlterTable
ALTER TABLE `comment` ADD COLUMN `first_name` VARCHAR(191) NULL,
    ADD COLUMN `last_name` VARCHAR(191) NULL,
    ADD COLUMN `profile_pic` VARCHAR(191) NULL DEFAULT '';
