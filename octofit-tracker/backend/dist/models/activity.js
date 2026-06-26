"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    points: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    notes: { type: String },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
