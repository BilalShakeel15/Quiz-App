import React, { useContext, useEffect } from 'react';
import Quizcontext from '../context/Quizcontext';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useNavigate } from 'react-router-dom';

const QuestionPool = () => {
    const { allQuestion, getAllQuestion, geteachQuestion } = useContext(Quizcontext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllQuestion();
    }, [getAllQuestion]);

    const handledelete = (ind) => {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`,
        };
        createAPIEndpoint(ENDPOINTS.question)
            .delete(ind,headers)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const handleEdit = async (id) => {
        navigate('/editquestion', { state: { id } });
    }
    const handleback = () => {
        navigate('/admin')
    }

    return (
        <div className='container'>
            <h2 className='text-center mb-5 mt-4' style={{ color: "white" }}>Question Pool</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">Option 0</th>
                        <th scope="col">Option 1</th>
                        <th scope="col">Option 2</th>
                        <th scope="col">Option 3</th>
                        <th scope="col">Answer</th>
                        <th scope="col" className='text-center'>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {allQuestion.map((question, index) => (
                        <tr key={question.questionId} >
                            <th scope="row" >{index + 1}</th>
                            <td>{question.question}</td>
                            <td style={{ backgroundColor: question.answer === 0 ? "lightgreen" : "" }}>{question.option1}</td>
                            <td style={{ backgroundColor: question.answer === 1 ? "lightgreen" : "" }}>{question.option2}</td>
                            <td style={{ backgroundColor: question.answer === 2 ? "lightgreen" : "" }}>{question.option3}</td>
                            <td style={{ backgroundColor: question.answer === 3 ? "lightgreen" : "" }}>{question.option4}</td>
                            <td>{question.answer}</td>
                            <td>
                                <div className='d-flex'>
                                    <button className='btn btn-secondary mx-3' onClick={() => { handleEdit(question.questionId) }}>Edit</button>
                                    <button className='btn btn-danger' onClick={() => { handledelete(question.questionId) }}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-secondary' onClick={handleback}>&larr; Back</button>
        </div>
    );
}

export default QuestionPool;
