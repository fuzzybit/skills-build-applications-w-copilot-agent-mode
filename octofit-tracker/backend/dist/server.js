"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || '8000');
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
};
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiUrl: getApiBaseUrl(), port: PORT });
});
app.get('/api/users/', async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json(users);
});
app.post('/api/users/', async (req, res) => {
    const user = await user_1.User.create(req.body);
    res.status(201).json(user);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json(teams);
});
app.post('/api/teams/', async (req, res) => {
    const team = await team_1.Team.create(req.body);
    res.status(201).json(team);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json(activities);
});
app.post('/api/activities/', async (req, res) => {
    const activity = await activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.Leaderboard.find({}).sort({ points: -1 }).lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(workouts);
});
app.post('/api/workouts/', async (req, res) => {
    const workout = await workout_1.Workout.create(req.body);
    res.status(201).json(workout);
});
app.get('/', (_req, res) => {
    res.json({
        message: 'Octofit Tracker backend is running',
        apiBaseUrl: getApiBaseUrl(),
    });
});
async function startServer() {
    try {
        await (0, database_1.connectDatabase)();
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing with in-memory routes:', error);
    }
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Octofit backend listening on port ${PORT}`);
        console.log(`API base URL: ${getApiBaseUrl()}`);
    });
}
if (require.main === module) {
    startServer();
}
