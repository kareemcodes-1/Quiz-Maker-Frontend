
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../components/ui/dialog";
  import { useFormStatus } from "react-dom";
  import toast from "react-hot-toast";
  import { useCreateTopicMutation } from "../../src/slices/topicApiSlice";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../../store/store";
  import { addTopic, setOpenTopicModal } from "../slices/topicSlice";
  import { Label } from "../components/ui/label";
  import { Input } from "../components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select";
import { useState } from "react";
  
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
  
  const TopicModal = ({closeModal}: {closeModal: () => void;}) => {
  
    const {openTopicModal} = useSelector((state: RootState) => state.topic);
    const {userInfo} = useSelector((state: RootState) => state.auth);
    const { projects } = useSelector((state: RootState) => state.project);
    const [, setSelectedProjectId] = useState<string>(projects[0]?._id);
    const { editingMode, editingTopic } = useSelector(
        (state: RootState) => state.topic
      );
    const dispatch = useDispatch();
  
    const [createTopic] = useCreateTopicMutation();
    const formAction = async (formData: FormData) => {
      if(userInfo){
        const topic = {
          userId: userInfo._id,
          name: formData.get("name"),
         description: formData.get("description"),
        };
    
        const res = await createTopic(topic).unwrap();
        if(res){
           toast.success('Created Topic');
           dispatch(addTopic(res));
           closeModal()
        }
      }
    };
  
    return (
      <Dialog open={openTopicModal} onOpenChange={(value) => dispatch(setOpenTopicModal(value))}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start" >Create Topic</DialogTitle>
          <form action={formAction} className="space-y-6">
            <div className="flex items-center w-full gap-[.5rem]">
              <div className="w-full">
                <Label
                  htmlFor="name"
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
                  htmlFor="description"
                >
                  Description
                </Label>
                <div className="mt-2">
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    required
                  />
                </div>
              </div>
              
            </div>

            <div className="flex items-center gap-[.5rem]">
          <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue
              className=" placeholder:text-black dark:placeholder:text-white"
                placeholder={editingMode ? editingTopic?.projectId.name : projects?.[0]?.name}
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
            <SubmitBtn />
          </form>
        </DialogHeader>
      </DialogContent>
      </Dialog>
    );
  };
  
  export default TopicModal;
  