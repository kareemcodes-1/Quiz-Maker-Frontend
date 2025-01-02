import { useEffect, useReducer, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "../../src/slices/todoApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addTodo, updateTodos } from "../../src/slices/todoSlice";
import { Badge } from "../components/ui/badge";
import { Project } from "../../types/type";
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

type State = {
  name: string;
};

type Action = {
  type: "SET_NAME";
  payload: string;
};

const initialState: State = {
  name: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

const TodoModal = ({ closeModal }: { closeModal: () => void }) => {
  const { editingMode, editingTodo } = useSelector(
    (state: RootState) => state.todo
  );
  const { projects } = useSelector((state: RootState) => state.project);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [today, setToday] = useState<boolean>(false);
  const [tomorrow, setTomorrow] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    ''
  );
  const [time, setTime] = useState<string>("morning");
  const dispatchReduxAction = useDispatch();
  
  const todayDate = new Date();
  const tomorrowDate = todayDate;
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  useEffect(() => {
    if (editingMode && editingTodo) {
      dispatch({ type: "SET_NAME", payload: editingTodo.name });
      setSelectedProjectId(editingTodo.projectId._id);
      setTime(editingTodo.time);
    } else {
      dispatch({ type: "SET_NAME", payload: "" });
    }
  }, [editingMode, editingTodo]);

  const [createTodo] = useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const formAction = async (formData: FormData) => {
    const date = today
      ? new Date().toISOString()
      : tomorrow
      ? new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()
      : null;

    if (editingMode && editingTodo) {
        const todo = {
          _id: editingTodo._id,
          projectId: {
            ...editingTodo.projectId,
            _id: selectedProjectId,
          },
          name: state.name,
          completed: editingTodo.completed,
          date,
          time,
        };

        const res = await updateTodo({ data: todo, id: editingTodo._id });
        if (res.data) {
          dispatchReduxAction(updateTodos(res.data));
          toast.success("Updated Todo");
          closeModal();
        }
    } else {
        const findProject = projects.find((project) => project._id === selectedProjectId);
        if(findProject){
          const todo = {
            _id: "",
            projectId: {
              ...findProject,
              _id: selectedProjectId
            },
            name: formData.get("name") as string,
            date,
            time,
            completed: false,
          };
          const res = await createTodo(todo);
          if (res.data) {
            dispatchReduxAction(addTodo(res.data));
            toast.success("Created Todo");
            closeModal();
        }
        }
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-start lg:text-[1.5rem] text-[1.3rem]">
          {editingMode ? "Edit" : "Create"} Todo
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
                  required
                  value={state.name}
                  onChange={(e) =>
                    dispatch({ type: "SET_NAME", payload: e.target.value })
                  }
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[1rem]">
            <h1>Select Date: </h1>
            <button
              type="button"
              className={`yena-btn ${today ? "--black" : ""} !h-[2rem]`}
              onClick={() => {
                setToday(true);
                setTomorrow(false);
              }}
            >
              Today
            </button>
            <button
              type="button"
              className={`yena-btn ${tomorrow ? "--black" : ""} !h-[2rem]`}
              onClick={() => {
                setTomorrow(true);
                setToday(false);
              }}
            >
              Tomorrow
            </button>
          </div>

          <div className="flex items-center gap-[.5rem]">
          <Select onValueChange={(value) => setSelectedProjectId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={editingMode ? editingTodo?.projectId.name : projects?.[0]?.name}
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

          <Select onValueChange={(value) => setTime(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Morning" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="night">Night</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <SubmitBtn />
        </form>
      </DialogHeader>
    </DialogContent>
  );
};

export default TodoModal;
