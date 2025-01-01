import React from "react";
import { Todo } from "../../types/type";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { completeATodo, deleteTodos, editTodo } from "../../src/slices/todoSlice";
import { useDispatch } from "react-redux";
import { useCompleteTodoMutation, useDeleteTodoMutation } from "../../src/slices/todoApiSlice";
import toast from "react-hot-toast";
import JSConfetti from 'js-confetti'
import { addDays, format, isSameDay } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"



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

      return format(todoDate, "yyyy-MM-dd");
    }

    return "";
  };

  async function handleDeleteTodo(id: string) {
    try {
      await deleteTodo(id);
      dispatch(deleteTodos(id));
      toast.success("Deleted Todo");
    } catch (error) {
      console.log(error);
    }
  }

  async function completedTodo(id: string){
    try {
      const data = {
        ...todo,
        completed: !todo.completed,
      }

      const res = await completeTodo({id, data});
      console.log(res.data);
      if(res.data){
        if(res.data.completed){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti()
          toast.success("Completed Todo");
        }
        dispatch(completeATodo(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="border w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem] lg:gap-[.5rem]">
  <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
    {todo.completed ? (
      <input
        onClick={() => completedTodo(todo._id)}
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-success !border-gray-400 !text-white lg:w-[1.5rem] w-[1.2rem] lg:h-[1.5rem] h-[1.2rem]"
      />
    ) : (
      <input
        onClick={() => completedTodo(todo._id)}
        type="checkbox"
        className="checkbox checkbox-success !border-gray-400 !text-white lg:w-[1.5rem] w-[1.2rem] lg:h-[1.5rem] h-[1.2rem]"
      />
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
              <div
                style={{ background: todo.projectId.color }}
                className="rounded-full w-[.8rem] h-[.8rem]"
              />
              <div className="hidden lg:block truncate">{todo.projectId.name}</div>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>{todo.projectId.name}</p>
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
        <Trash className="w-[1rem] lg:w-[1.4rem]" />
      </button>
    </div>
  </div>
</div>

  );
};

export default TodoCard;
