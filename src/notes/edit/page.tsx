import  {useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {useUpdateNoteMutation } from "../../slices/noteApiSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../store/store";
import {useNavigate } from "react-router";
import { updateNotes } from "../../slices/noteSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../components/ui/loading";

const NoteEditPage = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const {editingNote} = useSelector((state: RootState) => state.note);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateNote] = useUpdateNoteMutation();
  const {projects} = useSelector((state: RootState) => state.project);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(editingNote?.projectId._id);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write your thoughts?",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      if (editingNote?.content) {
        quillInstance.current.root.innerHTML = editingNote.content;
        setValue(editingNote?.content);
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
    setLoading(true);
     if(editingNote && selectedProjectId){
        const note = {
            _id: editingNote._id,
            userId: userInfo?._id as string,
            content: value,
            projectId: {
                ...editingNote.projectId,
                _id: selectedProjectId
            },
        }
  
        try {
          const res = await updateNote({id: editingNote._id, data: note});
          if(res.data){
              toast.success('Updated Note');
              dispatch(updateNotes(res.data));
              navigate('/notes')
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
     <h1 className="lg:text-[2.5rem] text-[2rem] mb-[.5rem]">Edit Note</h1>

      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn-black dark:yena-btn" onClick={handleSubmit}>{loading ? <Loader /> : 'Update note'}</button>

      <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={editingNote?.projectId.name || "Select a project"}
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
        <div ref={editorRef} className="rounded-[.5rem] w-full dark:[&_.ql-editor.ql-blank::before]:text-muted-foreground !cabinetgrotesk" style={{height: "60vh"}}/>
      </div>
    </Layout>
  );
};

export default NoteEditPage;
