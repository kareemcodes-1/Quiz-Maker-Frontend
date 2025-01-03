import { useEffect, } from 'react'
import Layout from '../layout'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import { PlusIcon,  TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Badge } from '../components/ui/badge';
import EmptyState from '../components/empty-state';
import { useDeletePhilosophyMutation, useGetAllPhilosophyQuery } from '../slices/philosophyApiSlice';
import { allPhilosophy, deletePhilosophy, findPhilosophy } from '../slices/philosophySlice';
import { format } from 'date-fns';

const Philosophies = () => {

  const {data, isFetching} = useGetAllPhilosophyQuery('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePhilosophyApi] = useDeletePhilosophyMutation();
  const {philosophies} = useSelector((state: RootState) => state.philosophy)


  useEffect(() => {
    if(data && !isFetching){
       dispatch(allPhilosophy(data));
    }
    
  }, [data, dispatch, isFetching]);

  async function handleDelete (id: string){
      try {
        await deletePhilosophyApi(id);
        toast.success('Deleted Philosophy');
        dispatch(deletePhilosophy(id));
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
             <h1 className='lg:text-[3rem] text-[2.5rem]'>Philosophies </h1>

            <div className='relative flex items-center gap-[.5rem]'>
               <a href='/philosophies/new' className='yena-btn'><span className='lg:block hidden'>Create new</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>
            </div>
        </div>

        

        <div className='flex flex-col gap-[1rem]'>
                 {philosophies.length > 0 ? (
                  philosophies.map((philosophy, index) => (
                    <button
                    type="button"
                    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]"
                  >
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
                      {/* <AcademicCapIcon className="text-gray-500 w-[1.2rem] lg:w-[1.5rem]" /> */}
                      <div className='lg:text-[1.2rem] text-[1rem]'>#{index + 1}</div>
                                 <div
                                  onClick={() => {
                                    dispatch(findPhilosophy(philosophy._id));
                                    navigate(`/philosophies/edit/${philosophy._id}`);
                                  }}
                                  className="hover:underline text-[.9rem] lg:text-[1rem] text-start"
                                >
                                  {getPreviewText(philosophy.content as string, 50)}
                                </div>
                    </div>
                  
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto justify-between lg:justify-end">
                      <Badge>{format(new Date(philosophy.createdAt).toISOString(), "dd-MM-yyyy")}</Badge>
                      <button
                        type="button"
                        onClick={() => handleDelete(philosophy._id)}
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

export default Philosophies;