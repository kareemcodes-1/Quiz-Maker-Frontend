
import { FaBoxOpen } from "react-icons/fa6";

const EmptyState = () => {
  return (
    <div className='flex items-center justify-center flex-col mt-[5rem]'>
        <FaBoxOpen size={120} className='opacity-[.5]'/>
        <span className='text-[1.2rem]'>Here is empty..</span>
    </div>
  )
}

export default EmptyState