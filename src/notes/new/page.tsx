import { useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { useCreateNoteMutation } from "../../slices/noteApiSlice";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Loader from "../../components/ui/loading";

const NewNote = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const { projects } = useSelector((state: RootState) => state.project);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [value, setValue] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects?.[0]?._id);
  const [createNote] = useCreateNoteMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  
  useEffect(() => {

    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Any notes??",
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
    };
  }, []);

  useEffect(() => {
    if (projects?.[0]?._id) {
      setSelectedProjectId(projects[0]._id);
    }
  }, [projects]);



  const handleSubmit = async () => {
    setLoading(true);
    const note = {
      userId: userInfo?._id as string,
      content: value,
      projectId: selectedProjectId,
    };

    try {
      const res = await createNote(note);
      if (res.data) {
        toast.success("Created Note");
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
        <h1 className="lg:text-[2.5rem] text-[2rem] mb-[.5rem]">
          Create Notes
        </h1>

        <div className="flex items-center gap-[.5rem] relative">
          <button type="button" className="yena-btn-black dark:yena-btn" onClick={handleSubmit}>
          {loading ? <Loader /> : 'Save Note'}
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
      <div className="border rounded-[.5rem] mt-[1.5rem]">
        {/* Editor container */}
        <div
          ref={editorRef}
          className="rounded-[.5rem] w-full dark:[&_.ql-editor.ql-blank::before]:text-muted-foreground !cabinetgrotesk"
          style={{ height: "60vh" }}
        />
      </div>
    </Layout>
  );
};

export default NewNote;
