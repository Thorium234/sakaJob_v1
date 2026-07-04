import prisma from '../lib/prisma';

export async function createNotification(
  userId: string,
  title: string,
  body: string,
  type?: string,
  data?: Record<string, unknown>
) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      body,
      type,
      data: data ? JSON.stringify(data) : null,
    },
  });
}

export async function getUnreadCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}
