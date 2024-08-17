import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate=useNavigate();
    const handleAddQuestion=()=>{
        navigate('/addquestion');
    }
    const handleQuestionPool=()=>{
        navigate('/questionpool');
    }
    const handleparticipants=()=>{
      navigate('/allparticipants')
    }
    const handlelogout=()=>{
      localStorage.removeItem('token');
      navigate('/');
    }
  return (
    <>
      <h2 className='text-center mt-5 admin-title animate-text'>Welcome to Admin Panel</h2>
      <h2 className='text-center mt-5 admin-title'>Quiz App</h2>
      <div className="container d-flex justify-content-center admin-opt  min-vh-100">
        <div className="row g-4 text-center">
          <div className="col-12 col-md-3">
            <div className="admin-box" onClick={handleAddQuestion}>
              <h2>Add Question</h2>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="admin-box" onClick={handleQuestionPool}>
              <h2>Question Pool</h2>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="admin-box" onClick={handleparticipants}>
              <h2>Participants</h2>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="admin-box" onClick={handlelogout}>
              <h2>Logout</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
