-- CreateTable
CREATE TABLE "Eval" (
    "id_eval" SERIAL NOT NULL,
    "script_id" INTEGER NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "Eval_pkey" PRIMARY KEY ("id_eval")
);
