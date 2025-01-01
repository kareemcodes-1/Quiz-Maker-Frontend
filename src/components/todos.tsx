import { useEffect } from 'react'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchTodosQuery } from '../../src/slices/todoApiSlice';
import { allTodos, handleFilter } from '../../src/slices/todoSlice';
import TodoCard from './todo-card';
import EmptyState from './empty-state';

const Todos = () => {
      const {filteredTodos, value} = useSelector((state: RootState) => state.todo);
      const dispatch = useDispatch();

      const {data, isFetching} = useFetchTodosQuery('');

      useEffect(() => {
        if (data && !isFetching) {
          dispatch(allTodos(data));
        }
      }, [data, isFetching, dispatch]);

      const filteredTodo = filteredTodos.filter((todo) => todo.time === value)

  return (
      <div className='flex flex-col gap-[1rem] mt-[2rem]'>
           <div className="flex items-center gap-[1rem] mb-[1rem]">
               <div className={`yena-btn ${value === 'morning' && '--black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('morning'))}>Morning</div>
               <div className={`yena-btn ${value === 'afternoon' && '--black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('afternoon'))}>Afternoon</div>
               <div className={`yena-btn ${value === 'night' && '--black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('night'))}>Night</div>
           </div>

            {filteredTodo.length > 0 ? (
              filteredTodo.map((todo) => (
                <TodoCard key={todo._id} todo={todo}/>
           ))
          ) : (
            <EmptyState />
          )}
      </div>
  )
}

export default Todos