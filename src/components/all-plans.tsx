import React, { useEffect } from "react";
import { useGetAllPlansQuery } from "../../src/slices/planApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router";
import { allPlans, findPlan } from "../../src/slices/planSlice";

import PlanCard from "./plan-card";
import EmptyState from "./empty-state";

const AllPlans = () => {
  const { data, isFetching } = useGetAllPlansQuery("");
  const { plans } = useSelector((state: RootState) => state.plan);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(allPlans(data));
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col gap-[1rem]">
      {plans.length > 0 ? (
        plans.map((plan) => (
          <PlanCard plan={plan} key={plan._id}/>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AllPlans;
