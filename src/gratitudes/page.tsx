import { useEffect, } from 'react'
import Layout from '../layout'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import {  PlusIcon, SparklesIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Badge } from '../components/ui/badge';
import EmptyState from '../components/empty-state';
import { useDeleteGratitudeMutation, useGetAllGratitudeQuery } from '../slices/gratitudeApiSlice';
import { allGratitude, deleteGratitude, findGratitude } from '../slices/gratitudeSlice';
import { format } from 'date-fns';

const Gratitudes = () => {

  const {data, isFetching} = useGetAllGratitudeQuery('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteGratitudeApi] = useDeleteGratitudeMutation();
  const {gratitudes} = useSelector((state: RootState) => state.gratitude)


  useEffect(() => {
    if(data && !isFetching){
       dispatch(allGratitude(data));
    }
    
  }, [data, dispatch, isFetching]);

  async function handleDelete (id: string){
      try {
        await deleteGratitudeApi(id);
        toast.success('Deleted Gratitude');
        dispatch(deleteGratitude(id));
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
             <h1 className='lg:text-[3rem] text-[2.5rem]'>Gratitude </h1>

            <div className='relative flex items-center gap-[.5rem]'>
               <a href='/gratitudes/new' className='yena-btn'><span className='lg:block hidden'>Create new</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>
            </div>
        </div>

        

        <div className='flex flex-col gap-[1rem]'>
                 {gratitudes.length > 0 ? (
                  gratitudes.map((gratitude) => (
                    <button
                    type="button"
                    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]"
                  >
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
                      <SparklesIcon className="text-gray-500 w-[1.2rem] lg:w-[1.5rem]" />
                                 <div
                                  onClick={() => {
                                    dispatch(findGratitude(gratitude._id));
                                    navigate(`/gratitudes/edit/${gratitude._id}`);
                                  }}
                                  className="hover:underline text-[.9rem] lg:text-[1rem] text-start"
                                >
                                  {getPreviewText(gratitude.content as string, 50)}
                                </div>
                    </div>
                  
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto justify-between lg:justify-end">
                      <Badge>{format(new Date(gratitude.createdAt).toISOString(), "dd-MM-yyyy")}</Badge>
                      <button
                        type="button"
                        onClick={() => handleDelete(gratitude._id)}
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

export default Gratitudes;