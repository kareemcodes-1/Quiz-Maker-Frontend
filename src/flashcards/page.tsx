import Layout from "../layout";
// import { Badge } from "../components/ui/badge";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../components/ui/tooltip";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAllFlashCardsQuery } from "../slices/flashCardApiSlice";
import { allFlashCards, setOpenFlashCardAIModal } from "../slices/flashCardSlice";
import FlashCardAIModal from "../modal/flashcard-modal-ai";

const FlashCards = () => {
      const [openActions, setOpenActions] = useState<boolean>(false);
      const {flashcards} = useSelector((state: RootState) => state.flashcard);
      // const [createOr]
      const dispatch = useDispatch();

      const {data, isFetching} = useGetAllFlashCardsQuery('');

      useEffect(() => {
        if(data && !isFetching){
          dispatch(allFlashCards(data));
        }
      });

  return (
    <Layout>
      <div className="mt-[1.2rem]">
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full mb-[2rem]">
        <h1 className="lg:text-[3rem] text-[2.5rem]">Flashcards </h1>
        <div className="flex items-center gap-[.5rem]">
        <a href="/flashcards/new" className='dark:yena-btn yena-btn-black '><span className='lg:block hidden'>Create new</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>
        <button onClick={() => dispatch(setOpenFlashCardAIModal(true))} type="button" className="yena-btn-black dark:yena-btn">
          Create with AI ✨
        </button>
        </div>
      </div>

      {/* <FlashCards /> */}

      <div className="flex flex-col gap-[1rem]">
      {flashcards.map((flashcard) => (
        <div className="border relative w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem] lg:gap-[.5rem]">
        <div className="flex items-center justify-around gap-[.5rem] lg:gap-[1rem] w-full">
          <div>
            <h1 className={`text-[1.1rem] truncate`}>Front</h1>

            <div>
              <p className="text-[1.3rem]">
                {flashcard.frontContent}
              </p>
            </div>
          </div>

          <div className="h-[5rem] w-[1px] bg-muted-foreground"></div>

          <div>
            <h1 className={`text-[1rem] lg:text-[1.2rem] truncate`}>Back</h1>

            <div>
              <p className="text-[1.3rem]">
              {flashcard.backContent}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenu
          open={openActions}
          onOpenChange={(open) => setOpenActions(open)}
        >
          <DropdownMenuTrigger className=" absolute right-[.5rem] top-[.5rem]">
            <EllipsisHorizontalIcon
                onClick={() => setOpenActions(!openActions)}
              className="w-[2rem] h-[2rem] text-muted-foreground"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Recreate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      ))}
      </div>
      </div>


      <FlashCardAIModal closeModal={() => dispatch(setOpenFlashCardAIModal(false))} />
    </Layout>
  );
};

export default FlashCards;

// {/* <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem] w-full lg:w-auto">
// <div className="flex items-center gap-[.5rem] lg:gap-[1rem]">
//   <Badge className="text-muted-foreground">
//     {/* {renderTime(todo.time)} {displayDate()} */}
//   </Badge>
//   <TooltipProvider>
//     <Tooltip>
//       <TooltipTrigger>
//         <Badge className="flex items-center gap-[.3rem] text-muted-foreground">
//           {/* {todo.projectId?.emoji && (
//             <div className="truncate">{todo.projectId?.emoji}</div>
//           )}
//           <div className="truncate">
//             {todo.projectId?.name || "No Project"}
//           </div> */}
//         </Badge>
//       </TooltipTrigger>
//       <TooltipContent>
//         {/* <p>{todo.projectId?.name || "No Project"}</p> */}
//       </TooltipContent>
//     </Tooltip>
//   </TooltipProvider>
// </div>

// <DropdownMenu
// //   open={openActions}
// //   onOpenChange={(open) => setOpenActions(open)}
// >
//   <DropdownMenuTrigger className="lg:static absolute right-[.5rem] top-[.5rem]">
//     <EllipsisHorizontalIcon
//     //   onClick={() => setOpenActions(!openActions)}
//       className="w-[2rem] h-[2rem] text-muted-foreground"
//     />
//   </DropdownMenuTrigger>
//   <DropdownMenuContent>
//     <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
//     <DropdownMenuItem className="cursor-pointer">Delete</DropdownMenuItem>
//     <DropdownMenuItem className="cursor-pointer">Recreate</DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>

// </div> */}
