import { useEffect, } from 'react'
import Layout from '../layout'
import { useGetAllFocusQuery } from '../../src/slices/focusApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { allFocusNotes, deleteFocusState, findFocus, handleFocusFilter } from '../../src/slices/focusSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import {  ArchiveBoxIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteFocusMutation } from '../../src/slices/focusApiSlice';
import toast from 'react-hot-toast';
import { Badge } from '../components/ui/badge';
import { addDays, format, isSameDay } from 'date-fns';
import { Focus } from '../../types/type';
import EmptyState from '../components/empty-state';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const FocusPage = () => {

  const {data, isFetching} = useGetAllFocusQuery('');
  const {filteredFocus} = useSelector((state: RootState) => state.focus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteFocus] = useDeleteFocusMutation();
  

  useEffect(() => {
    if(data && !isFetching){
       dispatch(allFocusNotes(data));
    }
  }, [data, dispatch, isFetching]);
  
  const displayDate = (note: Focus) => {
  
      const today = new Date();
      const tomorrow = addDays(today, 1);
  
      if (note.date) {
        const todoDate = new Date(note.date);
        
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

  async function handleDelete (id: string){
      try {
        await deleteFocus(id);
        toast.success('Deleted focus');
        dispatch(deleteFocusState(id));
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
    <Layout>
        <div className='flex items-center justify-between w-full mb-[1.5rem]'>
             <h1 className='lg:text-[3rem] text-[2.5rem]'>Focus </h1>

            <div className='relative flex items-center gap-[.5rem]'>
               <a href='/focus/new' className='yena-btn'><span className='lg:block hidden'>Create new</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>

               <Select onValueChange={(value) => dispatch(handleFocusFilter(value))}>
            <SelectTrigger className="w-[120px] outline-none yena-btn">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Focus</SelectItem>
              <SelectItem value={'today'}>Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
            </div>
        </div>

        

        <div className='flex flex-col gap-[1rem]'>
                 {filteredFocus.length > 0 ? (
                  filteredFocus.map((note) => (
                    <button
                    type="button"
                    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]"
                  >
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
                      <ArchiveBoxIcon className="text-gray-500 w-[1.2rem] lg:w-[1.5rem]" />
                                 <div
                                  onClick={() => {
                                    dispatch(findFocus(note._id));
                                    navigate(`/focus/edit/${note._id}`);
                                  }}
                                  className="hover:underline text-[.9rem] lg:text-[1rem] text-start"
                                >
                                  {getPreviewText(note.content as string, 50)}
                                </div>
                    </div>
                  
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto justify-between lg:justify-end">
                      <Badge>{displayDate(note)}</Badge>
                      <button
                        type="button"
                        onClick={() => handleDelete(note._id)}
                        className="text-rose-500"
                      >
                        <TrashIcon className="w-[1.2rem] lg:w-[1.5rem]" />
                      </button>
                    </div>
                  </button>
                  
               ))
              ) : (
                <EmptyState />
              )}
        </div>
    </Layout>
  )
}

export default FocusPage