import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskList from './pages/TaskList';
import EditTask from './pages/EditTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList/>}/>
        <Route path="/edit" element={<EditTask/>}/>
      </Routes>
    </Router>
  );
}

export default App;
