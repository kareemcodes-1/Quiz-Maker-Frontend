import React from 'react'
import { Plan } from '../../types/type';
import { deletePlans, findPlan } from '../slices/planSlice';
import { PresentationChartBarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDeletePlanMutation } from '../slices/planApiSlice';
import toast from 'react-hot-toast';

const PlanCard = ({plan} : {plan: Plan}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePlan] = useDeletePlanMutation();

  async function handleDeletePlan(id: string) {
    try {
      await deletePlan(id);
      dispatch(deletePlans(id));
      toast.success("Deleted Plan");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
    type="button"
    className="border hover:bg-gray-50 transition rounded-[.5rem] shadow-md w-full p-[.8rem] cursor-pointer"
  >
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[1rem]">
      <div className="flex items-center gap-[1rem]">
        <PresentationChartBarIcon className="text-gray-500 lg:w-[1.5rem] w-[1.2rem]" />
        <div
          onClick={() => {
            dispatch(findPlan(plan._id));
            navigate(`/plans/edit/${plan._id}`);
          }}
          className="hover:underline text-[.9rem] lg:text-[1rem]"
          dangerouslySetInnerHTML={{ __html: plan.content as string }}
        />
      </div>
  
      <div className="flex items-center gap-[1rem]">
        <Badge className="flex items-center gap-[.3rem]">
          <div
            style={{ background: plan.projectId.color }}
            className="rounded-full p-[.3rem]"
          />{" "}
          <div className="text-[.9rem]">{plan.projectId.name}</div>
        </Badge>
  
        <button
          type="button"
          onClick={() => handleDeletePlan(plan._id)}
          className="flex items-center justify-center"
        >
          <TrashIcon className="lg:w-[1.5rem] w-[1.2rem] text-rose-500" />
        </button>
      </div>
    </div>
  </button>
  
  )
}

export default PlanCard