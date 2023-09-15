const Habit = require('../model/Habit');
const getAllHabit = async(req, res)=>{
    const habits = await Habit.find();
    res.render('habits',{habits});
}

const getHabitDetails = async(req, res)=>{
    try {
        const habit = await Habit.findById(req.params.id);
        res.render('habit', { habit });
      } catch (error) {
        console.error(error);
      }
}

//Add a New Habit COntroller
const addHabit = async(req, res)=>{
    const {name} = req.body;
    const newHabit = new Habit({name});
    await newHabit.save();
    res.redirect('/habits');
}

const updateHabitStatus = async (req, res) => {
    const { status } = req.body;
  
    // Function to calculate the current streak
    function calculateStreak(dailyStatus) {
      let currentStreak = 0;
      let longestStreak = 0;
  
      // Iterate over the dailyStatus entries in reverse order (from latest to earliest)
      for (let i = dailyStatus.length - 1; i >= 0; i--) {
        const entry = dailyStatus[i];
  
        if (entry.status === 'Done') {
          currentStreak++;
        } else {
          // If status is not 'Done', the streak is broken
          break;
        }
  
        // Update the longest streak if needed
        longestStreak = Math.max(longestStreak, currentStreak);
      }
  
      return longestStreak;
    }
  
    try {
      const habit = await Habit.findById(req.params.id);
      if (!habit) {
        return res.status(404).send('Habit not found');
      }
  
      const today = new Date().toDateString();
  
      // Find or create a history entry for today
      const existingEntry = habit.history.find(entry => entry.date.toDateString() === today);
  
      if (existingEntry) {
        existingEntry.status = status;
      } else {
        habit.history.push({ date: new Date(), status });
      }
  
      // Find or create a daily status entry for today
      const dailyStatusEntryIndex = habit.dailyStatus.findIndex(entry => entry.date.toDateString() === today);
      if (dailyStatusEntryIndex !== -1) {
        // If an entry for today exists, update it
        habit.dailyStatus[dailyStatusEntryIndex].status = status;
      } else {
        // If no entry for today exists, create a new one
        habit.dailyStatus.push({ date: new Date(), status });
      }
  
      // Calculate the current streak
      const streak = calculateStreak(habit.dailyStatus);
  
      // Update the longest streak and total days
      habit.longestStreak = streak;
      habit.totalDays = habit.history.length;
  
      await habit.save();
      res.redirect(`/habit/${habit._id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  
  

module.exports = {
    getAllHabit,
    getHabitDetails,
    addHabit,
    updateHabitStatus,
}