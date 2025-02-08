
import { useParams } from 'react-router'
import Layout from '../../layout';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store/store';
import { useGetAllFlashCardsQuery } from '../../slices/flashCardApiSlice';
import { allFlashCards } from '../../slices/flashCardSlice';
import {motion} from "framer-motion";
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

const TopicPage = () => {

    const {id} = useParams();
    const {flashcards} = useSelector((state: RootState) => state.flashcard);
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const dispatch = useDispatch();

    const {data, isFetching} = useGetAllFlashCardsQuery('');
    
    useEffect(() => {
        if(data && !isFetching){
          dispatch(allFlashCards(data));
         }
      })

      const filteredFlashCards = flashcards.filter((flashcard) => flashcard.topicId === id);

      function handleNext(){
         if(currentIndex + 1 < flashcards.length){
          setCurrentIndex((currentIndex) => currentIndex + 1);
         }
      }

      function handlePrev(){
        if(currentIndex > 1){
          setCurrentIndex((currentIndex) => currentIndex - 1);
         }
     }

    

  return (
    <Layout>
          <div className='flex lg:items-center items-start justify-between w-full lg:flex-row flex-col mt-[1rem] mb-[2rem]'>
               <h1 className='lg:text-[3rem] text-[2rem]'>Learning JavaScript</h1>
               {/* <button type='button' className='yena-btn-black dark:yena-btn' onClick={() => {dispatch(setOpenTopicModal(true)); dispatch(setEditing())}}>Create new</button> */}
          </div>

      <div className="w-full flex items-center justify-center">
      <div className="relative lg:w-[80%] w-full h-[350px]">
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateX: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side */}
          <div
            className="absolute  flex-col w-full h-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md flex items-center justify-center text-lg font-semibold text-gray-800 dark:text-white"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className='lg:text-[1.7rem] text-[1.5rem] text-center'>{filteredFlashCards[currentIndex]?.frontContent}</div>

            <button
        className="yena-btn-black dark:yena-btn mt-[1.2rem] flex gap-[.3rem] items-center"
        onClick={() => setIsFlipped(!isFlipped)}
               >
         <CursorArrowRaysIcon className='w-[1.5rem] h-[1.5rem]'/> Click to flip
             </button>
          </div>

          {/* Back Side */}
          <div
            className="absolute flex-col w-full h-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6 rounded-md shadow-md flex items-center justify-center text-lg font-semibold text-gray-800 dark:text-white"
            style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
          >
            <div className='text-[1.7rem]'>{filteredFlashCards[currentIndex]?.backContent}</div>

            <button
        className="yena-btn-black dark:yena-btn mt-[1.2rem] flex gap-[.3rem] items-center"
        onClick={() => setIsFlipped(!isFlipped)}
               >
         <CursorArrowRaysIcon className='w-[1.5rem] h-[1.5rem]'/> Click to flip
             </button>
          </div>
        </motion.div>

        
      <div className='mt-[2rem] flex items-center justify-between'>
          <button className='yena-btn-black dark:yena-btn' onClick={handlePrev}>Previous</button>
          <div className='text-muted-foreground font-bold'>{currentIndex + 1} of {flashcards.length}</div>
          <button className='yena-btn-black dark:yena-btn' onClick={handleNext}>Next</button>
      </div>
      </div>
    </div>
    </Layout>
  )
}

export default TopicPage