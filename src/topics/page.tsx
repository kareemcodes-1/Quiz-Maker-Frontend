
import Layout from '../layout'
import { useDispatch } from 'react-redux'
import { setEditing, setOpenTopicModal } from '../slices/topicSlice'
import TopicModal from '../modal/topic-modal'
import AllTopics from './all-topics'

const Topics = () => {

    const dispatch = useDispatch();

  return (
    <Layout>
          <div className='mt-[1.2rem]'>
          <div className='flex lg:items-center items-start justify-between w-full lg:flex-row flex-col mb-[2rem]'>
               <h1 className='lg:text-[3rem] text-[2.5rem]'>Topics</h1>
               <button type='button' className='yena-btn-black dark:yena-btn' onClick={() => {dispatch(setOpenTopicModal(true)); dispatch(setEditing())}}>Create new</button>
          </div>

          <AllTopics />
          </div>
          <TopicModal closeModal={() => dispatch(setOpenTopicModal(false))}/>
    </Layout>
  )
}

export default Topics;