import { useEffect, useState } from 'react'
import StartScreen from './components/StartScreen'
import QuizCard from './components/QuizCard';

function App() {
  const [quizStart, setQuizStart] = useState(false)
  const [quizData, setQuizData] = useState([])
  useEffect(()=> {
    getQuizData();
  }, [])
  const getQuizData = async ()=> {
    try {
      const data = await fetch("https://the-trivia-api.com/v2/questions")
      const response = await data.json()
      setQuizData([...response])
    } catch (error) {
        console.log(error)
    }
  }
  const updateQuizStartState = (newState) => {
    setQuizStart(newState);
  };
  return (
    <>
      {!quizStart ? <StartScreen updateStartQuiz={updateQuizStartState} /> : <QuizCard sendQuizData={quizData}/>}
    </>
  )
}

export default App
