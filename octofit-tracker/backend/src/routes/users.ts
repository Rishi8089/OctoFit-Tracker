import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const users = await User.find().lean();
    res.json({ resource: 'users', items: users });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load users', detail: error });
  }
});

export default router;
