import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../../layout";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCreateFocusMutation } from "../../../src/slices/focusApiSlice";
import { addFocusNotes, allFocusNotes } from "../../../src/slices/focusSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { CalendarDaysIcon, CircleStackIcon } from "@heroicons/react/24/outline";

const NewFocus = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  const [value, setValue] = useState<string>('');
  const [createFocus] = useCreateFocusMutation();
  const dispatch = useDispatch();
  const [openFilterDropDown, setOpenFilterDropDown] = useState<boolean>(false);
    const [today, setToday] = useState<boolean>(false);
    const [tomorrow, setTomorrow] = useState<boolean>(false);

  useEffect(() => {
    if (editorRef.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow", 
        placeholder: "Write your focus for the day...",
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
      const date = today ? new Date().toISOString() : tomorrow ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() : null
      const note = {
           _id: '',
          content: value,
          date
      }

      try {
        const res = await createFocus(note);
        if(res.data){
            toast.success('Created focus note');
            dispatch(addFocusNotes(res.data));
        }
      } catch (error) {
        console.log(error);
      }

  }

  return (
    <Layout>
      <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between w-full">
      <h1 className="text-[2.5rem]">Create Focus</h1>
      <div className="flex items-center gap-[.5rem] relative">
      <button type="button" className="yena-btn" onClick={handleSubmit}>Save Note</button>
      <button type="button" className={`yena-btn ${today ? '--black' : ''} !h-[2rem]`} onClick={() => {setToday(true); setTomorrow(false)}}>Today</button>
      <button type="button" className={`yena-btn ${tomorrow ? '--black' : ''} !h-[2rem]`} onClick={() => {setTomorrow(true); setToday(false)}}>Tomorrow</button>
      {/* <button type="button" className="yena-btn" onClick={() => setOpenFilterDropDown(!openFilterDropDown)}><CalendarDaysIcon className="w-[1.5rem]"/></button>
      
         {openFilterDropDown && (
                 <div className='absolute top-[3rem] right-[1rem]'>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-[10rem] p-2 shadow">
                        <li><a className="font-medium">Today</a></li>
                        <li><a className="font-medium">Tomorrow</a></li>
                   </ul>
                 </div>
              )} */}
      </div>
      </div>
      <div className="border rounded-[.5rem] mt-[1.5rem]">
        {/* Editor container */}
        <div ref={editorRef} className="rounded-[.5rem] w-full" style={{height: "100vh"}}/>
      </div>
    </Layout>
  );
};

export default NewFocus;
