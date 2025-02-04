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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CreateFlashCards = () => {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [createFlashCard, {isLoading}] = useCreateFlashCardMutation();
  const { projects } = useSelector((state: RootState) => state.project);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects?.[0]?._id);

  useEffect(() => {
      if (projects?.[0]?._id) {
        setSelectedProjectId(projects[0]._id);
      }
    }, [projects]);

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
            projectId: selectedProjectId,
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
          {isLoading ? <Loader /> : 'Save Note'}
          </button>

          <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={projects?.[0]?.name || "Select a project"}
              />
            </SelectTrigger>
            <SelectContent>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                    {project.emoji}
                    {project.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="No projects">
                  No projects available
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

