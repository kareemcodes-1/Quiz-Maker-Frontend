import { Goal } from "../../types/type";
import { Pencil, Trash } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { useDispatch } from "react-redux";
import { useCompleteGoalMutation, useDeleteGoalMutation } from "../../src/slices/goalApiSlice";
import toast from "react-hot-toast";
import JSConfetti from 'js-confetti'
import { completeAGoal, deleteGoals, editGoal } from "../../src/slices/goalSlice";


const GoalCard = ({ goal }: { goal: Goal}) => {
  const dispatch = useDispatch();
  const [deleteGoal] = useDeleteGoalMutation();
  const [completeGoal] = useCompleteGoalMutation();

  async function handleDeleteGoal(id: string) {
    try {
      await deleteGoal(id);
      dispatch(deleteGoals(id));
      toast.success("Deleted goal");
    } catch (error) {
      console.log(error);
    }
  }

  async function completedGoal(id: string){
    try {
      const data = {
        ...goal,
        completed: !goal.completed,
      }

      const res = await completeGoal({id, data});
      console.log(res.data);
      if(res.data){
        if(res.data.completed){
          const jsConfetti = new JSConfetti()
          jsConfetti.addConfetti()
          toast.success("Completed goal");
        }
        dispatch(completeAGoal(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="border w-full shadow-md rounded-[.5rem] p-[1rem] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-[1rem]">
  <div className="flex items-center gap-[1rem]">
    {goal.completed ? (
      <input
        onClick={() => completedGoal(goal._id)}
        type="checkbox"
        defaultChecked
        className="checkbox checkbox-success !border-gray-400 !text-white lg:w-[1.5rem] w-[1.2rem] lg:h-[1.5rem] h-[1.2rem]"
      />
    ) : (
      <input
        onClick={() => completedGoal(goal._id)}
        type="checkbox"
        className="checkbox checkbox-success !border-gray-400 !text-white lg:w-[1.5rem] w-[1.2rem] lg:h-[1.5rem] h-[1.2rem]"
      />
    )}

    <h1 className="text-[1.2rem]">{goal.name}</h1>
  </div>

  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[1rem] lg:gap-[2rem]">
    <div className="flex items-center gap-[1rem]">
      <Badge className="flex items-center gap-[.3rem]">
        <div
          style={{ background: goal.projectId.color }}
          className="rounded-full p-[.3rem]"
        />{" "}
        <div className="text-[.8rem]">{goal.projectId.name}</div>
      </Badge>
    </div>
    <div className="flex items-center gap-[1rem]">
      <button
        type="button"
        onClick={() => dispatch(editGoal(goal))}
        className="text-gray-500"
      >
        <Pencil className="w-[1.4rem]" />
      </button>
      <button
        type="button"
        onClick={() => handleDeleteGoal(goal._id)}
        className="text-red-500"
      >
        <Trash className="w-[1.4rem]" />
      </button>
    </div>
  </div>
   </div>
  );
};

export default GoalCard;
