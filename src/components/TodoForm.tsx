import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlices/TodoSlice";

type FormData = {
  id?: string | number | null | undefined;
  todoText: string;
  category: string;
  date: string;
};
// interface FormData extends TodoItem {}

const validationSchema = yup.object().shape({
  todoText: yup.string().required("Todo text is required"),
  category: yup.string().required("Category is required"),
  date: yup.string().required("Date is required"),
});

const TodoForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { todoText, category, date } = data;
    dispatch(addTodo({ todoText, category, date }));
    try {
      await validationSchema.validate(data);
      reset();
      console.log(data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 p-8 h-1/3 w-fit shadow-2xl"
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
