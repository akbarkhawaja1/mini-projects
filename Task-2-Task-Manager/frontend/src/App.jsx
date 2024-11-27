import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskManager from './components/TaskManager';
import TaskEdit from './components/TaskEdit';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="home-heading" >Task 2: Task Manager</h1>
        <Routes>
          < Route path='/' element = {<TaskManager /> } /> 
          < Route path='/tasks/:id' element = {<TaskEdit /> } /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
