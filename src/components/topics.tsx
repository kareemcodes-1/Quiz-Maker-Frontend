import { useEffect } from 'react'
import { useStore } from '../store/store'
import { Link } from 'react-router';

const Topics = () => {

    const {topics, setTopics} = useStore();

    useEffect(() => {
        (async function (){
            try{
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics`, {
                  method: "GET",
                  headers: {
                    'Content-Type': 'application/json',
                },
                });
          
                const result = await res.json();
                setTopics(result);
              }catch(error){
                console.log(error);
              }
        }())
    }, [])

  return (      
   <>
      {topics.length > 0 ? (
              topics.map((topic, index) => (
                <div className="border relative w-full shadow-md rounded-[.5rem] p-[.8rem] flex items-center justify-between gap-[1rem] lg:gap-[.5rem]" key={index}>
                <Link to={`/topic/${topic._id}/quizzes/new`} className="text-[1.2rem] hover:underline transition" >{topic.name}</Link>
                <Link to={`/topic/${topic._id}/quizzes`} className="yena-btn" >
                    Start
                </Link>
                </div>
              ))
      ) : (
        <div>No Topics.</div>
      )}
   </>
  )
}

export default Topics