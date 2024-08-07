require('dotenv').config();
const db = require("../Config/Databasetasksystem");

exports.addTask = async (req, res) => {
    try {
        const {Task_Name, Task_Description} = req.body;
        const User_id = BigInt(req.user.id);

        const NewTask = await db.query(
            'INSERT INTO "Tasks"("Task_Name", "Task_Description", "User_id", "Deleted") VALUES($1, $2, $3, $4)',
            [Task_Name, Task_Description, User_id, false]
          );
          res.status(201).json(NewTask.rows[0]);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}


//عرض الداتا
exports.getTasks = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM "Tasks" WHERE "User_id" = $1 AND "Deleted" = false', [
        req.user.id,
      ]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { Task_Name, Task_Description } = req.body;
  
      console.log('Update request:', { id, Task_Name, Task_Description });
  
      // استخدم RETURNING * للحصول على السجل المحدث
      const result = await db.query(
        'UPDATE "Tasks" SET "Task_Name" = $1, "Task_Description" = $2 WHERE id = $3 AND "User_id" = $4 RETURNING *',
        [Task_Name, Task_Description, id, req.user.id]
      );
  
      console.log('Update result:', result.rows);
  
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: error.message });
    }
  };
  

//حذف التاسك
exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await db.query(
        'UPDATE "Tasks" SET "Deleted" = true WHERE id = $1 AND "User_id" = $2',
        [id, req.user.id]
      );
      if (result.rowCount > 0) {
        res.send({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ error: "Task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

