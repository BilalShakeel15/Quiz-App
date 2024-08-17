import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Quizcontext from '../context/Quizcontext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(Quizcontext);

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
