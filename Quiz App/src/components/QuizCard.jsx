import React, { useEffect, useState } from 'react';
import './QuizCard.css';

const QuizCard = ({ sendQuizData }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [updatedQuizData, setUpdatedQuizData] = useState([]);
    const [quizScore, setquizScore] = useState(0);
    const [result, setResult] = useState(false);

    useEffect(() => {
        if (sendQuizData.length > 0) {
            const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

            const updatedData = sendQuizData.map(quizItem => {
                const allOptions = [...quizItem.incorrectAnswers, quizItem.correctAnswer];
                const shuffledOptions = shuffleArray(allOptions);
                return {
                    ...quizItem,
                    shuffledOptions,
                };
            });

            setUpdatedQuizData(updatedData);
        }
    }, [sendQuizData]);

    const currentQuestion = updatedQuizData[currentQuestionIndex];

    const handleNextQuestion = () => {
        if (currentQuestionIndex < updatedQuizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            if(selectedOption == currentQuestion.correctAnswer){
                setquizScore(quizScore + 10);
            }
            setSelectedOption('');
        } else {
            setResult(true);
        }
    };

    return (
        <main>
            {!result ? <div className="game-quiz-container">
                <div className="game-details-container">
                    <h1>Score: <span id="player-score"></span> {quizScore} / 100</h1>
                    <h1>Question: <span id="question-number"></span> {currentQuestionIndex + 1} / 10</h1>
                </div>

                <div className="game-question-container">
                    <h1 id="display-question">{currentQuestion?.question.text}</h1>
                </div>

                <div className="game-options-container">
                    {currentQuestion?.shuffledOptions?.length > 0 ? 
                        currentQuestion.shuffledOptions.map((option, index) => (
                            <span key={index}>
                                <input 
                                    type="radio" 
                                    id={`option-${index}`} 
                                    name="option" 
                                    className="radio" 
                                    value={option} 
                                    checked={selectedOption === option} // Mark the selected option
                                    onChange={() => setSelectedOption(option)} // Update selected option
                                />
                                <label htmlFor={`option-${index}`} className="option" id={`option-one${index}-label`}>
                                    {option}
                                </label>
                            </span>
                        )) 
                    : null}
                </div>

                <div className="next-button-container">
                    <button onClick={handleNextQuestion} disabled={!selectedOption}>Next Question</button>
                </div>
            </div>
            : <div className="game-quiz-container">
                    <div className="game-question-container">
                        <h1 id="display-question">{((quizScore/100)*100) > 50 ? "You have passed the quiz exam" : "You have failed quiz exam" }</h1>
                        <h1 id="display-question">Total Score: {quizScore}</h1>
                    </div>
                </div>}
            
        </main>
    );
};

export default QuizCard;
