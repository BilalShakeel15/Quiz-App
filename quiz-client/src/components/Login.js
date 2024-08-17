import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import {jwtDecode} from "jwt-decode";
import Quizcontext from '../context/Quizcontext';

const Login = () => {
    const [credit, setCredit] = useState({ Email: "", Username: ""});
    const [user,setUser]=useState({email: "", name: "",score:0,timetaken:0})
    const {isAuthenticated,setisAuthenticated,login}=useContext(Quizcontext);

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredit(prevCredit => ({
            ...prevCredit,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await createAPIEndpoint(ENDPOINTS.auth).post(credit);
        const temp = res.data.token;

        if (temp) {
            localStorage.setItem('token', temp);
            login();
            setisAuthenticated(true);

            const decodedToken = jwtDecode(temp);
            const userRole = decodedToken.role;

            if (userRole === "Admin") {
                navigate('/admin'); // Navigate to the admin panel
            } else {
                // Update the user state with the email and name
                const updatedUser = { email: credit.Email, name: credit.Username, score: 0, timetaken: 0 };
                setUser(updatedUser);

                // Store the updated user in localStorage
                localStorage.setItem('user', JSON.stringify(updatedUser));

                navigate('/quiz'); // Navigate to the quiz page
            }
        }
    } catch (err) {
        console.error("Login failed:", err);
    }

    setCredit({ Email: "", Username: "" });
};

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <form
                className='transparent-form p-4'
                style={{ width: '300px' }}
                onSubmit={handleSubmit}
            >
                <h2 className='text-center'>Quiz App</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input
                        type="email"
                        name='Email'
                        value={credit.Email}
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Username</label>
                    <input
                        type="text"
                        name='Username'
                        value={credit.Username}
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputName"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Start</button>
            </form>
        </div>
    );
}

export default Login;
