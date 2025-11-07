import { formatDate } from "../utils/formatDate.js"

export const TaskItem = ({ task, onDelete, onToggle }) => (
  <li
    className={`flex items-center justify-between p-2 rounded-md mb-2 ${task.completed ? "bg-gray-700 line-through text-gray-400" : "bg-gray-800 text-gray-200"
      }`}
  >
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)}
        className="w-4 h-4 accent-blue-500"
      />
      <span>{task.text}</span>
    </div>
    <div className="flex items-center gap-4 text-sm">
      <span className="text-gray-400">{formatDate(task.createdAt)}</span>
      <button
        onClick={() => onDelete(task._id)}
        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
      >
        Eliminar
      </button>
    </div>
  </li>
)