import { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import { useNavigate } from "react-router";
import { updateLearning } from "../../slices/whatILearntSlice";
import { useUpdateLearningMutation } from "../../slices/whatILearntApiSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const LearningEdit = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingLearning} = useSelector((state: RootState) => state.learning);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [updatedLearning] = useUpdateLearningMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {projects} = useSelector((state: RootState) => state.project);

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

      if (editingLearning?.content) {
        quillInstance.current.root.innerHTML = editingLearning.content;
        setValue(editingLearning?.content);
        setSelectedProjectId(editingLearning.projectId._id);
      }

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
    const foundProject = projects.find((project) => project._id === selectedProjectId);
    if(foundProject && editingLearning){
        const learning = {
            _id: editingLearning._id,
            projectId: {
              ...foundProject,
              _id: foundProject._id
            },
            content: value,
            createdAt: editingLearning.createdAt
        }
  
        try {
          const res = await updatedLearning({id: editingLearning._id, data: learning}).unwrap();
          if(res){
              toast.success('Updated Learning');
              dispatch(updateLearning(res));
              navigate('/learnings');
          }
        } catch (error) {
          console.log(error);
        }
    }
  }

  return (
    <Layout>
      <div className="flex lg:tems-center items-start lg:flex-row flex-col justify-between w-full">
      <h1 className="text-[2.5rem]">Edit Learning</h1>
      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn" onClick={handleSubmit}>Save Note</button>

      <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={editingLearning?.projectId.name || "Select a project"}
              />
            </SelectTrigger>
            <SelectContent>
              {projects?.length > 0 ? (
                projects.map((project) => (
                  <SelectItem key={project._id} value={project._id}>
                      <span> {project.emoji}</span>
                      <span> {project.name}</span>
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

export default LearningEdit;
