import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      name: 'Ava Martinez',
      email: 'ava.martinez@merington.edu',
      age: 16,
      fitnessLevel: 'Intermediate',
      teamId: 'team-1',
    },
    {
      name: 'Noah Chen',
      email: 'noah.chen@merington.edu',
      age: 15,
      fitnessLevel: 'Beginner',
      teamId: 'team-2',
    },
    {
      name: 'Maya Patel',
      email: 'maya.patel@merington.edu',
      age: 17,
      fitnessLevel: 'Advanced',
      teamId: 'team-1',
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Rocket Runners',
      captain: 'Ava Martinez',
      points: 540,
      members: users.slice(0, 2).map((user) => user.name),
    },
    {
      name: 'Power Striders',
      captain: 'Noah Chen',
      points: 410,
      members: [users[1].name, users[2].name],
    },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      points: 140,
      notes: 'Morning jog around the track',
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      durationMinutes: 45,
      points: 95,
      notes: 'Bodyweight circuit after school',
    },
    {
      userId: users[2]._id.toString(),
      type: 'walk',
      durationMinutes: 60,
      points: 110,
      notes: 'After-dinner walk with teammates',
    },
  ]);

  await Leaderboard.insertMany([
    {
      userId: users[0]._id.toString(),
      teamId: teams[0]._id.toString(),
      points: 140,
      rank: 1,
    },
    {
      userId: users[2]._id.toString(),
      teamId: teams[0]._id.toString(),
      points: 110,
      rank: 2,
    },
    {
      userId: users[1]._id.toString(),
      teamId: teams[1]._id.toString(),
      points: 95,
      rank: 3,
    },
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Sprint Circuit',
      focus: 'Cardio',
      durationMinutes: 25,
      difficulty: 'Intermediate',
      equipment: ['cones', 'stopwatch'],
    },
    {
      title: 'Core and Mobility',
      focus: 'Recovery',
      durationMinutes: 20,
      difficulty: 'Beginner',
      equipment: ['mat'],
    },
    {
      title: 'Power Ladder Challenge',
      focus: 'Agility',
      durationMinutes: 30,
      difficulty: 'Advanced',
      equipment: ['ladder'],
    },
  ]);

  console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout plans.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
