"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const team_1 = require("../models/team");
const user_1 = require("../models/user");
const workout_1 = require("../models/workout");
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URI);
    await Promise.all([
        user_1.User.deleteMany({}),
        team_1.Team.deleteMany({}),
        activity_1.Activity.deleteMany({}),
        leaderboard_1.Leaderboard.deleteMany({}),
        workout_1.Workout.deleteMany({}),
    ]);
    const users = await user_1.User.insertMany([
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
    const teams = await team_1.Team.insertMany([
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
    const activities = await activity_1.Activity.insertMany([
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
    await leaderboard_1.Leaderboard.insertMany([
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
    await workout_1.Workout.insertMany([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed script failed:', error);
    process.exit(1);
});
