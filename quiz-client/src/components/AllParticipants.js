import React, { useContext, useEffect } from 'react'
import Quizcontext from '../context/Quizcontext';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { useNavigate } from 'react-router-dom';

const AllParticipants = () => {
        const {allParticipants,getAllParticipants}=useContext(Quizcontext)
        const navigate=useNavigate();
    useEffect(()=>{
        getAllParticipants();
    },[getAllParticipants])

    const handledelete=(id)=>{
        createAPIEndpoint(ENDPOINTS.participant)
        .delete(id)
        .then()
        .catch(err=>console.log(err))
        
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      const handleback=()=>{
        navigate('/admin')
    }
    return (
        <div className='container'>
            <h2 className='text-center mb-5 mt-3' style={{ color: "white" }}>All Participants</h2>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Score</th>
                        <th scope="col">Timetaken</th>
                        <th scope="col" className='text-center'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {allParticipants.map((participant, index) => (
                        <tr key={participant.participantId} >
                            <th scope="row" >{index + 1}</th>
                            <td>{participant.name}</td>
                            <td >{participant.email}</td>
                            <td >{participant.score}</td>
                            <td >{formatTime(participant.timetaken)}</td>
                            <td className='text-center'>
                                <div className=''>
                                    <button className='btn btn-danger' onClick={() => { handledelete(participant.participantId) }}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn btn-secondary' onClick={handleback}>&larr; Back</button>
        </div>
    )
}

export default AllParticipants
