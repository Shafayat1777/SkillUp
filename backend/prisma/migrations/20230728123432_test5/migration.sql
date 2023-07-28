/*
  Warnings:

  - Added the required column `short_description` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `short_description` VARCHAR(191) NOT NULL,
    MODIFY `participants` INTEGER NULL DEFAULT 0;
