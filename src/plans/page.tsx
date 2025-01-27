
import Layout from '../layout'
import AllPlans from '../components/all-plans'
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
import { handlePlansFilter } from '../slices/planSlice';

const Plans = () => {

  const {projects} = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch();

  return (
    <Layout>
          <div className='flex lg:items-center items-start lg:flex-row flex-col justify-between w-full mb-[1.5rem]'>
               <h1 className='text-[3rem]'>Plans</h1>
               
               <div className='flex items-center gap-[.3rem]'>
                <a href='/plans/new' className='yena-btn-black dark:yena-btn'><span className='lg:block hidden'>Create Plan</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></a>

               <Select onValueChange={(value) => dispatch(handlePlansFilter(value))}>
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

          <AllPlans />
    </Layout>
  )
}

export default Plans