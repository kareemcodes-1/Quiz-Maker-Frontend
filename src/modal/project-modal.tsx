
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { useCreateProjectMutation } from "../../src/slices/projectApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addProject } from "../slices/projectSlice";

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
  const dispatch = useDispatch();

  const [createProject] = useCreateProjectMutation();
  const formAction = async (formData: any) => {
    const project = {
      name: formData.get("name"),
      emoji: formData.get("emoji"),
    };

    const res = await createProject(project).unwrap();
    if(res){
       toast.success('Created Project');
       dispatch(addProject(res));
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
                Emoji
              </label>
              <div className="mt-2">
                <input
                  id="emoji"
                  name="emoji"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            
          </div>
          <SubmitBtn />
        </form>
      </DialogHeader>
    </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
