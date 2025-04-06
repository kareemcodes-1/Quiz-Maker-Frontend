import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Loader from "../components/ui/loading";
import { useFormStatus } from "react-dom";
import { Textarea } from "../components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="yena-btn mt-[1rem]">
      {pending ? <Loader /> : "Save"}
    </button>
  );
};

const QuizModal = ({
  quizModalOpen,
  setQuizModalOpen,
  topicId
}: {
  topicId: string;
  quizModalOpen: boolean;
  setQuizModalOpen: (open: boolean) => void;
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [option, setOption] = useState<string>("");
  const [answer, setAnswer] = useState<string>('');

  function addOption(value: string) {
    if (value !== "") {
      setOptions([...options, value]);
      setOption(""); // Clear the current input field
    }
  }

  function deleteOption(value: number) {
    const updatedOptions = options.filter((_, index) => index !== value);
    setOptions([...updatedOptions]);
  }

  async function createQuiz(formData: FormData) {
    const data = {
      topicId,
      question: formData.get("question"),
      options,
      answer: Number(answer)
    };

    console.log(data);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if(result){
        toast.success('Created Quiz');
        setOptions([]);
        setOption('');
        setAnswer('');
        setQuizModalOpen(false);
      }
      else{
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={quizModalOpen} onOpenChange={(open) => setQuizModalOpen(open)}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-start pb-[.5rem]">Create Quiz</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-[1rem]" action={createQuiz}>
          <div className="flex flex-col items-start gap-[1rem]">
            <Label htmlFor="name" className="text-right">
              Question
            </Label>
            <Input id="question" className="col-span-3" name="question" />
          </div>

          <div className="flex flex-col items-start gap-[1rem]">
            <Label htmlFor="name" className="text-right">
              Options
            </Label>

            {/* Render a Textarea for each option in the options array */}
            {options.map((opt, index) => (
              <div className="flex items-center gap-[.5rem] w-full">
              <Textarea
                key={index}
                value={opt}
                className="col-span-3"
                disabled
              />

              <button className="" onClick={() => deleteOption(index)}><Trash size={20}/></button>
              </div>
            ))}

            {/* Input for the next option */}
            <Textarea
              id="option"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="col-span-3"
              name="option"
            />

            <button
              type="button"
              className="yena-btn"
              onClick={() => addOption(option)}
            >
              Create Option
            </button>
          </div>

          <Select onValueChange={(value) => setAnswer(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                  {options.map((option, index) => (
                    <SelectItem value={String(index)}>{option}</SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
