
import Layout from './layout'
import TodoModal from './modal/todo-modal';
import { Dialog } from './components/ui/dialog';
import Todos from './components/todos';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { handleTodosFilter, setEditing, setOpenTodoModal } from '../src/slices/todoSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
   

const Dashboard = () => {

    const {openTodoModal} = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch();

  return (
    <Layout>
        <div className='flex items-center justify-between mb-[1rem]'>
             <h1 className='lg:text-[3rem] text-[2rem]'>Todos</h1>

             <div className='flex items-center gap-[.5rem] relative'>
             <button type="button" className='yena-btn' onClick={() => {dispatch(setOpenTodoModal(true)); dispatch(setEditing())}}>Create Todo</button>

             {/* <button type="button" className='yena-btn' onClick={() => setOpenFilterDropDown(!openFilterDropDown)}><AdjustmentsVerticalIcon className='w-[1.5rem]'/></button>
              {openFilterDropDown && (
                 <div className='absolute top-[3rem] right-[1rem] z-[100]'>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[10rem] p-2 shadow">
                  <li><a>All</a></li>
                 <li><a>Today</a></li>
                  <li><a>Tomorrow</a></li>
                  <li><a>Last Week</a></li>
                </ul>
                 </div>
              )} */}

          <Select onValueChange={(value) => dispatch(handleTodosFilter(value))}>
            <SelectTrigger className="w-[120px] outline-none yena-btn">
              <SelectValue placeholder="Today" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Todos</SelectItem>
              <SelectItem value={'today'}>Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
             </div>
        </div>

        
        <Todos />

        <Dialog open={openTodoModal} onOpenChange={(isOpen) => dispatch(setOpenTodoModal(isOpen))}>
             <TodoModal closeModal={() => dispatch(setOpenTodoModal(false))}/>
        </Dialog>

        
    </Layout>
  )
}

export default Dashboard