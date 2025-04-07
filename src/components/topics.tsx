import { useEffect, useState } from 'react';
import { useStore } from '../store/store';
import { Link } from 'react-router';
import { Skeleton } from './ui/skeleton';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import toast from 'react-hot-toast';
import EmptyState from './ui/empty-state';

const Topics = () => {
  const { topics, setTopics, deleteTopic } = useStore();
  const [loading, setLoading] = useState(true);
  const [actionOpen, setActionOpen] = useState<string | null>(null); // Store open dropdown ID

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        setTopics(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDropdownToggle = (id: string) => {
    // Toggle the dropdown by ID
    setActionOpen(actionOpen === id ? null : id);
  };

  const handleDeleteTopic = async (id: string) => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/topics/topic/delete/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if(data){
        deleteTopic(data);
        toast.success('Deleted Topic');
      }
  }

  return (
    <>
      {topics.length > 0 ? (
        topics.map((topic, index) => (
          <div
            className="border relative w-full shadow-md rounded-[.5rem] p-[.8rem] flex items-center justify-between gap-[1rem] lg:gap-[.5rem]"
            key={index}
          >
            {loading ? (
              <Skeleton className="h-[2rem] w-[250px]" />
            ) : (
              <Link to={`/topic/${topic._id}/quizzes/new`} className="text-[1.2rem] hover:underline transition">
                {topic.name}
              </Link>
            )}

            <div className="flex items-center gap-[.2rem]">
              <Link to={`/topic/${topic._id}/quizzes`} className="yena-btn">
                Start
              </Link>
              <button onClick={() => handleDropdownToggle(topic._id)}>
                <EllipsisVertical className="opacity-[.5]" />
              </button>

              <DropdownMenu open={actionOpen === topic._id} onOpenChange={(open) => setActionOpen(open ? topic._id : null)}>
                <DropdownMenuTrigger />
                <DropdownMenuContent className="w-[8rem] absolute top-[2rem] right-[0rem]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer'>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => handleDeleteTopic(topic._id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Topics;
