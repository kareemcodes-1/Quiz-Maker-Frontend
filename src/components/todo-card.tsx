import { Todo } from "../../types/type";
import { Pencil } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { completeATodo, deleteTodos, editTodo } from "../../src/slices/todoSlice";
import { useDispatch } from "react-redux";
import { useCompleteTodoMutation, useDeleteTodoMutation } from "../../src/slices/todoApiSlice";
import toast from "react-hot-toast";
import JSConfetti from "js-confetti";
import { addDays, format, isSameDay } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { TrashIcon } from "@heroicons/react/24/outline";

const jsConfetti = new JSConfetti();

const TodoCard = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();

  const displayDate = () => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    if (todo.date) {
      const todoDate = new Date(todo.date);

      if (isSameDay(todoDate, today)) {
        return "Today";
      }

      if (isSameDay(todoDate, tomorrow)) {
        return "Tomorrow";
      }

      return format(todoDate, "dd-MM-yyyy");
    }

    return "";
  };

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id).unwrap(); // Use `.unwrap()` to handle potential RTK Query errors
      dispatch(deleteTodos(id));
      toast.success("Deleted Todo");
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete Todo");
    }
  }

  async function completedTodo(id: string) {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };

      const res = await completeTodo({ id, data: updatedTodo }).unwrap();
      if (res.completed) {
        jsConfetti.addConfetti();
        toast.success("Completed Todo");
      }

      dispatch(completeATodo(res));
    } catch (error) {
      console.error("Failed to complete todo:", error);
      toast.error("Failed to mark Todo as completed");
    }
  }

  return (
    <div className="border w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem] lg:gap-[.5rem]">
      <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
        {todo.completed ? (
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                onClick={() => completedTodo(todo._id)}
                type="checkbox"
                defaultChecked
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        ) : (
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                onClick={() => completedTodo(todo._id)}
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        )}
        <h1 className="text-[1rem] lg:text-[1.2rem] truncate">{todo.name}</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem] w-full lg:w-auto">
        <div className="flex items-center gap-[.5rem] lg:gap-[1rem]">
          <Badge>{displayDate()}</Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="flex items-center gap-[.3rem]">
                  {todo.projectId?.color && (
                    <div
                      style={{ background: todo.projectId.color }}
                      className="rounded-full w-[.5rem] h-[.5rem]"
                    />
                  )}
                  <div className="truncate">{todo.projectId?.name || "No Project"}</div>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{todo.projectId?.name || "No Project"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-[.5rem] lg:gap-[1rem]">
          <button
            type="button"
            onClick={() => dispatch(editTodo(todo))}
            className="text-gray-500"
          >
            <Pencil className="w-[1rem] lg:w-[1.4rem]" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteTodo(todo._id)}
            className="text-red-500"
          >
            <TrashIcon className="w-[1rem] lg:w-[1.4rem]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
