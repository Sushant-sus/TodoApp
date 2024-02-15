import React, { useCallback, useState } from "react";
import { useTable, Column, HeaderGroup, Cell } from "react-table";
import { removeTodo, updateTodo } from "../redux/todoSlices/TodoSlice";
import { useDispatch } from "react-redux";
import TodoEdit from "./TodoEdit";

type TodoItem = {
  id: string | number | null | undefined;
  todoText: string | null | undefined;
  category: string | null | undefined;
  completed: boolean | null | undefined;
  date: string | null | undefined;
};

type TableProps = {
  items: TodoItem[];
};

const TodoList: React.FC<TableProps> = ({ items }) => {
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // const [openPopup, setOpenPopup] = useState(false);

  const handleEditClick = (todo: TodoItem) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  const handleUpdateTodo = useCallback(
    (updatedTodo: TodoItem) => {
      dispatch(updateTodo(updatedTodo));
    },
    [dispatch]
  );

  //remove function
  const handleRemove = useCallback(
    (id: string | number | null | undefined) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );
  const columns = React.useMemo<Column<TodoItem>[]>(
    () => [
      {
        Header: "S.No.",
        accessor: (row, rowIndex) => rowIndex + 1,
      },
      {
        Header: "TodoText",
        accessor: "todoText",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Due Date",
        accessor: "date",
        Cell: ({ value }: { value: string | null | undefined }) => {
          const remainingDays = calculateRemainingDays(value);
          return <span>{remainingDays} days remaining</span>;
        },
      },
      {
        Header: "Select",
        accessor: "completed",
        Cell: ({ row }: { row: any }) => {
          return (
            <input
              className="h-4 w-4"
              type="checkbox"
              checked={row.values.selected}
              readOnly
            />
          );
        },
      },
      //actions
      {
        Header: "Actions",
        Cell: ({ row }: { row: any }) => {
          const todo = row.original as TodoItem;
          return (
            <div className="flex justify-center gap-2">
              <button
                className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
                onClick={() => handleEditClick(todo)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                onClick={() => handleRemove(todo.id)}
              >
                Remove
              </button>
            </div>
          );
        },
      },
    ],
    [handleRemove]
  );

  const data = React.useMemo(() => items, [items]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Calculate remaining days for a given date
  const calculateRemainingDays = (date: string | null | undefined) => {
    if (!date) return "N/A";
    const today = new Date();
    const due = new Date(date);
    const differenceInTime = due.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <table
        className="border-collapse border border-gray-400 "
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<TodoItem>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="border border-gray-400 px-4 py-2"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: Cell<TodoItem>) => {
                  return (
                    <td
                      className="border border-gray-400 py-2 text-center"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {showEditModal && (
        <TodoEdit
          todo={selectedTodo}
          onSave={(updatedTodo) => {
            handleUpdateTodo(updatedTodo); // Update the todo in the list
            setShowEditModal(false); // Close the modal
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default TodoList;
