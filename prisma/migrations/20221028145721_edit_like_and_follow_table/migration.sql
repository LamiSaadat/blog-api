/*
  Warnings:

  - The `like` column on the `Like` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "follow" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "like",
ADD COLUMN     "like" BOOLEAN NOT NULL DEFAULT false;
