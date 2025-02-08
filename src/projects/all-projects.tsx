import { useEffect } from 'react'
import { useGetAllProjectsQuery } from '../slices/projectApiSlice'
import { allProjects } from '../slices/projectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const AllProjects = () => {
  const {data, isFetching} = useGetAllProjectsQuery('');
  let dispatch = useDispatch();

  useEffect(() => {
      if(data && !isFetching){
          dispatch(allProjects(data));
      }
  }, [data, isFetching]);

  const {projects} = useSelector((state: RootState) => state.project);

  return (
    <div className="grid grid-cols-2">
          {projects.map((project) => (
              <div>
                  <a href={`/projects/project/${project._id}`}>
                    {project.name}
                  {project.emoji}</a>
              </div>
          ))}
    </div>
  )
}

export default AllProjects