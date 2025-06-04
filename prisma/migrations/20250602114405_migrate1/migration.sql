-- CreateTable
CREATE TABLE `Account` (
    `uuid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountUuid` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `channel_description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Profile_accountUuid_key`(`accountUuid`),
    UNIQUE INDEX `Profile_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_accountUuid_fkey` FOREIGN KEY (`accountUuid`) REFERENCES `Account`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
