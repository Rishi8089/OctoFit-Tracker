import { Router } from 'express';
import Leaderboard from '../models/leaderboard';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({ resource: 'leaderboard', items: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load leaderboard', detail: error });
  }
});

export default router;
