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

const LearningEdit = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingLearning} = useSelector((state: RootState) => state.learning);
  const [updatedLearning] = useUpdateLearningMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
     if(editingLearning){
        const learning = {
            _id: editingLearning._id,
            content: value,
            createdAt: editingLearning.createdAt
        }
  
        try {
          const res = await updatedLearning({id: editingLearning._id, data: learning}).unwrap();
          if(res){
              toast.success('Updated Learning');
              dispatch(updateLearning(res));
              navigate('/learning');
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
