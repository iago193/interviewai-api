-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "department" TEXT,
    "position" TEXT,
    "facial_data" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_sheet" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "entry_time" TIMESTAMP(3),
    "lunch_start" TIMESTAMP(3),
    "lunch_end" TIMESTAMP(3),
    "exit_time" TIMESTAMP(3),
    "entry_method" TEXT,
    "exit_method" TEXT,
    "expected_hours" DECIMAL(4,2),
    "worked_hours" DECIMAL(4,2),
    "status" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_sheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_balance" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "expected_hours" DECIMAL(5,2),
    "worked_hours" DECIMAL(5,2),
    "balance" DECIMAL(5,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_balance" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "total_balance" DECIMAL(6,2) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_schedule" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "entry_time" TIME NOT NULL,
    "lunch_start" TIME NOT NULL,
    "lunch_end" TIME NOT NULL,
    "exit_time" TIME NOT NULL,
    "workload_hours" DECIMAL(4,2) NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punch_photos" (
    "id" SERIAL NOT NULL,
    "time_sheet_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "photo_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "punch_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_cpf_key" ON "employees"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "time_sheet_employee_id_date_key" ON "time_sheet"("employee_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "time_balance_employee_id_date_key" ON "time_balance"("employee_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "employee_balance_employee_id_key" ON "employee_balance"("employee_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_schedule_employee_id_key" ON "work_schedule"("employee_id");

-- AddForeignKey
ALTER TABLE "time_sheet" ADD CONSTRAINT "time_sheet_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_balance" ADD CONSTRAINT "time_balance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_balance" ADD CONSTRAINT "employee_balance_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_schedule" ADD CONSTRAINT "work_schedule_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "punch_photos" ADD CONSTRAINT "punch_photos_time_sheet_id_fkey" FOREIGN KEY ("time_sheet_id") REFERENCES "time_sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "punch_photos" ADD CONSTRAINT "punch_photos_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
