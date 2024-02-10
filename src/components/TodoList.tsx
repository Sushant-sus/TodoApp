import React from "react";

export interface TodoItem {
  id: string | number;
  todoText: string;
  category: string;
  date: string;
}

interface TodoListProps {
  items: TodoItem[];
  onRemoveItem: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onRemoveItem }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {items.map((item) => (
        <div key={item.id} className="flex justify-center w-full gap-1">
          <div className="flex bg-pink-200 w-1/3 items-center justify-center rounded-lg">
            {item.todoText}
          </div>
          <div className="flex justify-center items-center bg-pink-200 w-1/3 rounded-lg">
            {item.category}
          </div>
          <div className="flex justify-center items-center bg-pink-200 rounded-lg p-2">
            {item.date}
          </div>
          <button
            className="bg-red-500 p-2 hover:bg-red-600 rounded-xl"
            onClick={() => onRemoveItem(String(item.id))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
