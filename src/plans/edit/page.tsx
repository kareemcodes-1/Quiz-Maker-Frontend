import  {useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {useUpdatePlanMutation } from "../../../src/slices/planApiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import {useNavigate } from "react-router";
import { updatePlans } from "../../slices/planSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const PlanEditPage = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingPlan} = useSelector((state: RootState) => state.plan);
  const [updatePlan] = useUpdatePlanMutation();
  const {projects} = useSelector((state: RootState) => state.project);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(editingPlan?.projectId._id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write your plan",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      if (editingPlan?.content) {
        quillInstance.current.root.innerHTML = editingPlan.content;
        setValue(editingPlan?.content);
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
     if(editingPlan && selectedProjectId){
        const plan = {
            _id: editingPlan._id,
            content: value,
            projectId: {
                ...editingPlan.projectId,
                _id: selectedProjectId
            },
        }
  
        try {
          const res = await updatePlan({id: editingPlan._id, data: plan});
          if(res.data){
              toast.success('Updated Plan');
              dispatch(updatePlans(res.data));
              navigate('/plans')
          }
        } catch (error) {
          console.log(error);
        }
     }
  }

  return (
    <Layout>
     <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
     <h1 className="lg:text-[2.5rem] text-[2rem] mb-[.5rem]">Edit Plan</h1>

      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn" onClick={handleSubmit}>Save Note</button>

      <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={editingPlan?.projectId.name || "Select a project"}
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

export default PlanEditPage;
