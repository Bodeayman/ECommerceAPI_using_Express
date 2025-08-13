/*
  Warnings:

  - You are about to drop the column `image_url` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `refund` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `image_url`,
    DROP COLUMN `refund`,
    DROP COLUMN `stock`;
