
import Layout from '../layout';
import { PlusIcon } from 'lucide-react';
import AllProjects from './all-projects';

const ProjectsPage = () => {
  return (
    <Layout>
        <div className='flex items-center justify-between mb-[1rem]'>
             <h1 className='lg:text-[3rem] text-[2rem]'>Projects</h1>

             <div className='flex items-center gap-[.5rem] relative'>
             <button type="button" className='dark:yena-btn yena-btn-black'><span className='lg:block hidden'>Create Project</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></button>
             </div>
        </div>

       <AllProjects />
    </Layout>
  )
}

export default ProjectsPage;