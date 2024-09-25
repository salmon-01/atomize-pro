const express = require('express');
const router = express.Router();
const { saveGoals, saveTab, insertListPos, deleteListPos, getAllTabs, getAllGoals, deleteTab, deleteGoal, updateGoalStatus } = require('./controllers.js');

router.post('/storedgoals', saveGoals)
router.get('/storedgoals', getAllGoals);
router.delete('/storedgoals', deleteGoal);

router.post('/storedgoals/status', updateGoalStatus)

router.post('/tabs', saveTab)
router.post('/tabs/position', insertListPos)

router.get('/tabs', getAllTabs);

router.delete('/tabs/:tabName', deleteTab);
router.delete('/tabs/:tabName/position/:listName', deleteListPos)


module.exports = router;