import { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {  useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import { CircleStackIcon } from "@heroicons/react/24/outline";
import { Project } from "../../../types/type";
import { useCreatePlanMutation } from "../../../src/slices/planApiSlice";

const NewPlan = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [createPlan] = useCreatePlanMutation();
  const {projects} = useSelector((state: RootState) => state.project);
  const [openFilterDropDown, setOpenFilterDropDown] = useState<boolean>(false);


  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Any plans??",
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
      const note = {
          content: value,
          projectId: selectedProjectId,
      }

      try {
        const res = await createPlan(note);
        if(res.data){
            toast.success('Created Plan');
            // dispatch(addPlan(res.data));
        }
      } catch (error) {
        console.log(error);
      }

  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
      <h1 className="lg:text-[2.5rem] text-[2rem] mb-[.5rem]">Create Plans</h1>
      
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
        <div ref={editorRef} className="rounded-[.5rem] w-full" style={{height: "100vh"}}/>
      </div>
    </Layout>
  );
};

export default NewPlan;
