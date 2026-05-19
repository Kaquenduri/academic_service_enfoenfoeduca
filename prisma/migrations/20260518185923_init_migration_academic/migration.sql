-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "academic_schema";

-- CreateEnum
CREATE TYPE "academic_schema"."TaskState" AS ENUM ('PENDING', 'SUBMITTED', 'GRADED');

-- CreateEnum
CREATE TYPE "academic_schema"."Grades" AS ENUM ('PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO');

-- CreateEnum
CREATE TYPE "academic_schema"."AttendanceState" AS ENUM ('PRESENT', 'ABSENT', 'EXCUSED');

-- CreateTable
CREATE TABLE "academic_schema"."AcademicPeriod" (
    "period_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicPeriod_pkey" PRIMARY KEY ("period_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Course" (
    "course_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "period_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Section" (
    "id_section" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_period" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "grade" "academic_schema"."Grades" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id_section")
);

-- CreateTable
CREATE TABLE "academic_schema"."Session" (
    "session_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "course_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Material" (
    "material_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "file_type" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("material_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Task" (
    "task_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."TaskSubmission" (
    "submission_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "task_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "file_url" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" DECIMAL(4,2),
    "comments" TEXT,
    "state" "academic_schema"."TaskState" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "TaskSubmission_pkey" PRIMARY KEY ("submission_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Attendance" (
    "attendance_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "session_id" UUID NOT NULL,
    "student_id" UUID NOT NULL,
    "status" "academic_schema"."AttendanceState" NOT NULL,
    "attended_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period_id" UUID NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "academic_schema"."Assignment" (
    "id_section" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "period_id" UUID NOT NULL,
    "teacher_id" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id_section","course_id","teacher_id","period_id")
);

-- AddForeignKey
ALTER TABLE "academic_schema"."Course" ADD CONSTRAINT "Course_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "academic_schema"."AcademicPeriod"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Section" ADD CONSTRAINT "Section_id_period_fkey" FOREIGN KEY ("id_period") REFERENCES "academic_schema"."AcademicPeriod"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Session" ADD CONSTRAINT "Session_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "academic_schema"."Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Material" ADD CONSTRAINT "Material_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "academic_schema"."Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Task" ADD CONSTRAINT "Task_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "academic_schema"."Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."TaskSubmission" ADD CONSTRAINT "TaskSubmission_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "academic_schema"."Task"("task_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Attendance" ADD CONSTRAINT "Attendance_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "academic_schema"."Session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Attendance" ADD CONSTRAINT "Attendance_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "academic_schema"."AcademicPeriod"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Assignment" ADD CONSTRAINT "Assignment_id_section_fkey" FOREIGN KEY ("id_section") REFERENCES "academic_schema"."Section"("id_section") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Assignment" ADD CONSTRAINT "Assignment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "academic_schema"."Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_schema"."Assignment" ADD CONSTRAINT "Assignment_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "academic_schema"."AcademicPeriod"("period_id") ON DELETE RESTRICT ON UPDATE CASCADE;
