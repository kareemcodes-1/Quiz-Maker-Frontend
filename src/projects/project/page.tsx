import { EditIcon } from 'lucide-react'
import Layout from '../../layout'
import { useParams } from 'react-router'
import { useGetProjectByIdQuery } from '../../slices/projectApiSlice';
import { useEffect, useState } from 'react';
import { Project } from '../../../types/type';

const ProjectPage = () => {
    const {id} = useParams();
    const streakData = [true, true, false, true, true, true, false]; 
    const {data, isFetching} = useGetProjectByIdQuery(id);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
         if(data && !isFetching){
            setProject(data);
         }
    }, [data, isFetching]);

    console.log(project);


  return (
    <Layout>
        <div className='flex items-center justify-between mb-[1rem] mt-[1rem]'>
             <h1 className='lg:text-[3rem] text-[2rem]'>{project?.emoji}{project?.name}</h1>

             <div className='flex items-center gap-[.5rem] relative'>
             <button type="button" className='dark:yena-btn yena-btn-black'><span className='lg:block hidden'>Edit Project</span><EditIcon className='lg:hidden block w-[1.3rem]'/><span></span></button>
             </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
      <h2 className="text-2xl font-semibold">🔥 Streak Tracker</h2>
      <div className="flex gap-2">
        {streakData.map((active, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-md ${
              active ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
    </Layout>
  )
}

export default ProjectPage