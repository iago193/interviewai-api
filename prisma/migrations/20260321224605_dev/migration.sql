/*
  Warnings:

  - You are about to drop the `employee_balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `holidays` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `punch_photos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_sheet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee_balance" DROP CONSTRAINT "employee_balance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "punch_photos" DROP CONSTRAINT "punch_photos_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "punch_photos" DROP CONSTRAINT "punch_photos_time_sheet_id_fkey";

-- DropForeignKey
ALTER TABLE "time_balance" DROP CONSTRAINT "time_balance_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "time_sheet" DROP CONSTRAINT "time_sheet_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "work_schedule" DROP CONSTRAINT "work_schedule_employee_id_fkey";

-- DropTable
DROP TABLE "employee_balance";

-- DropTable
DROP TABLE "employees";

-- DropTable
DROP TABLE "holidays";

-- DropTable
DROP TABLE "punch_photos";

-- DropTable
DROP TABLE "time_balance";

-- DropTable
DROP TABLE "time_sheet";

-- DropTable
DROP TABLE "work_schedule";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "loggedinemail" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");
