import { useEffect, useState } from "react"
import { data } from "../data"


const Quotes = () => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const todayDate = new Date().getDate();
        const randomQuote = todayDate % data.length;
        setCurrentIndex(randomQuote);
    }, [currentIndex])


  return (
    <div className='flex items-start justify-start pt-[4rem] mx-[1.5rem]'>
        <div className='flex flex-col gap-[2rem]'>
                   <h1 className='text-[2rem]'>{data[currentIndex].quote}</h1>
                   <span className='text-[1.5rem] opacity-[.5]'>{data[currentIndex].author}</span>
         </div>
    </div>
  )
}

export default Quotes