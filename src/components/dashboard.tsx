import { useState } from "react"
import TopicModal from "../modal/TopicModal";
import Topics from "./topics";


const Dashboard = () => {

    const [topicModalOpen, setTopicModalOpen] = useState(false);

  return (
    <>
    <div className="mx-[1.5rem] pt-[2rem]">
           <div className="flex items-center justify-between  mb-[1rem]">
           <h1 className="text-[2rem]">Quizzes</h1>
           <button className="yena-btn" onClick={() => setTopicModalOpen(true)}>
                New
            </button>
           </div>

          <div className="flex flex-col gap-[.8rem]">
          <Topics />
          </div>
    </div>
    <TopicModal topicModalOpen={topicModalOpen} setTopicModalOpen={setTopicModalOpen}/>
    </>
  )
}

export default Dashboard