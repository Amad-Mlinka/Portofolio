/*
  Warnings:

  - You are about to drop the column `duration` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "duration",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TEXT NOT NULL;
