"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    teamId: { type: String },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
