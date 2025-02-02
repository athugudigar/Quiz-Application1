import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./components/Quiz";

const API_URL = "https://api.jsonserve.com/Uw5CrX"; // API might be down

function App() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setQuizData(response.data);
        } else {
          throw new Error("Invalid API response");
        }
        setLoading(false);
      })
      .catch(() => {
        console.error("API failed. Using mock data.");
        setQuizData([
          {
            question: "What is the capital of France?",
            options: [
              { text: "Paris", isCorrect: true },
              { text: "London", isCorrect: false },
              { text: "Berlin", isCorrect: false },
              { text: "Madrid", isCorrect: false }
            ]
          },
          {
            question: "What is 2 + 2?",
            options: [
              { text: "3", isCorrect: false },
              { text: "4", isCorrect: true },
              { text: "5", isCorrect: false },
              { text: "6", isCorrect: false }
            ]
          }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Quiz App</h1>
      {loading ? <p>Loading quiz questions...</p> : <Quiz questions={quizData} />}
    </div>
  );
}

export default App;