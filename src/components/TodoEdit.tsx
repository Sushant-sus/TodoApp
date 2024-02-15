import React, { useState } from "react";

type Todo = {
  id: string | number | null | undefined;
  todoText: string | null | undefined;
  category: string | null | undefined;
  completed: boolean | null | undefined;
  date: string | null | undefined;
};

type TodoEditProps = {
  todo: Todo | null;
  onSave: (todo: Todo) => void;
  onClose: () => void;
};

const TodoEdit: React.FC<TodoEditProps> = ({ todo, onSave, onClose }) => {
  const [editedTodo, setEditedTodo] = useState<Todo | null>(todo);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTodo((prevTodo: any) => ({
      ...(prevTodo || {}),
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedTodo) {
      onSave(editedTodo);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!todo) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center  bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div className="flex flex-row bg-white p-4 rounded-lg gap-8">
        <div className="flex font-bold text-2xl ">
          <h2>Edit</h2>
        </div>
        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <label className="flex gap-4 text-xl">
            Todo Text:
            <input
              type="text"
              name="todoText"
              value={editedTodo?.todoText || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex gap-4 text-xl">
            Category:
            <input
              type="text"
              name="category"
              value={editedTodo?.category || ""}
              onChange={handleInputChange}
            />
          </label>
          <label className="flex gap-4 text-xl">
            Due Date:
            <input
              type="date"
              name="date"
              value={editedTodo?.date || ""}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex gap-2 w-fit">
            <button
              className="text-md bg-red-500 rounded-lg p-1 hover:bg-red-600 gap-4"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="text-md bg-red-500 rounded-lg p-1 hover:bg-red-600"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEdit;
