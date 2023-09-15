const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  history: [
    {
      date: Date,
      status: String,
    },
  ],
  dailyStatus: [
    {
      date: Date,
      status: String,
    },
  ],
  longestStreak: Number,
  totalDays: Number,
  createdAt: Date,
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
