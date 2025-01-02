import { Memory } from '../../types/type'
import { Badge } from './ui/badge';
import { format } from "date-fns";

const MemoryCard = ({memory}: {memory: Memory}) => {
  return (
<div className="max-w-sm rounded overflow-hidden  shadow-lg">
  <img className="w-full h-[15rem] object-cover"  src={memory.image} alt={memory.name} />
  <div className="px-6 py-4">{memory.name}</div>
  {/* <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div> */}
   <div className="flex items-center gap-[.5rem] p-[1rem]">
      <Badge className="flex items-center gap-[.3rem]">
            <div
              style={{ background: memory.projectId.color }}
              className="rounded-full p-[.3rem]"
              />{" "}
              <div>{memory.projectId.name}</div>
        </Badge>
      <Badge>{format(new Date(memory.createdAt).toISOString(), "dd-MM-yyyy")}</Badge>
    </div>
</div>
  )
}

export default MemoryCard