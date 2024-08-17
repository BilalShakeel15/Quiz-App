import React, { useContext, useEffect } from 'react';
import trophy from '../images/trophy.jpeg';
import Quizcontext from '../context/Quizcontext';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
    const { result, score, attempt, wrong, name,logout } = useContext(Quizcontext);
    const location = useLocation();
    const { time } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        result(time);
    }, []);

    const finish = () => {
        logout();
        navigate('/');
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="result-card">
                {/* Left Side: Quiz Result */}
                <div className="result-info">
                    <h2 className="mb-4 text-center">Quiz Result</h2>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Attempted Questions:</strong> {attempt}</p>
                    <p><strong>Correct Answers:</strong> {score}</p>
                    <p><strong>Wrong Answers:</strong> {wrong}</p>
                    <p><strong>Timetaken:</strong> {formatTime(time)}</p>
                    <p><strong>Final Score:</strong> {score * 10}</p>
                    <button className="btn-dark" onClick={finish}>Finish</button>
                </div>

                {/* Right Side: Trophy Image */}
                <div className="result-image">
                    <img
                        src={trophy}
                        alt="Trophy"
                    />
                </div>
            </div>
        </div>
    );
};

export default Result;
