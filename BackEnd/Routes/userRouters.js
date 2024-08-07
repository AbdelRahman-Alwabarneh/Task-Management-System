const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const userTask = require('../Controllers/userTask');
const auth = require('../middlewares/auth');

router.post('/signup', userController.register);
router.post('/login', userController.login);
router.post('/addtask', auth,userTask.addTask);
router.get("/taskdata", auth,userTask.getTasks);
router.put("/updatetask/:id", auth, userTask.updateTask);
router.delete("/deletetask/:id", auth,userTask.deleteTask);
module.exports = router;