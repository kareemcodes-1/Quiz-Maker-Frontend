import { useEffect, useState } from "react";
import Layout from "../../layout";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { useCreateFlashCardMutation } from "../../slices/flashCardApiSlice";
// import { FlashCard } from "../../../types/type";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../components/ui/loading";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useGetAllTopicsQuery } from "../../slices/topicApiSlice";
import { allTopics } from "../../slices/topicSlice";

const CreateFlashCards = () => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [createFlashCard, {isLoading}] = useCreateFlashCardMutation();
  const { topics } = useSelector((state: RootState) => state.topic);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics?.[0]?._id);
  const {data, isFetching} = useGetAllTopicsQuery('');
  const dispatch = useDispatch();

  useEffect(() => {
    if(data && !isFetching){   
    dispatch(allTopics(data));
    }
  }, [data, isFetching])
  

  useEffect(() => {

      if (topics?.[0]?._id) {
        setSelectedTopicId(topics[0]._id);
      }
    }, [topics]);

  function handleSwitch(){
   if(frontText && backText !== ""){
    setFrontText(backText);
    setBackText(frontText);
   }
  }

 async function handleSubmit (){
      try {
        const data = {
            frontContent: frontText,
            backContent: backText,
            topicId: selectedTopicId,
            userId: userInfo?._id as string,
        }
        const res = await createFlashCard(data).unwrap();
        if(res){
          toast.success('Created flashcard');
           navigate('/flashcards');
        }
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <Layout>

      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full mb-[2rem]">
        <h1 className="lg:text-[3rem] text-[2.5rem]">Create Flashcards </h1>
        
        <div className="flex items-center gap-[.5rem] relative lg:mt-0 mt-[1rem]">
          <button type="button" className="yena-btn-black dark:yena-btn" onClick={handleSubmit}>
          {isLoading ? <Loader /> : 'Save Card'}
          </button>

          <Select onValueChange={(value) => setSelectedTopicId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={topics?.[0]?.name || "Select a topic"}
              />
            </SelectTrigger>
            <SelectContent>
              {topics?.length > 0 ? (
                topics.map((topic) => (
                  <SelectItem key={topic._id} value={topic._id}>
                    {topic.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="No topics">
                  No topics.
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="lg:border lg:h-[80vh] w-full flex items-center justify-center mt-[3rem] rounded-sm relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Front Card */}
          <div className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 rounded-md w-full h-[400px] flex flex-col shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Front
            </h3>
            <textarea
              className="w-full h-full p-4 bg-transparent text-gray-800 dark:text-white outline-none resize-none text-lg"
              placeholder="Enter front content..."
              value={frontText}
              onChange={(e) => setFrontText(e.target.value)}
            />
          </div>

          <div className="yena-btn absolute lg:top-[15rem] top-[25rem] lg:left-[47%] left-[40%] cursor-pointer" onClick={handleSwitch}>
              <ArrowsRightLeftIcon className="w-[2rem] h-[2rem]"/>
          </div>

          {/* Back Card */}
          <div className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 rounded-md w-full h-[400px] flex flex-col shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Back
            </h3>
            <textarea
              className="w-full h-full p-4 bg-transparent text-gray-800 dark:text-white outline-none resize-none text-lg"
              placeholder="Enter back content..."
              value={backText}
              onChange={(e) => setBackText(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateFlashCards;

