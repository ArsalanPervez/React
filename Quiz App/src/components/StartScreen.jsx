import React from 'react'
import './StartScreen.css'

const StartScreen = ({updateStartQuiz}) => {
    const handleClick = () => {
        updateStartQuiz(true);
      };
  return (
    <>
        <section className="splash">
            <div className="splash_inner">
                <h1 className="text-focus-in text-focus-in-h1">QUIZ APP</h1>
                <p className="text-focus-in">Explore your knowledge.</p>
                <div className="btn slide-in-bottom" onClick={handleClick}>
                    START
                </div>
            </div>
        </section>
    </>
  )
}

export default StartScreen