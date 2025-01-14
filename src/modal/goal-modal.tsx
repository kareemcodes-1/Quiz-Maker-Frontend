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
import { addGoal, setOpenGoalModal, updatedGoal } from "../slices/goalSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { cn } from "../lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"

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
  const [startDeadlineDate, setStartDeadlineDate] = useState<Date>()
  const [endDeadlineDate, setEndDeadlineDate] = useState<Date>()

  const [createGoal] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const dispatch = useDispatch();
  console.log(startDeadlineDate);

  useEffect(() => {
    if (editingGoal && editingMode) {
      setName(editingGoal.name);
      setTime(editingGoal.time);
      setSelectedProjectId(editingGoal.projectId._id);
      setStartDeadlineDate(editingGoal.startDeadlineDate);
      setEndDeadlineDate(editingGoal.endDeadlineDate);
    } else {
      setName("");
      setTime("");
      setSelectedProjectId("");
      setStartDeadlineDate(undefined);
      setEndDeadlineDate(undefined);
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
        startDeadlineDate: startDeadlineDate as Date,
        endDeadlineDate: endDeadlineDate as Date,
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


            <div className="flex items-center gap-[.5rem]">
            <Select onValueChange={(value) => setTime(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Present" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="past">Past</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="future">Future</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={editingMode ? editingGoal?.projectId.name : projects?.[0]?.name}
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


                <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !startDeadlineDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {startDeadlineDate ? format(startDeadlineDate, "PPP") : <span>Start deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={startDeadlineDate}
          onSelect={setStartDeadlineDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

        

            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !endDeadlineDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {endDeadlineDate ? format(endDeadlineDate, "PPP") : <span>Ending deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={endDeadlineDate}
          onSelect={setEndDeadlineDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

            <SubmitBtn />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModal;
