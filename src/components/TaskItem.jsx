import { Link } from "react-router-dom";
import api from "../api";

const TaskItem = ({ task, fetchTasks }) => {
  const { _id, name, completed } = task;

  // Delete task
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${_id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`single-task ${completed ? "task-completed" : ""}`}>
      <h5>
        <span>
          <i className="far fa-check-circle"></i>
        </span>
        {name}
      </h5>
      <div className="task-links">
        <Link to={`/edit?id=${_id}`} className="edit-link">
          <i className="fas fa-edit"></i>
        </Link>
        <button className="delete-btn" onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
