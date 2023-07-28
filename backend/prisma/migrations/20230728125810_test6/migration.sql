/*
  Warnings:

  - You are about to alter the column `total_hours` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `course_status` ENUM('ACTIVE', 'PROCESSING') NOT NULL DEFAULT 'PROCESSING',
    MODIFY `total_hours` INTEGER NULL;
