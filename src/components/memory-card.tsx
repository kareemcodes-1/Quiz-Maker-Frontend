import React from 'react'
import { Memory } from '../../types/type'
import { Badge } from './ui/badge';
import { format } from "date-fns";

const MemoryCard = ({memory}: {memory: Memory}) => {
  return (
    <div className="card bg-base-100 w-[20rem] shadow-xl h-[20rem]">
     <figure className='cursor-pointer'>
    <img
      src={memory.image}
      alt={memory.name} />
  </figure>
  <div className="card-body flex flex-row items-center justify-between w-full">
    <h2 className="card-title">
      {memory.name}
    </h2>
    <div className="flex items-center gap-[.5rem]">
      <Badge className="flex items-center gap-[.3rem]">
            <div
              style={{ background: memory.projectId.color }}
              className="rounded-full p-[.3rem]"
              />{" "}
              <div>{memory.projectId.name}</div>
        </Badge>
      <Badge>{format(new Date(memory.createdAt).toISOString(), "yyyy/MM/dd")}</Badge>
    </div>
  </div>
</div>
  )
}

export default MemoryCard