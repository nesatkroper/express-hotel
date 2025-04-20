-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "authId" UUID,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_authId_fkey" FOREIGN KEY ("authId") REFERENCES "Auth"("authId") ON DELETE SET NULL ON UPDATE CASCADE;
