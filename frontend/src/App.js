import logo from './logo.svg';
import './App.css';
import { useLocation, Routes, Route } from 'react-router-dom';
import Feed from './components/feed';
import NewPost from './components/newpost';

function App() {
  return (
   <Routes>
    <Route path='/' element={<Feed/>} replace/>
      <Route path='*'
        element={<Feed/>} replace/>
    <Route path="new" element={<NewPost/>}/>
   </Routes>
  );
}

export default App;
