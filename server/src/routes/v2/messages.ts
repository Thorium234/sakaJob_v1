import { Router, Response } from 'express';
import prisma from '../../lib/prisma';
import { messageSchema } from '../../validators';
import { authenticate, AuthRequest } from '../../middleware/auth';

const router = Router();

// GET /api/v2/messages/conversations/list — must be BEFORE /:userId
router.get('/conversations/list', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user!.userId },
          { receiverId: req.user!.userId },
        ],
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Group by the other user
    const conversationMap = new Map<string, { user: any; lastMessage: any; unread: number }>();
    for (const msg of messages) {
      const otherId = msg.senderId === req.user!.userId ? msg.receiverId : msg.senderId;
      const otherUser = msg.senderId === req.user!.userId ? msg.receiver : msg.sender;

      if (!conversationMap.has(otherId)) {
        conversationMap.set(otherId, {
          user: otherUser,
          lastMessage: msg,
          unread: (!msg.isRead && msg.receiverId === req.user!.userId) ? 1 : 0,
        });
      } else {
        const conv = conversationMap.get(otherId)!;
        if (!msg.isRead && msg.receiverId === req.user!.userId) {
          conv.unread++;
        }
      }
    }

    const conversations = Array.from(conversationMap.values());
    res.json({ conversations });
  } catch {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// GET /api/v2/messages/unread/count — must be BEFORE /:userId
router.get('/unread/count', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const count = await prisma.message.count({
      where: { receiverId: req.user!.userId, isRead: false },
    });
    res.json({ count });
  } catch {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
});

// POST /api/v2/messages
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const data = messageSchema.parse(req.body);
    const { receiverId } = req.body;

    if (!receiverId) return res.status(400).json({ error: 'receiverId is required' });

    const message = await prisma.message.create({
      data: {
        content: data.content,
        senderId: req.user!.userId,
        receiverId,
        jobId: data.jobId,
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });

    res.status(201).json({ message });
  } catch (error: any) {
    if (error?.issues) return res.status(400).json({ error: 'Validation failed', details: error.issues });
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// GET /api/v2/messages/:userId — must be AFTER /conversations/list and /unread/count
router.get('/:userId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user!.userId, receiverId: req.params.userId },
          { senderId: req.params.userId, receiverId: req.user!.userId },
        ],
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
        receiver: { select: { id: true, fullName: true, avatarUrl: true, role: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    // Mark as read
    await prisma.message.updateMany({
      where: { senderId: req.params.userId, receiverId: req.user!.userId, isRead: false },
      data: { isRead: true },
    });

    res.json({ messages });
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

export default router;
