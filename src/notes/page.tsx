
import Layout from '../layout'
import AllNotes from '../components/all-notes'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { handleNotesFilter } from '../slices/noteSlice';

const Notes = () => {

  const {projects} = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  return (
    <Layout>
          <div className='mt-[1.2rem]'>
          <div className='flex lg:items-center items-start lg:flex-row flex-col justify-between w-full mb-[1.5rem]'>
               <h1 className='text-[3rem]'>Notes</h1>
               
               <div className='flex items-center gap-[.3rem]'>
                <a href='/notes/new' className='yena-btn-black dark:yena-btn'><span className='lg:block hidden'>Create Note</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>

               <Select onValueChange={(value) => dispatch(handleNotesFilter(value))}>
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

          <AllNotes />
          </div>
    </Layout>
  )
}

export default Notes