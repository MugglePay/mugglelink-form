-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "receive_wallet" TEXT NOT NULL,
    "payment_option" TEXT NOT NULL,
    "escrow_enabled" BOOLEAN NOT NULL,
    "require_full_name" BOOLEAN NOT NULL,
    "require_email" BOOLEAN NOT NULL,
    "require_phone_no" BOOLEAN NOT NULL,
    "email_receipt_to_buyer" BOOLEAN NOT NULL,
    "email_receipt_to_self" BOOLEAN NOT NULL
);
