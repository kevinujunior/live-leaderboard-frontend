import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { getLoggedInUser } from './utils/auth';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element=<Login/> />
        <Route path="/signup" element=<Signup/> />
        <Route path="/" element={getLoggedInUser()==='none'?<Login/>:<Home/>}/>
        <Route path="/home" element=<Home/> />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
