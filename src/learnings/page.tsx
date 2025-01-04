import { useEffect, } from 'react'
import Layout from '../layout'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import {  BeakerIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Badge } from '../components/ui/badge';
import EmptyState from '../components/empty-state';
import { useDeleteLearningMutation, useGetAllLearningQuery } from '../slices/whatILearntApiSlice';
import { allLearnings, deleteLearning, findLearning, handleLearningFilter } from '../slices/whatILearntSlice';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Learnings = () => {

  const {data, isFetching} = useGetAllLearningQuery('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteLearningApi] = useDeleteLearningMutation();
  const {learnings} = useSelector((state: RootState) => state.learning)
  const {projects} = useSelector((state: RootState) => state.project);


  useEffect(() => {
    if(data && !isFetching){
       dispatch(allLearnings(data));
    }
    
  }, [data, dispatch, isFetching]);

  async function handleDelete (id: string){
      try {
        await deleteLearningApi(id);
        toast.success('Deleted Learning');
        dispatch(deleteLearning(id));
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
        <div className='flex lg:items-center items-start justify-between w-full mb-[1.5rem] lg:flex-row flex-col'>
             <h1 className='lg:text-[3rem] text-[2.5rem]'>All I Learnt </h1>

            <div className='relative flex items-center gap-[.5rem]'>
               <a href='/learnings/new' className='yena-btn'><span className='lg:block hidden'>Create new</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>
               <Select onValueChange={(value) => dispatch(handleLearningFilter(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={'All'}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>
               ✨ All
              </SelectItem>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project._id} value={project.name.toLowerCase()}>
                      <span> {project.emoji}</span>
                      <span> {project.name}</span>
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="No projects">
                  No projects available
                </SelectItem>
              )}
            </SelectContent>
        </Select>
            </div>
        </div>

        

        <div className='flex flex-col gap-[1rem]'>
                 {learnings.length > 0 ? (
                  learnings.map((learning) => (
                    <button
                    type="button"
                    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]"
                  >
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto">
                      <BeakerIcon className="text-gray-500 w-[1.2rem] lg:w-[1.5rem]" />
                                 <div
                                  onClick={() => {
                                    dispatch(findLearning(learning._id));
                                    navigate(`/learnings/edit/${learning._id}`);
                                  }}
                                  className="hover:underline text-[.9rem] lg:text-[1rem] text-start"
                                >
                                  {getPreviewText(learning.content as string, 50)}
                                </div>
                    </div>
                  
                    <div className="flex items-center gap-[.5rem] lg:gap-[1rem] w-full lg:w-auto justify-between lg:justify-end">
                    <Badge className="flex items-center gap-[.3rem]">
                     <div className="text-[.8rem]">{learning.projectId.emoji}</div>{" "}
                     <div className="text-[.8rem]">{learning.projectId.name}</div>
                    </Badge>
 
                    <Badge>{format(new Date(learning.createdAt).toISOString(), "dd-MM-yyyy")}</Badge>
                      <button
                        type="button"
                        onClick={() => handleDelete(learning._id)}
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

export default Learnings;