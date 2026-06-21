import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const activities = await Activity.find().lean();
    res.json({ resource: 'activities', items: activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load activities', detail: error });
  }
});

export default router;
