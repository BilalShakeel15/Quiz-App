import React, { useState } from 'react';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // console.log(formData);
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    createAPIEndpoint(ENDPOINTS.question)
    .post(formData,headers)
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

    setFormData({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: ''
      })


  };
  const handleback=()=>{
    navigate('/admin')
  }

  return (
    <div className="container container-addquestion mt-5">
      <h2 className="text-center">Add a New Question</h2>
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
            placeholder='(eg: 0,1,2,3)'
            className="form-control"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </div>
        <div className='d-flex justify-content-between'> 
        <button className='btn btn-secondary btn-block mt-4' onClick={handleback}>&larr; Home</button>
        <button type="submit" className="btn btn-success btn-block mt-4">Submit &rarr;</button>
        </div>
      </form>
      
    </div>
  );
};

export default AddQuestion;
