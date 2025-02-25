
import Layout from '../layout'
import GoalModal from '../modal/goal-modal'
import { handleFilter, setOpenGoalModal } from '../../src/slices/goalSlice'
import { useDispatch, useSelector } from 'react-redux'
import AllGoals from '../components/all-goals'
import { RootState } from '../../store/store'
import { setEditing } from '../slices/goalSlice'
import { PlusIcon } from '@heroicons/react/24/outline'

const Goals = () => {

    const dispatch = useDispatch();
    const {value} = useSelector((state: RootState) => state.goal);

  return (
     <Layout>
          <div className="mt-[1.2rem]">
          <div className='flex flex-row items-center justify-between w-full mb-[1rem]'>
              <h1 className='lg:text-[3rem] text-[2.5rem]'>Goals for {new Date().getFullYear()}</h1>
              <button type="button" className='dark:yena-btn yena-btn-black ' onClick={() => {dispatch(setOpenGoalModal(true)); dispatch(setEditing())}}><span className='lg:block hidden'>Create Goal</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></button>
          </div>

          <div className="flex items-center gap-[.5rem] mb-[1rem]">
              <div className={`yena-btn ${value === 'past' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('past'))}>Past</div>
              <div className={`yena-btn ${value === 'present' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('present'))}>Present</div>
              <div className={`yena-btn ${value === 'future' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('future'))}>Future</div>
         </div>

          <AllGoals />
          </div>

          <GoalModal closeModal={() => dispatch(setOpenGoalModal(false))} />
     </Layout>
  )
}

export default Goals