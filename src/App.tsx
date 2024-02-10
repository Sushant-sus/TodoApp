import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList, { TodoItem } from "./components/TodoList";

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const addTodoItem = (newItem: TodoItem) => {
    newItem.id = generateUniqueId();
    setTodoItems([...todoItems, newItem]);
  };
  const removeTodoItem = (id: string) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };

  const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      <TodoForm addTodoItem={addTodoItem} />
      <TodoList items={todoItems} onRemoveItem={removeTodoItem} />
    </div>
  );
};

export default App;
