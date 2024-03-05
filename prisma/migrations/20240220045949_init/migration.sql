-- CreateTable
CREATE TABLE `Job` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `postedDate` VARCHAR(191) NOT NULL,
    `requirements` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `salaryRange` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Job_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `skills` VARCHAR(191) NULL,
    `experience` VARCHAR(191) NULL,
    `resumeUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Candidate_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PostNewJobInput` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `requirements` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `salaryRange` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
