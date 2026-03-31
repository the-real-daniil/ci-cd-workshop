import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`} data-testid="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Отметить "${todo.text}" как выполненное`}
      />
      <span className="todo-text">{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить задачу "${todo.text}"`}
        className="delete-btn"
      >
        ✕
      </button>
    </li>
  );
}
