import { TaskItem } from "../components/TaskItem"

export const TaskList = ({ tasks, onDelete, onToggle }) => (
  <ul className="mt-4">
    {tasks.map((task) => (
      <TaskItem key={task._id} task={task} onDelete={onDelete} onToggle={onToggle} />
    ))}
  </ul>
)