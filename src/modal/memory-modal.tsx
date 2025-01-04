import{ ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PhotoIcon} from '@heroicons/react/24/solid'
import { useCreateMemoryMutation, useUpdateMemoryMutation } from "../../src/slices/memoryApiSlice";
import { addMemory, setOpenMemoryModal, updateMemories } from "../slices/memorySlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { PencilIcon } from "@heroicons/react/24/outline";


const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
     {pending ? 'Submitting': ' Save'}
    </button>
  );
};

const MemoryModal = ({ closeModal }: { closeModal: () => void }) => {
  const { openMemoryModal, editingMemory, editingMode } = useSelector((state: RootState) => state.memory);
  const { projects } = useSelector((state: RootState) => state.project);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [name, setName] = useState('');
  const [steps, setSteps] = useState('');
  const [kilometers, setKilometers] = useState('');
  const [mins, setMins] = useState('');
  const [calories, setCalories] = useState('');
  
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [showField, setShowField] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [createMemory] = useCreateMemoryMutation();
  const [updateMemory] = useUpdateMemoryMutation();

  useEffect(() => {
    if (editingMemory && editingMode) {
      setName(editingMemory.name);
      setImagePreview(editingMemory.image);
      setSelectedProjectId(editingMemory.projectId._id);
      if(editingMemory.projectId.name === 'Fitness'){
        setShowField(true);
        setCalories(editingMemory.calories);
        setMins(editingMemory.mins);
        setKilometers(editingMemory.kilometers);
        setSteps(editingMemory.steps);
      }
    } else {
      setName("");
      setImagePreview("");
      setSelectedProjectId('');
    }
  }, [editingMemory, editingMode])

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "productivity_app"); // Replace with your Cloudinary upload preset
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/datpkisht/image/upload`, // Replace with your Cloudinary URL
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (data.secure_url) {
          setImagePreview(data.secure_url);
          toast.success("Image uploaded successfully!");
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        toast.error("Failed to upload the image. Please try again.");
        console.error(error);
      }
    }
  };

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    if(editingMode && editingMemory){
      const foundProject = projects.find((project) => project._id === selectedProjectId);
      if(foundProject?.name === 'Fitness'){
        const memory = {
          _id: editingMemory._id,
          projectId: {
            ...foundProject,
            _id: selectedProjectId
          },
          name,
          steps,
          kilometers,
          mins,
          calories,
          image: imagePreview,
          createdAt: '',
        };
        try {
          const res = await updateMemory({id: editingMemory._id, data: memory}).unwrap();
          if(res) {
          toast.success("Updated Memory");
          dispatch(updateMemories(res));
          closeModal();
          }
        } catch (error) {
          toast.error(error);
        }
      }else{
        if(foundProject){
          const memory = {
            _id: editingMemory._id,
            projectId: {
              ...foundProject,
              _id: selectedProjectId
            },
            name,
            mins: '',
            kilometers: '',
            calories: '',
            steps: '',
            image: imagePreview,
            createdAt: '',
          };
          try {
            const res = await updateMemory({id: editingMemory._id, data: memory}).unwrap();
            if(res) {
            toast.success("Updated Memory");
            dispatch(updateMemories(res));
            closeModal();
            }
          } catch (error) {
            toast.error(error);
          }
        }
      }
      
    }else{
      const foundProject = projects.find((project) => project._id === selectedProjectId);
      if(foundProject?.name === 'Fitness') {
        const memory = {
          projectId: selectedProjectId,
          name: formData.get("name"),
          image: imagePreview,
          kilometers: formData.get("kilometers"),
          calories: formData.get("calories"),
          steps: formData.get("steps"),
          mins: formData.get('mins'),
        };
        try {
          const res = await createMemory(memory).unwrap();
          if (res) {
          toast.success("Created Memory");
          dispatch(addMemory(res));
          closeModal();
          }
        } catch (error) {
          toast.error(error);
        }
      }else{
        const memory = {
          projectId: selectedProjectId,
          name: formData.get("name"),
          image: imagePreview,
        };
        try {
          const res = await createMemory(memory).unwrap();
          if (res) {
          toast.success("Created Memory");
          dispatch(addMemory(res));
          closeModal();
          }
        } catch (error) {
          toast.error(error);
        }
      }
    }
  };

  const showFitnessFields = (selectedProjectId: string) => {
    const foundProject = projects.find((project) => project._id === selectedProjectId);
    if(foundProject?.name === 'Fitness'){
        setShowField(true);
    }else{
      setShowField(false);
    }
  };

  return (
    <Dialog open={openMemoryModal} onOpenChange={(isOpen) => dispatch(setOpenMemoryModal(isOpen))}>
      <DialogContent className="w-full max-w-md p-4 lg:p-6">
        <DialogHeader>
          <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start">{editingMode ? 'Edit' : 'Create'} Memory</DialogTitle>
          <form onSubmit={formAction} className="space-y-6">
            <div className="flex items-center w-full gap-[.5rem]">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full relative">
              {editingMode && (
                <>
                <div className="yena-btn !absolute !right-0 cursor-pointer" onClick={() => imageRef.current?.click()}><PencilIcon className="w-[1rem]"/></div>
                <input ref={imageRef} id="file-upload" name="file-upload" type="file" onChange={handleImageChange} className="sr-only" />
                </>
              )}
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 text-start">
                Cover photo
              </label>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview-img"
                  className={`${showField ? 'h-[10rem]' : 'h-[15rem]'} w-full rounded-lg border object-cover border-dashed`}
                />
              ) : (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" onChange={handleImageChange} className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>


          <Select onValueChange={(value) => {setSelectedProjectId(value); showFitnessFields(value);}}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={editingMode ? editingMemory?.projectId.name : projects?.[0]?.name}
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

          {showField && (
              <>
              <div className="flex items-center w-full gap-[.5rem]">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Steps
                </label>
                <div className="mt-2">
                  <input
                    id="steps"
                    name="steps"
                    type="text"
                    value={steps}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSteps(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-start">
                Kilometers
                </label>
                <div className="mt-2">
                  <input
                    id="kilometers"
                    name="kilometers"
                    type="text"
                    value={kilometers}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setKilometers(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center w-full gap-[.5rem]">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Calories
                </label>
                <div className="mt-2">
                  <input
                    id="calories"
                    name="calories"
                    type="text"
                    value={calories}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCalories(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="w-full">
                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900 text-start">
                  Mins
                </label>
                <div className="mt-2">
                  <input
                    id="mins"
                    name="mins"
                    type="text"
                    value={mins}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMins(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
              </>
          )}


            <SubmitBtn />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryModal;

