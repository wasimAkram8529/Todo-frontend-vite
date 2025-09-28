import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api";

const EditTask = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [taskId, setTaskId] = useState("");
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const {
          data: { task },
        } = await api.get(`/tasks/${id}`);
        setTaskId(task._id);
        setName(task.name);
        setCompleted(task.completed);
        setTempName(task.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { task },
      } = await api.patch(`/tasks/${id}`, { name, completed });
      setTaskId(task._id);
      setName(task.name);
      setCompleted(task.completed);
      setTempName(task.name);
      setAlert("Task updated successfully!");
    } catch (error) {
      console.error(error);
      setName(tempName);
      setAlert("Error updating task");
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(""), 3000);
    }
  };

  return (
    <div className="container">
      <form className="single-task-form" onSubmit={handleSubmit}>
        <h4>Edit Task</h4>
        <div className="form-control">
          <label>Task ID</label>
          <p className="task-edit-id">{taskId}</p>
        </div>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="task-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit" className="block btn task-edit-btn" disabled={loading}>
          {loading ? "Loading..." : "Edit"}
        </button>
        {alert && <div className="form-alert">{alert}</div>}
      </form>
      <Link to="/" className="btn back-link">
        Back to tasks
      </Link>
    </div>
  );
};

export default EditTask;
