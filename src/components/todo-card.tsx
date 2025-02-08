import { Todo } from "../../types/type";
import { Badge } from "../components/ui/badge";
import {
  addTodo,
  deleteTodos,
  editTodo,
  handleTodosFilter,
  updateTodos,
} from "../../src/slices/todoSlice";
import { useDispatch } from "react-redux";
import {
  useCompleteTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from "../../src/slices/todoApiSlice";
import toast from "react-hot-toast";
import JSConfetti from "js-confetti";
import { addDays, format, isSameDay } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const jsConfetti = new JSConfetti();

const TodoCard = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const [deleteTodo] = useDeleteTodoMutation();
  const [completeTodo] = useCompleteTodoMutation();
  const [createTodo] = useCreateTodoMutation();
  const [openActions, setOpenActions] = useState<boolean>(false);

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

  const renderTime = (time: string) => {
    if (time === "morning") {
      return "🌤️";
    } else if (time === "afternoon") {
      return "🌇";
    } else if (time === "night") {
      return "🌆";
    } else {
      return "";
    }
  };

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id).unwrap(); // Use `.unwrap()` to handle potential RTK Query errors
      dispatch(deleteTodos(id));
      toast.success("Deleted Todo");
      dispatch(handleTodosFilter("today"));
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete Todo");
    }
  }

  async function completedTodo(id: string) {
    try {
      const res = await completeTodo({ id, data: !todo.completed }).unwrap();
      if (res) {
        dispatch(updateTodos(res));
        if (res.completed) {
          toast.success("Todo completed");
          jsConfetti.addConfetti();
        }
        dispatch(handleTodosFilter("today"));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function markTodoTomorrow(todo: Todo) {
    if (todo.date) {
      try {
        const data = {
          ...todo,
          id: "",
          completed: false,
          date: new Date(
            new Date().setDate(new Date().getDate() + 1)
          ).toISOString(),
        };
        const res = await createTodo(data).unwrap();
        if (res) {
          dispatch(addTodo(res));
          toast.success("Created Todo");
          dispatch(handleTodosFilter("today"));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="border relative w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem] lg:gap-[.5rem]">
      <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
        {todo.completed ? (
          <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative">
              <input
                defaultChecked
                onClick={() => completedTodo(todo._id)}
                type="checkbox"
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border  checked:bg-green-600 checked:border-green-600"
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
                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border  checked:bg-green-600 checked:border-green-600"
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
        <h1
          className={`text-[1rem] lg:text-[1.2rem] truncate ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.name}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem] w-full lg:w-auto">
        <div className="flex items-center gap-[.5rem] lg:gap-[1rem]">
          <Badge className="text-muted-foreground">
            {renderTime(todo.time)} {displayDate()}
          </Badge>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge className="flex items-center gap-[.3rem] text-muted-foreground">
                  {todo.projectId?.emoji && (
                    <div className="truncate">{todo.projectId?.emoji}</div>
                  )}
                  <div className="truncate">
                    {todo.projectId?.name || "No Project"}
                  </div>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{todo.projectId?.name || "No Project"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DropdownMenu
          open={openActions}
          onOpenChange={(open) => setOpenActions(open)}
        >
          <DropdownMenuTrigger className="lg:static absolute right-[.5rem] top-[.5rem]">
            <EllipsisHorizontalIcon
              onClick={() => setOpenActions(!openActions)}
              className="w-[2rem] h-[2rem] text-muted-foreground"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => dispatch(editTodo(todo))} className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteTodo(todo._id)} className="cursor-pointer">Delete</DropdownMenuItem>
            <DropdownMenuItem onClick={() => markTodoTomorrow(todo)} className="cursor-pointer">Recreate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </div>
  );
};

export default TodoCard;
