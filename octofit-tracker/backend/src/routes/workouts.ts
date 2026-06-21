import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json({ resource: 'workouts', items: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to load workouts', detail: error });
  }
});

export default router;
