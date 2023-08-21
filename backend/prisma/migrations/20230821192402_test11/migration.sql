/*
  Warnings:

  - Added the required column `level` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `total_hours` on table `courses` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `level` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(500) NOT NULL,
    MODIFY `total_hours` INTEGER NOT NULL,
    MODIFY `short_description` VARCHAR(250) NOT NULL;
