import{ ChangeEvent, useState } from "react";
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
import { useCreateMemoryMutation } from "../../src/slices/memoryApiSlice";
import { Badge } from "../components/ui/badge";
import { addMemory, setOpenMemoryModal } from "../slices/memorySlice";

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
  const { openMemoryModal } = useSelector((state: RootState) => state.memory);
  const { projects } = useSelector((state: RootState) => state.project);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  const dispatch = useDispatch();
  const [createMemory, {error}] = useCreateMemoryMutation();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (typeof fileReader.result === "string") {
          setImagePreview(fileReader.result);
        }
      };
      fileReader.onerror = () => {
        toast.error("Failed to load the image. Please try again.");
      };
    }
  };

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const memory = {
      projectId: selectedProjectId,
      name: formData.get("name"),
      image: imagePreview,
    };

    try {
      const res = await createMemory(memory);
      if (res.data) {
      toast.success("Created Memory");
      dispatch(addMemory(res.data));
      closeModal();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={openMemoryModal} onOpenChange={(isOpen) => dispatch(setOpenMemoryModal(isOpen))}>
      <DialogContent className="w-full max-w-md p-4 lg:p-6">
        <DialogHeader>
          <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start">Create Memory</DialogTitle>
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
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900 text-start">
                Cover photo
              </label>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview-img"
                  className="h-[15rem] w-full rounded-lg border object-cover border-dashed"
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

            <div className="tags flex items-center gap-[.5rem] w-full overflow-x-scroll">
              {projects.map((project) => (
                <Badge
                  key={project._id}
                  className={`cursor-pointer flex items-center gap-[.5rem] ${
                    selectedProjectId === project._id ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSelectedProjectId(project._id)}
                >
                  <div style={{ background: project.color }} className="rounded-full p-[.3rem]" />
                  <span>{project.name}</span>
                </Badge>
              ))}
            </div>

            <SubmitBtn />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MemoryModal;

