import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useFormStatus } from "react-dom";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
// import { Label } from "../components/ui/label";
import { setOpenFlashCardAIModal } from "../slices/flashCardSlice";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import { allTopics } from "../slices/topicSlice";
import { useGetAllTopicsQuery } from "../slices/topicApiSlice";

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

const FlashCardAIModal = ({ closeModal }: { closeModal: () => void }) => {
  const { topics } = useSelector((state: RootState) => state.topic);
  const dispatch = useDispatch();

  const { data, isFetching, isLoading } = useGetAllTopicsQuery("");

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(allTopics(data));
    }
  }, [data, isFetching, dispatch]);

  const { openFlashCardAIModal } = useSelector(
    (state: RootState) => state.flashcard
  );
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    topics?.[0]?._id
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  async function formAction(formData: FormData) {
    const AIdata = {
      message: formData.get('message'),
      userId: userInfo?._id as string,
      topicId: selectedTopicId,
    }

    console.log(AIdata);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/flashcards/flashcard/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(AIdata),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      open={openFlashCardAIModal}
      onOpenChange={(isOpen) => dispatch(setOpenFlashCardAIModal(isOpen))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="lg:text-[1.5rem] text-[1.3rem] text-start">
            Create with AI{" "}
          </DialogTitle>
          <form action={formAction} className="space-y-6">
            <Select onValueChange={(value) => setSelectedTopicId(value)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={topics?.[0]?.name || "Select a topic"}
                />
              </SelectTrigger>
              <SelectContent>
                {topics?.length > 0 ? (
                  topics.map((topic) => (
                    <SelectItem key={topic._id} value={topic._id}>
                      {topic.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="No topics">
                    No topics.
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            <div className="flex items-center w-full gap-[.5rem]">
              <div className="w-full">
                {/* <Label
                  htmlFor="name"
                   className="flex text-start"
                >
                  Message
                </Label> */}
                <div className="mt-2">
                  <Textarea
                    name="message"
                    placeholder="Type your message here."
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

export default FlashCardAIModal;
