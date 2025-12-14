import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 📥 Load tasks
  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create task
  const handleCreate = async () => {
    if (!title.trim()) return alert("Title required");

    await createTask({
      title,
      description,
      status: "pending",
    });

    setTitle("");
    setDescription("");
    loadTasks();
  };

  // 🔁 Toggle status
  const toggleStatus = async (task: Task) => {
    await updateTask(task.id, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    loadTasks();
  };

  // ❌ Delete task
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-clip-content bg-gradient-to-r from-blue-700 to-teal-700  ">
      <header className="bg-white shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Task Forage
          </h1>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white p-6  shadow mb-6 rounded-lg border-gray-200">
          <h2 className="text-lg font-semibold mb-4">
            Add New Task
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="border rounded px-3 py-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border rounded px-3 py-2"
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 rounded-md"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* 📋 Task List */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            Your Tasks
          </h2>

          {loading && (
            <p className="text-gray-500">Loading tasks…</p>
          )}

          {!loading && tasks.length === 0 && (
            <p className="text-gray-500">
              No tasks yet. Add your first task 🚀
            </p>
          )}

          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between border rounded p-4"
              >
                <div>
                  <h3 className="font-semibold">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>

                  <button
                    onClick={() => toggleStatus(task)}
                    className="text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task.id)
                    }
                    className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
