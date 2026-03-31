import { Todo, FilterType } from "../types/todo";

/**
 * Фильтрует список задач по статусу.
 * Эта чистая функция — основной объект для unit-тестов в воркшопе.
 */
export function filterTodos(todos: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    case "all":
    default:
      return todos;
  }
}

/**
 * Считает количество незавершённых задач.
 */
export function countActiveTodos(todos: Todo[]): number {
  return todos.filter((todo) => !todo.completed).length;
}
