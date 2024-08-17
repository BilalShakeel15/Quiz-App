import React, { useState } from 'react'
import Quizcontext from './Quizcontext'
import { createAPIEndpoint, ENDPOINTS } from '../api';

const QuizState = (props) => {
  const [Qns, setQns] = useState([]);
  const [allQuestion, setallQuestion] = useState([]);
  const [allParticipants, setallParticiants] = useState([]);
  const [eachQuestion, seteachQuestion] = useState([])
  let correctAns = [];
  const [answers, setAnswers] = useState([])
  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [name, setName] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const update_answer = (ans, ind) => {
    answers[ind] = ans;

  }

  const login = () => {
    setisAuthenticated(true);
  }

  const logout = () => {

    setisAuthenticated(false);
  }

  const result = (t) => {

    for (let index = 0; index < Qns.length; index++) {
      correctAns[index] = Qns[index].answer;
    }
    setAttempt(answers.length)
    let tempscore = 0;
    for (let index = 0; index < answers.length; index++) {
      if (answers[index] == correctAns[index]) {
        tempscore++;
      }

    }
    setScore(tempscore);
    setWrong(answers.length - tempscore);
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setName(user.name);

      user.score = tempscore * 10;
      user.timetaken = t;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      createAPIEndpoint(ENDPOINTS.participant)
        .post(user)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

  }

  const getQns = async () => {
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => setQns(res.data))
      .catch(err => console.log(err))
  }
  const getAllQuestion = async () => {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    createAPIEndpoint(ENDPOINTS.allquestion)
      .fetchall(headers)
      .then(res => setallQuestion(res.data))
      .catch(err => console.log(err))
  }
  const geteachQuestion = (id) => {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    createAPIEndpoint(ENDPOINTS.question)
      .fetchById(id,headers)
      .then(res => seteachQuestion(res.data))
      .catch(err => console.log(err))
  }
  const getAllParticipants = async () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .fetch()
      .then(res => setallParticiants(res.data))
      .catch(err => console.log(err))
  }

  return (
    <Quizcontext.Provider value={{ Qns, setQns, getQns, update_answer, answers, result, score, attempt, wrong, name, isAuthenticated,setisAuthenticated, login, logout, allQuestion, getAllQuestion, eachQuestion, geteachQuestion, allParticipants, getAllParticipants }}>
      {props.children}
    </Quizcontext.Provider>
  )
}

export default QuizState