import { useEffect } from 'react'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllTopicsQuery } from '../../src/slices/topicApiSlice';
import { allTopics } from '../../src/slices/topicSlice';
import TopicCard from '../topics/topic-card';
import EmptyState from '../components/empty-state';

const AllTopics = () => {

    const {topics} = useSelector((state: RootState) => state.topic);
    const dispatch = useDispatch();

    const {data, isFetching, isLoading} = useGetAllTopicsQuery('');

    useEffect(() => {
      if (data && !isFetching) {
        dispatch(allTopics(data));
      }
    }, [data, isFetching, dispatch]);


  return (
    <>
    {topics.length > 0 ? (
    <div className=''>
          {topics.map((topic) => (
            <TopicCard topic={topic} key={topic._id} isLoading={isLoading}/>
        ))}

    </div>
    )
     : (
      <EmptyState />
    )}
    </>
  )
}

export default AllTopics