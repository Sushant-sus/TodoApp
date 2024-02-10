import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  id: string;
  todoText: string;
  category: string;
  date: string;
}

interface TodoFormProps {
  addTodoItem: (newItem: FormData) => void; // Define the prop type for addTodoItem
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodoItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    addTodoItem(data); // Call addTodoItem with the form data
    reset();
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 p-8 h-1/3 w-fit shadow-xl"
    >
      <textarea
        {...register("todoText")}
        placeholder="Enter todo"
        className="border border-gray-300 rounded-md p-2 w-80 resize-y overflow-y-auto"
      />
      {errors.todoText && <span>This field is required</span>}
      <input
        type="text"
        {...register("category", { required: true })}
        placeholder="Enter Category"
        className="border border-gray-300 rounded-md p-2 w-50 h-10"
      />
      {errors.category && <span>This field is required</span>}
      <input
        type="date"
        {...register("date", { required: true })}
        placeholder="Select Date"
        className="border border-gray-300 rounded-md p-2 w-50 h-10"
      />
      {errors.date && <span>This field is required</span>}
      <button
        type="submit"
        className="bg-pink-500 text-white rounded-xl p-2 hover:bg-pink-400 w-50 h-10"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
