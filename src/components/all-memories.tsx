import { useEffect } from 'react'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllMemoriesQuery } from '../../src/slices/memoryApiSlice';
import { allMemories } from '../../src/slices/memorySlice';
import MemoryCard from './memory-card';
import EmptyState from './empty-state';

const AllMemories = () => {

    const {memories} = useSelector((state: RootState) => state.memory);
    const dispatch = useDispatch();

    const {data,isFetching} = useGetAllMemoriesQuery('');

    useEffect(() => {
      if (data && !isFetching) {
        dispatch(allMemories(data));
      }
    }, [data, isFetching, dispatch]);


  return (
    <>
    {memories.length > 0 ? (
    <div className='lg:grid flex flex-col grid-cols-3 gap-[1rem]'>
          {memories.map((memory) => (
            <MemoryCard memory={memory} key={memory._id}/>
        ))}

    </div>
    )
     : (
      <EmptyState />
    )}
    </>
  )
}

export default AllMemories