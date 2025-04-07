import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useStore } from '../../../store/store';

import QuizModal from '../../../modal/QuizModal';
import Quizzes from '../../../components/quizzes';

const TopicPage = () => {

  const {id} = useParams();
  const {topic, setTopic} = useStore();
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics/topic/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()).then((data) => setTopic(data)).catch((err) => console.log(err));
  }, [])

  return (
    <div className='mx-[1rem] pt-[2rem]'>
        <div className='flex items-center justify-between'>
        <h1 className='text-[1.5rem]'>{topic?.name}</h1>
        <button className="yena-btn" onClick={() => setQuizModalOpen(true)}>
                Add
            </button>
        </div>

      <Quizzes />

       <QuizModal topicId={id as string} quizModalOpen={quizModalOpen} setQuizModalOpen={setQuizModalOpen}/>
    </div>
  )
}

export default TopicPage