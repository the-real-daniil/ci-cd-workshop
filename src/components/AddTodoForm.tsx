import { useState } from "react";

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу..."
        className="add-input"
        aria-label="Новая задача"
      />
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        Добавить
      </button>
    </form>
  );
}
