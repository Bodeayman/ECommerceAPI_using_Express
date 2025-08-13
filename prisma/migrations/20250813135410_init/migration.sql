/*
  Warnings:

  - You are about to drop the column `credit_card` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `credit_card`,
    ADD COLUMN `role` VARCHAR(255) NULL;
