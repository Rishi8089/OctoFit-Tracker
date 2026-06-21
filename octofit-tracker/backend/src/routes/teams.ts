import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const teams = await Team.find().lean();
    res.json({ resource: 'teams', items: teams });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load teams', detail: error });
  }
});

export default router;
