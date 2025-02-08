
import { Topic } from '../../types/type'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../components/ui/tooltip";
  import {
    EllipsisHorizontalIcon,
  } from "@heroicons/react/24/outline";
  import { useEffect, useState } from "react";
  import {
    DropdownMenu,
    DropdownMenuContent,
    // DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../components/ui/dropdown-menu";
  import { Badge } from "../components/ui/badge";
// import { useDispatch } from 'react-redux';
// import { RootState } from '../../store/store';
// import { useGetAllFlashCardsQuery } from '../slices/flashCardApiSlice';
// import { allFlashCards } from '../slices/flashCardSlice';
import { TbCards } from "react-icons/tb";
  

const TopicCard = ({ topic }: { topic: Topic, isLoading: boolean}) => {

    // const dispatch = useDispatch();
    // const [deleteTodo] = useDeleteTodoMutation();
    // const [completeTodo] = useCompleteTodoMutation();
    // const [createTodo] = useCreateTodoMutation();
    const [openActions, setOpenActions] = useState<boolean>(false);
    const [flashcardCount, setFlashcardCount] = useState<number | null>(null);

    useEffect(() => {
      const fetchFlashcardCount = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics/${topic._id}/flashcard-count`);
          const data = await response.json();
          setFlashcardCount(data.flashcardCount);
        } catch (error) {
          console.error("Error fetching flashcard count:", error);
        }
      };
  
      fetchFlashcardCount();
    }, [topic._id]);

  return (
    <div className="border relative w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem] lg:gap-[.5rem]">
    <a href={`/topics/topic/${topic._id}`} className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full">
      <h1
        className={`text-[1rem] lg:text-[1.2rem] truncate hover:underline`}
      >
        {topic.name}
      </h1>
    </a>



    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem] w-full lg:w-auto">
    <div className='flex items-center gap-[.5rem]'>
    <TbCards className='w-[1.2rem] h-[1.2rem]'/>
    <div className='text-[1.2rem]'>{flashcardCount}</div>
    </div>
      <div className="flex items-center gap-[.5rem] lg:gap-[1rem]">
        {/* <Badge className="text-muted-foreground">
          {renderTime(todo.time)} {displayDate()}
        </Badge> */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge className="flex items-center gap-[.3rem] text-muted-foreground">
                {topic.projectId?.emoji && (
                  <div className="truncate">{topic.projectId?.emoji}</div>
                )}
                <div className="truncate">
                  {topic.projectId?.name || "No Project"}
                </div>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{topic.projectId?.name || "No Project"}</p>
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
          {/* <DropdownMenuItem onClick={() => dispatch(editTopic(topic))} className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDeleteTodo(todo._id)} className="cursor-pointer">Delete</DropdownMenuItem>
          <DropdownMenuItem onClick={() => markTodoTomorrow(todo)} className="cursor-pointer">Recreate</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  </div>
  )
}

export default TopicCard