
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../components/ui/dialog"
  import { Input } from "../components/ui/input"
  import { Label } from "../components/ui/label"
import Loader from "../components/ui/loading";
import { useFormStatus } from "react-dom";
import { useStore } from "../store/store";

const SubmitButton = () => {

  const {pending} = useFormStatus();

  return (
    <button type="submit" className="yena-btn mt-[1rem]">
    {pending ? <Loader /> : 'Save'}
    </button>
  )
}

const TopicModal = ({topicModalOpen, setTopicModalOpen} : {topicModalOpen: boolean, setTopicModalOpen: (open: boolean) => void;}) => {

    const {addTopic} = useStore();

    async function createTopic (formData: FormData){
      const data = {
        name: formData.get('name')
      }

      try{
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
        if(result){
          addTopic(result);
          setTopicModalOpen(false);
          toast.success('Created Topic');
        }
        else{
          toast.error('Something went wrong');
        }

      }catch(error){
        console.log(error);
      }

    }

  return (
    <Dialog open={topicModalOpen} onOpenChange={(open) => setTopicModalOpen(open)}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start pb-[.5rem]">Create Topic</DialogTitle>
          {/* <DialogDescription className="text-start">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <form className="flex flex-col" action={createTopic}>
          <div className="flex flex-col items-start gap-[1rem]">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" name="name" />
          </div>

          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TopicModal