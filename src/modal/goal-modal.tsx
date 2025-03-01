import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
// import { cn } from "../lib/utils";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "../components/ui/popover";
import { PencilIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import Loader from "../components/ui/loading";

const SubmitBtn = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="yena-btn-black dark:yena-btn w-full"
    >
      {pending ? <Loader /> : ' Save'}
    </button>
  );
};

const GoalModal = ({ closeModal }: { closeModal: () => void }) => {

  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [isEndCalendarOpen, setEndCalendarOpen] = useState(false);


  // Toggle functions to show/hide the calendar
  const toggleStartCalendar = () => {setStartCalendarOpen(!isStartCalendarOpen); setEndCalendarOpen(false)}
  const toggleEndCalendar = () => {setEndCalendarOpen(!isEndCalendarOpen); setStartCalendarOpen(false)};


  const { openGoalModal, editingGoal, editingMode } = useSelector(
    (state: RootState) => state.goal
  );
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { projects } = useSelector((state: RootState) => state.project);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const [time, setTime] = useState<string>("present");
  const [name, setName] = useState<string>("");
  const [startDeadlineDate, setStartDeadlineDate] = useState<Date>();
  const [endDeadlineDate, setEndDeadlineDate] = useState<Date>();
  const [imagePreview, setImagePreview] = useState<string>("");

  const [createGoal] = useCreateGoalMutation();
  const [updateGoal] = useUpdateGoalMutation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (editingGoal && editingMode) {
      setName(editingGoal.name);
      setTime(editingGoal.time);
      setSelectedProjectId(editingGoal.projectId._id);
      setStartDeadlineDate(editingGoal.startDeadlineDate);
      setEndDeadlineDate(editingGoal.endDeadlineDate);
      setImagePreview(editingGoal.image);
    } else {
      setName("");
      setTime("");
      setSelectedProjectId("");
      setStartDeadlineDate(undefined);
      setEndDeadlineDate(undefined);
      setImagePreview("");
    }
  }, [editingGoal, editingMode]);

  const formAction = async (formData: any) => {
    if (editingMode && editingGoal) {
      const goal = {
        _id: editingGoal._id,
        userId: userInfo?._id as string,
        projectId: {
          ...editingGoal?.projectId,
          _id: selectedProjectId,
        },
        name,
        image: imagePreview,
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
        userId: userInfo?._id as string,
        projectId: selectedProjectId,
        name: formData.get("name"),
        time,
        image: imagePreview,
        completed: false,
      };
      const res = await createGoal(goal);
      if (res.data) {
        toast.success("Created Goal");
        dispatch(addGoal(res.data));
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
                <Label className="text-start flex"
                  htmlFor="name"
                >
                  Name
                </Label>
                <div className="mt-2">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
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
                    placeholder={
                      editingMode
                        ? editingGoal?.projectId.name
                        : projects?.[0]?.name
                    }
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

              {/* <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDeadlineDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {startDeadlineDate ? (
                      format(startDeadlineDate, "PPP")
                    ) : (
                      <span>Start deadline</span>
                    )}
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
                      "w-full justify-start text-left font-normal",
                      !endDeadlineDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {endDeadlineDate ? (
                      format(endDeadlineDate, "PPP")
                    ) : (
                      <span>Ending deadline</span>
                    )}
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
              </Popover> */}

<div className="relative flex flex-col gap-[1rem]">
      {/* Start Deadline */}
      <div>
        <Button
        type="button"
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${!startDeadlineDate && "text-muted-foreground"}`}
          onClick={toggleStartCalendar}
        >
          <CalendarIcon />
          {startDeadlineDate ? (
            format(startDeadlineDate, "PPP")
          ) : (
            <span>Start deadline</span>
          )}
        </Button>

        {isStartCalendarOpen && (
          <div className="absolute mt-2 left-0 w-full z-10 bg-popover">
            <Calendar
              mode="single"
              selected={startDeadlineDate}
              onSelect={(date) => {
                setStartDeadlineDate(date);
                setStartCalendarOpen(false); // Close calendar on select
              }}
              initialFocus
            />
          </div>
        )}
      </div>

      {/* End Deadline */}
      <div>
        <Button
          variant={"outline"}
          type="button"
          className={`w-full justify-start text-left font-normal ${!endDeadlineDate && "text-muted-foreground"}`}
          onClick={toggleEndCalendar}
        >
          <CalendarIcon />
          {endDeadlineDate ? (
            format(endDeadlineDate, "PPP")
          ) : (
            <span>Ending deadline</span>
          )}
        </Button>

        {isEndCalendarOpen && (
          <div className="absolute mt-2 left-0 w-full z-10 bg-popover">
            <Calendar
              mode="single"
              selected={endDeadlineDate}
              onSelect={(date) => {
                setEndDeadlineDate(date);
                setEndCalendarOpen(false); // Close calendar on select
              }}
              initialFocus
            />
          </div>
        )}
      </div>
    </div>

            <div className="col-span-full relative">
              {editingMode && (
                <>
                  <div
                    className="yena-btn !absolute !right-0 cursor-pointer"
                    onClick={() => imageRef.current?.click()}
                  >
                    <PencilIcon className="w-[1rem]" />
                  </div>
                  <Input
                    ref={imageRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </>
              )}
              <Label
                htmlFor="cover-photo"
                className="text-start flex"
              >
                Goal photo
              </Label>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="preview-img"
                  className={
                    "h-[15rem] w-full rounded-lg border object-cover border-dashed"
                  }
                />
              ) : (
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            <SubmitBtn />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default GoalModal;
