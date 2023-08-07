/*
  Warnings:

  - Made the column `category` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `courses` MODIFY `category` VARCHAR(191) NOT NULL;
