
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { useCreateProjectMutation } from "../../src/slices/projectApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Save
    </button>
  );
};

const ProjectModal = ({closeModal}: {closeModal: () => void;}) => {

  const {openProjectModal} = useSelector((state: RootState) => state.project);

  const [createProject] = useCreateProjectMutation();
  const formAction = async (formData: any) => {
    const project = {
      name: formData.get("name"),
      color: formData.get("color"),
    };

    const res = await createProject(project);
    if(res.data){
       toast.success('Created Project');
       closeModal()
    }
  };

  return (
    <Dialog open={openProjectModal}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start" >Create Project</DialogTitle>
        <form action={formAction} className="space-y-6">
          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm/6 font-medium text-gray-900 text-start"
              >
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

          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <label
                htmlFor="emoji"
                className="block text-sm/6 font-medium text-gray-900 text-start"
              >
                Color
              </label>
              <div className="mt-2">
                <input
                  id="color"
                  name="color"
                  type="color"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
          </div>

          {/* <div>
              <div className="flex items-center justify-between">
                <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                  Description
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div> */}
          <SubmitBtn />
        </form>
      </DialogHeader>
    </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
