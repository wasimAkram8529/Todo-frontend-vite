import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import TaskItem from "../components/TaskItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      // console.log("Data", data)
      setTasks(data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { name });
      setName("");
      setAlert("Task added successfully!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      setAlert("Error adding task");
    }
    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <div className="container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h4>Task Manager</h4>
        {alert && <div className="form-alert">{alert}</div>}
        <div className="form-control">
          <input
            type="text"
            className="task-input"
            placeholder="e.g. learn React"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn submit-btn">
            Submit
          </button>
        </div>
      </form>

      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p>No tasks yet...</p>
        ) : (
          <div className="tasks">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
