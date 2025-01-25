
import Layout from '../layout'
import GoalModal from '../modal/goal-modal'
import { handleFilter, setOpenGoalModal } from '../../src/slices/goalSlice'
import { useDispatch, useSelector } from 'react-redux'
import AllGoals from '../components/all-goals'
import { RootState } from '../../store/store'
import { setEditing } from '../slices/goalSlice'

const Goals = () => {

    const dispatch = useDispatch();
    const {value} = useSelector((state: RootState) => state.goal);

  return (
     <Layout>
          <div className='flex lg:flex-row flex-col lg:items-center items-start justify-between w-full mb-[2rem]'>
              <h1 className='lg:text-[3rem] text-[2.5rem]'>Goals for {new Date().getFullYear()}</h1>
              <button type="button" className='yena-btn' onClick={() => {dispatch(setOpenGoalModal(true)); dispatch(setEditing())}}>Create new</button>
          </div>

          <div className="flex items-center gap-[.5rem] mb-[1rem]">
              <div className={`yena-btn ${value === 'past' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('past'))}>Past</div>
              <div className={`yena-btn ${value === 'present' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('present'))}>Present</div>
              <div className={`yena-btn ${value === 'future' && 'yena-btn-black'} !h-[2.3rem] cursor-pointer`} onClick={() => dispatch(handleFilter('future'))}>Future</div>
         </div>

          <AllGoals />

          <GoalModal closeModal={() => dispatch(setOpenGoalModal(false))} />
     </Layout>
  )
}

export default Goals