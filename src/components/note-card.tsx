import { Note } from '../../types/type';
import { deleteNotes, findNote } from '../slices/noteSlice';
import { PresentationChartBarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";
import { useDispatch, } from "react-redux";
import { useNavigate } from "react-router";
import { useDeleteNoteMutation } from '../slices/noteApiSlice';
import toast from 'react-hot-toast';

const NoteCard = ({note} : {note: Note}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteNote] = useDeleteNoteMutation();

  async function handleDeleteNote(id: string) {
    try {
      await deleteNote(id);
      dispatch(deleteNotes(id));
      toast.success("Deleted Note");
    } catch (error) {
      console.log(error);
    }
  }

  const getPreviewText = (html: string, maxLength: number) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + '...'
      : textContent;
  };

  return (
    <button
    type="button"
    className="border transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer"
  >
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[1rem]">
      <div className="flex items-center gap-[1rem]">
        <PresentationChartBarIcon className="text-gray-500 lg:w-[1.5rem] w-[1.2rem]" />
        <div
            onClick={() => {
              dispatch(findNote(note._id));
              navigate(`/notes/edit/${note._id}`);
            }}
            className="hover:underline text-[.9rem] lg:text-[1rem] text-start"
          >
            {getPreviewText(note.content as string, 50)}
          </div>
      </div>
  
      <div className="flex items-center gap-[1rem]">
        <Badge className="flex items-center gap-[.3rem] text-muted-foreground">
        <div className="text-[.8rem]">{note.projectId.emoji}</div>{" "}
          <div className="text-[.8rem]">{note.projectId.name}</div>
        </Badge>
  
        <button
          type="button"
          onClick={() => handleDeleteNote(note._id)}
          className="flex items-center justify-center"
        >
          <TrashIcon className="lg:w-[1.5rem] w-[1.2rem] text-rose-500" />
        </button>
      </div>
    </div>
  </button>
  
  )
}

export default NoteCard