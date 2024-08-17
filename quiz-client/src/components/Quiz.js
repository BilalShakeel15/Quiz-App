import React, { useContext, useEffect, useState } from 'react';
import Quizcontext from '../context/Quizcontext';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { Qns, getQns, update_answer, answers,logout } = useContext(Quizcontext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [prog, setProg] = useState(0);
  const [time, setTime] = useState(0); // Timer state
  const [selectedOptions, setSelectedOptions] = useState({}); // State to track selected options
  const navigate = useNavigate();

  useEffect(() => {
    getQns();

    // Start the timer when the quiz starts
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex === Qns.length - 1) {
      navigate('/result', { state: { time } });
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      let temp = ((currentQuestionIndex + 1) / Qns.length) * 100;
      setProg(temp);
    }
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    let temp = ((currentQuestionIndex - 1) / Qns.length) * 100;
    setProg(temp);
  };

  const handleOption = (ans, ind) => {
    update_answer(ans, ind);
    setSelectedOptions((prevState) => ({
      ...prevState,
      [currentQuestionIndex]: ans,
    }));
    let temp = ((currentQuestionIndex + 1) / Qns.length) * 100;
    setProg(temp);

    if (currentQuestionIndex !== Qns.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  if (Qns.length === 0) {
    return <div className="container d-flex justify-content-center align-items-center vh-100">Loading...</div>;
  }

  const currentQuestion = Qns[currentQuestionIndex];

  // Format time in mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const listItems = [];
  for (let i = 1; i <= 4; i++) {
    listItems.push(currentQuestion[`option${i}`]);
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="transparent-card w-75 p-4 shadow">
        <div className="progress" role="progressbar" aria-label="Default striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar progress-bar-striped" style={{ width: `${prog}%` }}></div>
        </div>
        <div className="d-flex justify-content-between">
          <h4 className="card-title">{`Question ${currentQuestionIndex + 1} of ${Qns.length}`}</h4>
          <h4 className="card-title">{formatTime(time)}</h4> {/* Timer */}
        </div>

        <h4 className="card-title">{` ${currentQuestion.question}`}</h4>
        <ul className="list-group list-group-flush">
          {listItems.map((item, index) => (
            <label key={index}>
              <li
                className="list-group-item my-2"
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedOptions[currentQuestionIndex] === index ? "#b0d0ff" : "",
                  borderRadius:"8px"
                }}
                onClick={() => handleOption(index, currentQuestionIndex)}
              >
                {String.fromCharCode(65 + index)}. {item}
              </li>
            </label>
          ))}
        </ul>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex === Qns.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
