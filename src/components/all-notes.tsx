import  { useEffect } from "react";
import { useGetAllNotesQuery } from "../slices/noteApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { allNotes, } from "../slices/noteSlice";

import NoteCard from "./note-card";
import EmptyState from "./empty-state";

const AllNotes = () => {
  const { data, isFetching } = useGetAllNotesQuery("");
  const { notes } = useSelector((state: RootState) => state.note);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(allNotes(data));
    }
  }, [data, dispatch, isFetching]);

  return (
    <div className="flex flex-col gap-[1rem]">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard note={note} key={note._id}/>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default AllNotes;
