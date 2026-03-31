import { useState } from "react";
import { Todo, FilterType } from "./types/todo";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { FilterButtons } from "./components/FilterButtons";
import { filterTodos, countActiveTodos } from "./utils/filterTodos";
import "./App.css";

const INITIAL_TODOS: Todo[] = [
  { id: 1, text: "Изучить GitHub Actions", completed: false },
  { id: 2, text: "Создать первый workflow", completed: false },
  { id: 3, text: "Настроить CI пайплайн", completed: false },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [filter, setFilter] = useState<FilterType>("all");

  const handleAdd = (text: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const visibleTodos = filterTodos(todos, filter);
  const activeCount = countActiveTodos(todos);

  return (
    <div className="app">
      <h1 className="title">📋 Todo List</h1>
      <p className="subtitle">Воркшоп по CI/CD — GitHub Actions</p>
      <div className="card">
        <AddTodoForm onAdd={handleAdd} />
        <FilterButtons
          current={filter}
          onChange={setFilter}
          activeCounts={activeCount}
        />
        <TodoList
          todos={visibleTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
