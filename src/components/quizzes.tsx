import  { useEffect } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../components/ui/accordion"
import { useStore } from '../store/store';
import { useParams } from 'react-router';

const Quizzes = () => {

     const {quizzes, setQuizzes} = useStore();
     const {id} = useParams();

      useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes/topic/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => res.json()).then((data) => setQuizzes(data)).catch((err) => console.log(err));
      }, [])

  return (
 <Accordion type="single" collapsible className="w-full mt-[2rem]">
       {quizzes.map((quiz, index) => (
         <AccordionItem value={`item-${index + 1}`}>
         <AccordionTrigger>
           <div>
             <span className='opacity-[.5] text-[.9rem]'>Question</span>
             <h1 className="text-[1.2rem] hover:underline transition  mt-[.5rem]" >{quiz.question}</h1>
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
                         <div>{option}</div>
                    ))}
                </div>
             </div>
   
             <div>
             <span className='opacity-[.5] text-[.9rem]  mb-[.8rem]'>Correct Answer</span>
                     <div>{quiz.options[quiz.answer]}</div>
             </div>
             </div>
           {/* </div>
           </div> */}
         </AccordionContent>
       </AccordionItem>
       ))}
  </Accordion>
  )
}

export default Quizzes