/*
  Warnings:

  - You are about to alter the column `category` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `category` JSON NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'OTHERS', 'DONT_DISCLOSE') NULL DEFAULT 'DONT_DISCLOSE';

-- CreateTable
CREATE TABLE `Lessions` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lessions` ADD CONSTRAINT `Lessions_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Courses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
