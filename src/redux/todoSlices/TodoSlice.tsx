import { createSlice } from "@reduxjs/toolkit";

type Todo = {
  id: string | number | null | undefined;
  todoText: string | null | undefined;
  category: string | null | undefined;
  completed: boolean | null | undefined;
  date: string | null | undefined;
};

type TodoList = {
  todo: Todo[];
};
// const todoList: TodoList = {
//   todo: [],
// };
const initialState: TodoList = {
  todo: [],
};
const todoSlice = createSlice({
  name: "TodoSlice",
  //   initialState: todoList
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { todoText, category, date, completed } = action.payload;
      const newTodo: Todo = {
        id: state.todo.length + 1,
        todoText: todoText,
        category: category,
        date: date,
        completed: completed,
      };
      state.todo.push(newTodo);
    },
    removeTodo: (state, action) => {
      state.todo = state.todo.filter((todo) => todo.id !== action.payload);
    },
  },
});
export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
