import  {useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {useUpdatePlanMutation } from "../../../src/slices/planApiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { Project } from "../../../types/type";
import {useNavigate } from "react-router";
import { updatePlans } from "../../slices/planSlice";

const PlanEditPage = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingPlan} = useSelector((state: RootState) => state.plan);
  const [updatePlan] = useUpdatePlanMutation();
  const {projects} = useSelector((state: RootState) => state.project);
  const [openFilterDropDown, setOpenFilterDropDown] = useState<boolean>(false);
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
      <button type="button" className="yena-btn" onClick={() => setOpenFilterDropDown(!openFilterDropDown)}><CircleStackIcon className="w-[1.5rem]"/></button>
      
         {openFilterDropDown && (
                 <div className='absolute top-[3rem] right-[1rem] z-[100]'>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[10rem] p-2 shadow">
                      {projects.map((project: Project) => (
                         <li key={project._id} onClick={() => setSelectedProjectId(project._id)}><a>{project.name}</a></li>
                      ))}
                   </ul>
                 </div>
              )}
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
