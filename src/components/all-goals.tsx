import { useEffect } from 'react'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { allGoals } from '../../src/slices/goalSlice';
import GoalCard from './goal-card';
import { useGetAllGoalsQuery } from '../../src/slices/goalApiSlice';
import EmptyState from './empty-state';

const AllGoals = () => {

    const {goals} = useSelector((state: RootState) => state.goal);
    const dispatch = useDispatch();

    const {data, isFetching} = useGetAllGoalsQuery('');

    useEffect(() => {
      if (data && !isFetching) {
        dispatch(allGoals(data));
      }
    }, [data, isFetching, dispatch]);

    const {value} = useSelector((state: RootState) => state.goal);

    const filteredGoals = goals.filter((goal) => goal.time === value);
  return (
    <div className='flex flex-col gap-[1rem]'>
         {filteredGoals.length > 0 ? (
              filteredGoals.map((goal) => <GoalCard goal={goal} key={goal._id} />)
          ) : (
            <EmptyState />
          )}
    </div>
  )
}

export default AllGoals;