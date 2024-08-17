import React, { useContext, useEffect, useState } from 'react';
import Quizcontext from '../context/Quizcontext';
import { useLocation, useNavigate } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';

const EditQuestion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};
    const { eachQuestion, geteachQuestion } = useContext(Quizcontext);

    const [formData, setFormData] = useState({
        questionId: id,
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
    });

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (id && !isInitialized) {
            geteachQuestion(id);
            setIsInitialized(true); // Set initialization to true to avoid running again
        }
    }, [id, geteachQuestion, isInitialized]);

    useEffect(() => {
        if (eachQuestion && isInitialized) {
            setFormData({
                questionId: id,
                question: eachQuestion.question || '',
                option1: eachQuestion.option1 || '',
                option2: eachQuestion.option2 || '',
                option3: eachQuestion.option3 || '',
                option4: eachQuestion.option4 || '',
                answer: eachQuestion.answer || ''
            });
        }
    }, [eachQuestion, isInitialized]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle numeric values
        const newValue = name === 'answer' ? parseInt(value, 10) || '' : value;
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const handleBack = () => {
        navigate('/admin');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`,
        };

        // Add your logic to update the question here
        try {
            await createAPIEndpoint(ENDPOINTS.question).put(id, formData,headers);
            navigate('/questionpool'); // Navigate back to admin after successful submission
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    return (
        <div className="container container-addquestion mt-5">
            <h2 className="text-center">Edit Question</h2>
            <form className="add-question-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="option1">Option 0</label>
                    <input
                        type="text"
                        className="form-control"
                        id="option1"
                        name="option1"
                        value={formData.option1}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="option2">Option 1</label>
                    <input
                        type="text"
                        className="form-control"
                        id="option2"
                        name="option2"
                        value={formData.option2}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="option3">Option 2</label>
                    <input
                        type="text"
                        className="form-control"
                        id="option3"
                        name="option3"
                        value={formData.option3}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="option4">Option 3</label>
                    <input
                        type="text"
                        className="form-control"
                        id="option4"
                        name="option4"
                        value={formData.option4}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answer">Correct Answer</label>
                    <input
                        type="text"
                        placeholder='(e.g., 0,1,2,3)'
                        className="form-control"
                        id="answer"
                        name="answer"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='d-flex justify-content-between'>
                    <button className='btn btn-secondary btn-block mt-4' onClick={handleBack}>&larr; Back</button>
                    <button type="submit" className="btn btn-success btn-block mt-4">Submit &rarr;</button>
                </div>
            </form>
        </div>
    );
}

export default EditQuestion;
