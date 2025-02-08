import TodoCard from './components/todo-card'
import { Calendar } from './components/ui/calendar'
import { useEffect } from 'react'
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchTodosQuery } from '../src/slices/todoApiSlice';
import { allTodos, handleTodosFilter } from '../src/slices/todoSlice';
import Layout from './layout'
import { allNotes } from './slices/noteSlice';
import { useGetAllNotesQuery } from './slices/noteApiSlice';
import NoteCard from './components/note-card';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useGetAllPhilosophyQuery } from './slices/philosophyApiSlice';
import { useGetAllGoalsQuery } from './slices/goalApiSlice';
import { allGoals } from './slices/goalSlice';
import { allPhilosophy } from './slices/philosophySlice';
import EmptyState from './components/empty-state';

const Dashboard = () => {

     const {filteredTodos, value, todos} = useSelector((state: RootState) => state.todo);
     const { notes } = useSelector((state: RootState) => state.note);
     const { goals } = useSelector((state: RootState) => state.goal);
     const { philosophies } = useSelector((state: RootState) => state.philosophy);
     const dispatch = useDispatch();

     const { data: todosData, isFetching: isFetchingTodos } = useFetchTodosQuery('');
     const { data: notesData, isFetching: isFetchingNotes } = useGetAllNotesQuery('');
     const { data: goalsData, isFetching: isFetchingGoals } = useGetAllGoalsQuery('');
     const { data: philosophiesData, isFetching: isFetchingPhilosophies } = useGetAllPhilosophyQuery('');
  

     useEffect(() => {
       if (todosData && !isFetchingTodos) {
         dispatch(allTodos(todosData));
         dispatch(handleTodosFilter("today"));
       }
     }, [todosData, isFetchingTodos, dispatch]);

     
       useEffect(() => {
         if (notesData && !isFetchingNotes) {
           dispatch(allNotes(notesData));
         }
       }, [notesData, dispatch, isFetchingNotes]);

       useEffect(() => {
          if (goalsData && !isFetchingGoals) {
            dispatch(allGoals(goalsData));
          }
        }, [goalsData, dispatch, isFetchingGoals]);

        useEffect(() => {
          if (philosophiesData && !isFetchingPhilosophies) {
            dispatch(allPhilosophy(philosophiesData));
          }
        }, [philosophiesData, dispatch, isFetchingPhilosophies]);
     

     const filteredTodo = filteredTodos.filter((todo) => todo.time === value);
     const completedTodosCount = todos.filter((todo) => todo.completed === true);
     const completedGoalsCount = goals.filter((goal) => goal.completed === true);

  return (
   <Layout>
        <div className='flex items-center justify-between'>
            <h1 className='lg:text-[3rem] text-[2rem] mb-[1rem]'>Dashboard</h1>
        </div>

        <div className='lg:grid flex flex-col grid-cols-3 gap-[1rem]'>
        <div className='grid grid-cols-2  gap-[.5rem]'>
                  <div className='border shadow-md p-[1rem] rounded-[.5rem]'>
                       <div className='flex lg:items-center items-start lg:gap-[1rem]'>
                            <div>
                            <h1 className='text-[2.5rem]'>{completedTodosCount?.length}</h1>
                            <span className='text-muted-foreground'>Completed Todos</span>
                            </div>
                            <img src="https://img.icons8.com/?size=100&id=9fp9k4lPT8us&format=png&color=000000" alt="" className='lg:w-[4rem] w-[3rem] lg:h-[4rem] h-[3rem]'/>
                       </div>
                  </div>

                  <div className="border shadow-md p-[1rem] rounded-[.5rem]">
                       <div className='flex lg:items-center items-start lg:gap-[1rem]'>
                            <div>
                            <h1 className='text-[2.5rem]'>{notes?.length}</h1>
                            <span className='text-muted-foreground'>Personal Notes</span>
                            </div>
                            <img src="https://img.icons8.com/?size=100&id=wI5oV8wCkIXd&format=png&color=000000" alt="" className='lg:w-[4rem] w-[3rem] lg:h-[4rem] h-[3rem]' />
                       </div>
                  </div>

                  <div className='border shadow-md p-[1rem] rounded-[.5rem]'>
                     <div className='flex lg:items-center items-start lg:gap-[1rem]'>
                            <div>
                            <h1 className='text-[2.5rem]'>{completedGoalsCount?.length}</h1>
                            <span className='text-muted-foreground'>Completed goals</span>
                            </div>
                            <img src="https://img.icons8.com/?size=100&id=LZtGgAmh0n0e&format=png&color=000000" alt="" className='lg:w-[4rem] w-[3rem] lg:h-[4rem] h-[3rem]' />
                       </div>
                  </div>

                  <div className='border shadow-md p-[1rem] rounded-[.5rem]'>
                     <div className='flex lg:items-center items-start lg:gap-[.1rem]'>
                            <div>
                            <h1 className='text-[2.5rem]'>{philosophies?.length}</h1>
                            <span className='text-muted-foreground'>Philosophies</span>
                            </div>
                            <img src="https://img.icons8.com/?size=100&id=RZ3Ux64yROj8&format=png&color=000000" alt=""className='lg:w-[4rem] w-[3rem] lg:h-[4rem] h-[3rem]' />
                       </div>
                  </div>
            </div>

            <div className="border rounded-[.5rem] h-full w-full">
           <Calendar className='w-full h-full' />
            </div>
        </div>

        <div className='lg:grid flex flex-col grid-cols-2 place-content-center gap-[1rem] mt-[2rem]'>
          <div>
          <div className='flex items-center justify-between'>
          <h1 className='text-[1.3rem]'>Morning Todos</h1>
          <Link to={'/todos'}><ArrowUpRight size={24} className='cursor-pointer'/></Link>
          </div>
          <div className='mt-[.5rem]  flex flex-col gap-[.5rem]'>
                {filteredTodos.length < 0 ? (
                  filteredTodo?.slice(0, 3)?.map((todo) => (
                    <TodoCard todo={todo}/>
                ))
                ) : (
                  <EmptyState />
                )}
          </div>
          </div>

          <div>
          <div className='flex items-center justify-between'>
          <h1 className='text-[1.3rem]'>Notes</h1>
          <Link to={'/notes'}><ArrowUpRight size={24} className='cursor-pointer'/></Link>
          </div>
          <div className='flex flex-col gap-[.5rem] mt-[.5rem]'>
               {notes?.length < 0 ? (
                  notes?.slice(0,3)?.map((note) => (
                    <NoteCard note={note} key={note._id}/>
                ))
                ) : (
                  <EmptyState />
                )}
          </div>
          </div>
        </div>
   </Layout>
  )
}

export default Dashboard