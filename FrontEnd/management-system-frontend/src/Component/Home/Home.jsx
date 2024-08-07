import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(null);
  const [taskData, setTaskData] = useState({
    task_name: "",
    task_description: "",
  });
  // سحب التاسك
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/taskdata",
        {
          withCredentials: true,
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  // اضافة تاسك
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/addtask",
        {
          Task_Name: title,
          Task_Description: description,
        },
        { withCredentials: true }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error(
        "Error adding task:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleUpdate = async (e) => {
    try {
      const { Task_Name, Task_Description } = taskData;

      const response = await axios.put(
        `http://localhost:3000/api/users/updatetask/${e}`,
        { Task_Name: title, Task_Description: description },
        { withCredentials: true }
      );
      fetchTasks();

    


    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  // حذف التاسك
  const handleDelete = async (task_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/deletetask/${task_id}`,
        {
          withCredentials: true,
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          إدارة المهام
        </h1>

        <form onSubmit={addTask} className="mb-8">
          <input
            type="text"
            placeholder="عنوان المهمة"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <textarea
            placeholder="وصف المهمة"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            إضافة مهمة
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
            >
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {task.Task_Name}
              </h2>
              <p className="mb-4 text-gray-600">{task.Task_Description}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(task.id)}
                  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition duration-200"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
