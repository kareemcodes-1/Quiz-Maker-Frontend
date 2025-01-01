import { useEffect, useState } from "react";
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
import {
  useCreateGoalMutation,
  useUpdateGoalMutation,
} from "../../src/slices/goalApiSlice";
import { Badge } from "../components/ui/badge";
import { addGoal, setOpenGoalModal, updatedGoal } from "../slices/goalSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

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

const GoalModal = ({ closeModal }: { closeModal: () => void }) => {
  const { openGoalModal, editingGoal, editingMode } = useSelector(
    (state: RootState) => state.goal
  );
  const { projects } = useSelector((state: RootState) => state.project);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [time, setTime] = useState<string>("present");
  const [name, setName] = useState<string>("");

  const [createGoal] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingGoal && editingMode) {
      setName(editingGoal.name);
      setTime(editingGoal.time);
      setSelectedProjectId(editingGoal.projectId._id);
    } else {
      setName("");
      setTime("");
      setSelectedProjectId("");
    }
  }, [editingGoal, editingMode]);

  const formAction = async (formData: any) => {
    if (editingMode && editingGoal) {
      const goal = {
        _id: editingGoal._id,
        projectId: {
          ...editingGoal?.projectId,
          _id: selectedProjectId,
        },
        name,
        time,
        completed: false,
      };
      const res = await updateGoal({ data: goal, id: editingGoal._id });
      if (res.data) {
        toast.success("Updated Goal");
        dispatch(updatedGoal(res.data));
        closeModal();
      }
    } else {
      const goal = {
        _id: "",
        projectId: selectedProjectId,
        name: formData.get("name"),
        time,
        completed: false,
      };
      const res = await createGoal(goal);
      if (res.data) {
        toast.success("Created Goal");
        dispatch(addGoal(res.data))
        closeModal();
      }
    }
  };

  return (
    <Dialog
      open={openGoalModal}
      onOpenChange={(isOpen) => dispatch(setOpenGoalModal(isOpen))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start">
            {editingMode ? "Edit" : "Create"} Goal
          </DialogTitle>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>


            <Select onValueChange={(value) => setTime(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Present" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="future">Future</SelectItem>
              </SelectContent>
            </Select>

            <div className="tags flex items-center gap-[.5rem] overflow-x-scroll w-full">
              {projects.map((project) => (
                <Badge
                  key={project._id}
                  className={`cursor-pointer flex items-center gap-[.5rem] ${
                    selectedProjectId === project._id
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => setSelectedProjectId(project._id)}
                >
                  <div
                    style={{ background: project.color }}
                    className="rounded-full p-[.3rem]"
                  />
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

export default GoalModal;
