import  { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/accordion"
import { useStore } from '../store/store';
import { useParams } from 'react-router';
import { Skeleton } from './ui/skeleton';
import EmptyState from './ui/empty-state';


const Quizzes = () => {

     const {quizzes, setQuizzes} = useStore();
     const {id} = useParams();
     const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes/topic/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => res.json()).then((data) => setQuizzes(data)).catch((err) => console.log(err)).finally(() => setLoading(false));
      }, [])

  return (
 <Accordion type="single" collapsible className="w-full mt-[2rem]">
       {quizzes.length > 0 ? (
               quizzes.map((quiz, index) => (
                <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger>
                  <div className='w-full'>
                    <span className='opacity-[.5] text-[.9rem]'>Question</span>
                    {loading ? <Skeleton className="h-[1.5rem] mt-[.5rem] w-full" />  : <h1 className="text-[1.2rem] hover:underline transition  mt-[.5rem]" >{quiz.question}</h1>}
                  </div>
                  </AccordionTrigger>
                <AccordionContent>
                   {/* <div className='flex flex-col gap-[.5rem] mt-[1rem]'>
                    
                  <div className="border relative w-full shadow-md rounded-[.5rem] p-[.8rem] flex items-center justify-between gap-[1rem] lg:gap-[.5rem]"> */}
                    <div className='flex flex-col gap-[1rem]'>
                    <div>
                    <span className='opacity-[.5] text-[.9rem]  mb-[.8rem]'>Options</span>
                       <div className='flex flex-col gap-[.3rem]'>
                           {quiz.options.map((option) => (
                               loading ? <Skeleton className="h-[1rem] mt-[.5rem] w-full" /> : <div>{option}</div>
                           ))}
                       </div>
                    </div>
          
                    <div>
                    <span className='opacity-[.5] text-[.9rem]  mb-[.8rem]'>Correct Answer</span>
                          {loading ? <Skeleton className="h-[1rem] mt-[.5rem] w-full" /> : <div>{quiz.options[quiz.answer]}</div>}
                    </div>
                    </div>
                  {/* </div>
                  </div> */}
                </AccordionContent>
              </AccordionItem>
              ))
       ) : (
             <EmptyState />
       )}
  </Accordion>
  )
}

export default Quizzes