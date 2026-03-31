import { describe, it, expect } from "vitest";
import { filterTodos, countActiveTodos } from "./filterTodos";
import { Todo } from "../types/todo";

const mockTodos: Todo[] = [
  { id: 1, text: "Купить молоко", completed: false },
  { id: 2, text: "Написать тесты", completed: true },
  { id: 3, text: "Настроить CI/CD", completed: false },
];

describe("filterTodos", () => {
  it('возвращает все задачи при фильтре "all"', () => {
    expect(filterTodos(mockTodos, "all")).toHaveLength(3);
  });

  it('возвращает только незавершённые при фильтре "active"', () => {
    const result = filterTodos(mockTodos, "active");
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('возвращает только завершённые при фильтре "completed"', () => {
    const result = filterTodos(mockTodos, "completed");
    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Написать тесты");
  });

  it("возвращает пустой массив если список пуст", () => {
    expect(filterTodos([], "all")).toHaveLength(0);
  });
});

describe("countActiveTodos", () => {
  it("считает незавершённые задачи", () => {
    expect(countActiveTodos(mockTodos)).toBe(2);
  });

  it("возвращает 0 если все задачи выполнены", () => {
    const allDone = mockTodos.map((t) => ({ ...t, completed: true }));
    expect(countActiveTodos(allDone)).toBe(0);
  });
});
