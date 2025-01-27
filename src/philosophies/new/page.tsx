import  { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { addPhilosophy } from "../../slices/philosophySlice";
import { useCreatePhilosophyMutation } from "../../slices/philosophyApiSlice";
import { RootState } from "../../../store/store";
import Loader from "../../components/ui/loading";


const PhilosophyNew = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const [createPhilosophy] = useCreatePhilosophyMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write your philosophy for the day...",
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
      setLoading(true);
      if(userInfo){
        const philosophy = {
          _id: '',
          userId: userInfo._id,
         content: value,
         createdAt: '',
     }

     try {
       const res = await createPhilosophy(philosophy).unwrap();
       if(res){
           toast.success('Created Philosophy');
           dispatch(addPhilosophy(res));
           navigate('/philosophies');
       }
     } catch (error) {
       console.log(error);
     }finally{
        setLoading(false);
     }
    }

  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
      <h1 className="text-[2.5rem]">Create Philosophy</h1>
      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn-black dark:yena-btn" onClick={handleSubmit}>{loading ? <Loader /> : 'Save Philosophy'}</button>
      </div>
      </div>
      <div className="border rounded-[.5rem] mt-[1.5rem]">
        {/* Editor container */}
        <div ref={editorRef} className="rounded-[.5rem] w-full" style={{height: "60vh"}}/>
      </div>
    </Layout>
  );
};

export default PhilosophyNew;