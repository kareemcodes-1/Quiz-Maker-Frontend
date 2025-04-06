import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useStore } from '../../store/store';

const QuizzesPage = () => {
  const { id } = useParams();
  const { quizzes, setQuizzes } = useStore();
  const [currentQuiz, setCurrentQuiz] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // To track correct answers
  const [quizEnded, setQuizEnded] = useState<boolean>(false); // To track quiz end state

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes/topic/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleOptionClick = (option: string, index: number) => {
    if (isAnswered) return; // Prevent further clicks once an option is selected

    setSelectedOption(option);
    setIsAnswered(true);

    // Check if the selected option is correct
    if (index === quizzes[currentQuiz].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuiz + 1 === quizzes.length) {
      setQuizEnded(true); // End quiz when all questions are answered
    } else {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedOption(null); // Reset selected option
      setIsAnswered(false); // Reset answer state
    }
  };

  const handleTryAgain = () => {
    setQuizEnded(false);
    setCurrentQuiz(0); // Start from the first quiz
    setCorrectAnswers(0); // Reset correct answers
  };

  const handleHome = () => {
    navigate('/'); // Redirect to the home page
  };

  const currentQuizData = quizzes[currentQuiz];
  const correctAnswerIndex = currentQuizData?.answer;
  const options = currentQuizData?.options;

  return (
    <div className="mx-[1.5rem] pt-[2rem]">
      {!quizEnded ? (
        <>
          <span className="text-[1.3rem]">
            {currentQuiz + 1} / {quizzes.length}
          </span>

          <div className="mt-[3rem]">
            <h1 className="text-[1.5rem]">{currentQuizData?.question}</h1>

            <div className="flex flex-col gap-[.5rem] mt-[1rem]">
              {options?.map((option, index) => {
                const isCorrect = index === correctAnswerIndex;
                const isSelected = option === selectedOption;
                const optionClass = isAnswered
                  ? isSelected
                    ? isCorrect
                      ? 'bg-green-500' // Correct answer selected
                      : 'bg-red-500' // Incorrect answer selected
                    : isCorrect
                    ? 'bg-green-500' // Correct answer, not selected
                    : ''
                  : '';

                return (
                  <div
                    key={index}
                    className={`rounded-md border px-4 py-2 font-mono text-sm shadow-sm ${isSelected ? '' : 'hover:bg-accent'} cursor-pointer ${optionClass}`}
                    onClick={() => handleOptionClick(option, index)}
                  >
                    {option}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="yena-btn w-full mt-[2rem]"
              onClick={handleNextClick}
              disabled={!isAnswered}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center mt-[3rem]">
          <h1 className="text-[1.5rem]">Quiz Ended</h1>
          <p className="text-[1.2rem] mt-2">You got {correctAnswers} questions correctly!</p>

          <div className="mt-[2rem] flex justify-center gap-[1rem]">
            <button
              className="yena-btn"
              onClick={handleHome}
            >
              Home
            </button>
            <button
              className="yena-btn"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;

