import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import { Todo } from "../types/todo";

const mockTodo: Todo = { id: 1, text: "Тестовая задача", completed: false };

describe("TodoItem", () => {
  it("отображает текст задачи", () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Тестовая задача")).toBeInTheDocument();
  });

  it("вызывает onToggle при клике на чекбокс", () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("вызывает onDelete при клике на кнопку удаления", () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("добавляет класс completed для выполненных задач", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />,
    );
    expect(screen.getByTestId("todo-item")).toHaveClass("completed");
  });
});
