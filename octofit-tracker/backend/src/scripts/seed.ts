import { connectDatabase, MONGODB_URI } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to ${MONGODB_URI}`);

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.create([
    { name: 'Ocean Spartans', coach: 'Avery Stone', members: 12 },
    { name: 'Sunrise Runners', coach: 'Maya Chen', members: 9 },
  ]);

  const users = await User.create([
    { name: 'Leah Rivera', email: 'leah.rivera@example.com', role: 'trainer', team: teams[0].name },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'athlete', team: teams[0].name },
    { name: 'Sofia Brooks', email: 'sofia.brooks@example.com', role: 'athlete', team: teams[1].name },
  ]);

  await Workout.create([
    { name: 'Power Core Circuit', focus: 'core', durationMinutes: 45, difficulty: 'intermediate', caloriesTarget: 420 },
    { name: 'Endurance Run', focus: 'cardio', durationMinutes: 60, difficulty: 'advanced', caloriesTarget: 650 },
    { name: 'Recovery Flow', focus: 'mobility', durationMinutes: 30, difficulty: 'easy', caloriesTarget: 210 },
  ]);

  await Activity.create([
    {
      user: users[0].name,
      team: teams[0].name,
      type: 'strength training',
      durationMinutes: 50,
      caloriesBurned: 540,
      date: new Date('2026-06-15T08:30:00Z'),
    },
    {
      user: users[1].name,
      team: teams[0].name,
      type: 'interval run',
      durationMinutes: 35,
      caloriesBurned: 420,
      date: new Date('2026-06-16T07:00:00Z'),
    },
    {
      user: users[2].name,
      team: teams[1].name,
      type: 'yoga recovery',
      durationMinutes: 40,
      caloriesBurned: 220,
      date: new Date('2026-06-16T18:00:00Z'),
    },
  ]);

  await Leaderboard.create([
    { name: users[0].name, category: 'weekly', score: 890, rank: 1 },
    { name: users[1].name, category: 'weekly', score: 820, rank: 2 },
    { name: users[2].name, category: 'weekly', score: 760, rank: 3 },
  ]);

  console.log('Seed data created for users, teams, activities, leaderboard, and workouts.');

  const [userCount, teamCount, activityCount, leaderboardCount, workoutCount] = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Leaderboard.countDocuments(),
    Workout.countDocuments(),
  ]);

  console.log(`Users: ${userCount}`);
  console.log(`Teams: ${teamCount}`);
  console.log(`Activities: ${activityCount}`);
  console.log(`Leaderboard entries: ${leaderboardCount}`);
  console.log(`Workouts: ${workoutCount}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
