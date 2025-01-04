import  { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { addLearning } from "../../slices/whatILearntSlice";
import { useCreateLearningMutation } from "../../slices/whatILearntApiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RootState } from "../../../store/store";


const LearningNew = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const {projects} = useSelector((state: RootState) => state.project);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const [createLearning] = useCreateLearningMutation();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?._id);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write what you learnt for the day...",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        setValue(quillInstance.current?.root.innerHTML as string);
      });
    }
    

    return () => {
      quillInstance.current = null;
      editorRef.current = null;
    }
  }, []);


  const handleSubmit = async () => {
      const findProject = projects.find((project) => project._id === selectedProjectId)
      if(findProject){
        const learning = {
          _id: '',
         projectId: {
           ...findProject,
           _id: findProject._id
         },
         content: value,
         createdAt: '',
        }

        
      try {
        const res = await createLearning(learning).unwrap();
        if(res){
            toast.success('Created Learning');
            dispatch(addLearning(res));
            navigate('/learnings');
        }
      } catch (error) {
        console.log(error);
      }
      }
  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
      <h1 className="text-[2.5rem]">Create Learning</h1>
      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn" onClick={handleSubmit}>Save Note</button>

      
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
                    <div className="flex items-center gap-[.5rem]">
                    <div>{project.emoji}</div>
                    <div>{project.name}</div>
                    </div>
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
      <div className="border rounded-[.5rem] mt-[1.5rem]">
        {/* Editor container */}
        <div ref={editorRef} className="rounded-[.5rem] w-full" style={{height: "60vh"}}/>
      </div>
    </Layout>
  );
};

export default LearningNew;