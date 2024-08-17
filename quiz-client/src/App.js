import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Quiz from './components/Quiz';
import QuizState from './context/QuizState';
import Result from './components/Result';
import Admin from './components/Admin';
import AddQuestion from './components/AddQuestion';
import QuestionPool from './components/QuestionPool';
import EditQuestion from './components/EditQuestion';
import AllParticipants from './components/AllParticipants';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <QuizState>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route
            exact
            path='/quiz'
            element={<ProtectedRoute element={Quiz} />}
          />
          <Route
            exact
            path='/result'
            element={<ProtectedRoute element={Result} />}
          />
          <Route
            exact
            path='/admin'
            element={<ProtectedRoute element={Admin} />}
          />
          <Route
            exact
            path='/addquestion'
            element={<ProtectedRoute element={AddQuestion} />}
          />
          <Route
            exact
            path='/questionpool'
            element={<ProtectedRoute element={QuestionPool} />}
          />
          <Route
            exact
            path='/editquestion'
            element={<ProtectedRoute element={EditQuestion} />}
          />
          <Route
            exact
            path='/allparticipants'
            element={<ProtectedRoute element={AllParticipants} />}
          />
        </Routes>
      </BrowserRouter>
    </QuizState>
  );
}

export default App;
