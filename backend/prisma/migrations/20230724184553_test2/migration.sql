-- AlterTable
ALTER TABLE `user` ADD COLUMN `about` VARCHAR(191) NULL,
    ADD COLUMN `designation` VARCHAR(191) NULL,
    ADD COLUMN `institute` VARCHAR(191) NULL,
    ADD COLUMN `profile_pic` VARCHAR(191) NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Courses` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `total_hours` VARCHAR(191) NOT NULL,
    `participants` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `teacherId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_Enrollments` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_Enrollments_AB_unique`(`A`, `B`),
    INDEX `_Enrollments_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Courses` ADD CONSTRAINT `Courses_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Enrollments` ADD CONSTRAINT `_Enrollments_A_fkey` FOREIGN KEY (`A`) REFERENCES `Courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Enrollments` ADD CONSTRAINT `_Enrollments_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
