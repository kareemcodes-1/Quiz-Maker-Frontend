import { useEffect, useState } from 'react'
import Layout from '../layout'
import { useGetAllFocusQuery } from '../../src/slices/focusApiSlice'
import { useDispatch, useSelector } from 'react-redux';
import { allFocusNotes, deleteFocusState, findFocus } from '../../src/slices/focusSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import { AdjustmentsVerticalIcon, ArchiveBoxIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useDeleteFocusMutation } from '../../src/slices/focusApiSlice';
import toast from 'react-hot-toast';
import { Badge } from '../components/ui/badge';
import { addDays, format, isSameDay } from 'date-fns';
import { Focus } from '../../types/type';
import EmptyState from '../components/empty-state';

const FocusPage = () => {

  const {data, isFetching} = useGetAllFocusQuery('');
  const {focusNotes} = useSelector((state: RootState) => state.focus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteFocus] = useDeleteFocusMutation();
  const [openFilterDropDown, setOpenFilterDropDown] = useState<boolean>(false);
  

  useEffect(() => {
    if(data && !isFetching){
       dispatch(allFocusNotes(data));
    }
  }, [data, dispatch]);
  
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
  
        return format(todoDate, "yyyy-MM-dd");
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
  

  return (
    <Layout>
        <div className='flex items-center justify-between w-full mb-[1.5rem]'>
             <h1 className='lg:text-[3rem] text-[2.5rem]'>Focus </h1>

            <div className='relative flex items-center gap-[.5rem]'>
               <a href='/focus/new' className='yena-btn'>Create new</a>

             <button type="button" className='yena-btn' onClick={() => setOpenFilterDropDown(!openFilterDropDown)}><AdjustmentsVerticalIcon className='w-[1.5rem]'/></button>
              {openFilterDropDown && (
                 <div className='absolute top-[3rem] right-[1rem]'>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[10rem] p-2 shadow">
                  <li><a>All</a></li>
                 <li><a>Today</a></li>
                  <li><a>Tomorrow</a></li>
                  <li><a>Last Week</a></li>
                </ul>
                 </div>
              )}
            </div>
        </div>

        

        <div className='flex flex-col gap-[1rem]'>
                 {focusNotes.length > 0 ? (
                  focusNotes.map((note) => (
                    <button
                    type="button"
                    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]"
                  >
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
                      <ArchiveBoxIcon className="text-gray-500 w-[1.2rem] lg:w-[1.5rem]" />
                      <div
                        className="hover:underline text-sm lg:text-base truncate"
                        onClick={() => {
                          dispatch(findFocus(note._id));
                          navigate(`/focus/edit/${note._id}`);
                        }}
                        dangerouslySetInnerHTML={{ __html: note.content as string }}
                      />
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