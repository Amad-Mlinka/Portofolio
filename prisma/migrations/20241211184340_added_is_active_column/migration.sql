-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "ExperienceType" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
