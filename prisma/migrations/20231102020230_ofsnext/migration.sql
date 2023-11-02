-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "semestre" TEXT NOT NULL,
    "annio" TEXT NOT NULL,
    "escuela" TEXT NOT NULL,
    "universidad" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id_script" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "script" TEXT NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id_script")
);
