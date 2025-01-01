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

    const {data, error, isFetching} = useGetAllMemoriesQuery('');

    useEffect(() => {
      if (data && !isFetching) {
        dispatch(allMemories(data));
      }
    }, [data, isFetching, dispatch]);


  return (
    <>
    {memories.length > 0 ? (
    <div className='grid grid-cols-4 gap-[1rem]'>
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