-- CreateTable
CREATE TABLE `User` (
    `User_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `Userpass` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_Username_key`(`Username`),
    PRIMARY KEY (`User_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordFolder` (
    `Folder_ID` INTEGER NOT NULL,
    `FolderName` VARCHAR(191) NOT NULL,
    `User_ID` INTEGER NOT NULL,

    PRIMARY KEY (`Folder_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Password` (
    `Pass_ID` INTEGER NOT NULL,
    `Folder_ID` INTEGER NOT NULL,
    `User_ID` INTEGER NOT NULL,
    `PassHash` VARCHAR(191) NOT NULL,
    `Website` VARCHAR(191) NOT NULL,
    `PassDesc` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`Pass_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PasswordFolder` ADD CONSTRAINT `PasswordFolder_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Password` ADD CONSTRAINT `Password_Folder_ID_fkey` FOREIGN KEY (`Folder_ID`) REFERENCES `PasswordFolder`(`Folder_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Password` ADD CONSTRAINT `Password_User_ID_fkey` FOREIGN KEY (`User_ID`) REFERENCES `User`(`User_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
