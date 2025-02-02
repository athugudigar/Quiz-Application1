import React, { useState, useEffect } from "react";
import { Howl } from "howler";  // For sound effects

const correctSound = new Howl({ src: ["/sounds/correct.mp3"] });
const wrongSound = new Howl({ src: ["/sounds/wrong.mp3"] });

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleAnswerClick(false);
    }
  }, [timeLeft]);

  if (!questions || questions.length === 0) {
    return <p>Loading quiz questions...</p>;
  }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      correctSound.play();
    } else {
      wrongSound.play();
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setShowResults(true);
    }
  };

  return (
    <div>
      {showResults ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score}/{questions.length}</p>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <p>Time Left: {timeLeft}s</p>
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerClick(option.isCorrect)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;