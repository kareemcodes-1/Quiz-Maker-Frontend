
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
import { addProject, setOpenProjectModal } from "../slices/projectSlice";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="yena-btn-black dark:yena-btn w-full"
    >
      Save
    </button>
  );
};

const ProjectModal = ({closeModal}: {closeModal: () => void;}) => {

  const {openProjectModal} = useSelector((state: RootState) => state.project);
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [createProject] = useCreateProjectMutation();
  const formAction = async (formData: FormData) => {
    if(userInfo){
      const project = {
        userId: userInfo._id,
        name: formData.get("name"),
        emoji: formData.get("emoji"),
      };
  
      const res = await createProject(project).unwrap();
      if(res){
         toast.success('Created Project');
         dispatch(addProject(res));
         closeModal()
      }
    }
  };

  return (
    <Dialog open={openProjectModal} onOpenChange={(isOpen) => dispatch(setOpenProjectModal(isOpen))}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start" >Create Project</DialogTitle>
        <form action={formAction} className="space-y-6">
          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <Label
                htmlFor="name"
                 className="flex text-start"
              >
                Name
              </Label>
              <div className="mt-2">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                />
              </div>
            </div>
            
          </div>

          <div className="flex items-center w-full gap-[.5rem]">
            <div className="w-full">
              <Label
                htmlFor="emoji"
                className="flex text-start"
              >
                Emoji
              </Label>
              <div className="mt-2">
                <Input
                  id="emoji"
                  name="emoji"
                  type="text"
                  required
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
