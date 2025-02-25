
import Layout from '../layout'
import { useDispatch } from 'react-redux'
import { setEditing, setOpenTopicModal } from '../slices/topicSlice'
import TopicModal from '../modal/topic-modal'
import AllTopics from './all-topics'
import { PlusIcon } from '@heroicons/react/24/outline'

const Topics = () => {

    const dispatch = useDispatch();

  return (
    <Layout>
          <div className='mt-[1.2rem]'>
          <div className='flex items-center justify-between w-full flex-row mb-[2rem]'>
               <h1 className='lg:text-[3rem] text-[2.5rem]'>Topics</h1>
               <button type="button" className='dark:yena-btn yena-btn-black ' onClick={() => {dispatch(setOpenTopicModal(true)); dispatch(setEditing())}}><span className='lg:block hidden'>Create Topic</span><PlusIcon className='lg:hidden block w-[1.3rem]'/><span></span></button>
          </div>

          <AllTopics />
          </div>
          <TopicModal closeModal={() => dispatch(setOpenTopicModal(false))}/>
    </Layout>
  )
}

export default Topics;