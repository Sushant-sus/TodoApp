import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  // const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

  const todos = useSelector((state: RootState) => state.todos.todo);

  console.log(todos, "todos");
  return (
    <div className="flex flex-col items-center gap-4 p-4 h-screen w-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
      <TodoForm />
      <TodoList items={todos} />
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import TodoForm from "./components/TodoForm";
// import TodoList, { TodoItem } from "./components/TodoList";

// const App: React.FC = () => {
//   const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

//   const addTodoItem = (newItem: TodoItem) => {
//     newItem.id = generateUniqueId();
//     setTodoItems([...todoItems, newItem]);
//   };
//   const removeTodoItem = (id: string) => {
//     setTodoItems(todoItems.filter((item) => item.id !== id)); //filters and checks if the provided id matchest the items id in an array one by one and if it matches then remvoes and if not then keeps
//   };

//   const generateUniqueId = (): string => {
//     return Math.random().toString(36).substring(7);
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 p-4 h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
//       <TodoForm addTodoItem={addTodoItem} />
//       <TodoList items={todoItems} onRemoveItem={removeTodoItem} />
//     </div>
//   );
// };

// export default App;
