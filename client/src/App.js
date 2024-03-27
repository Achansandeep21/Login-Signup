import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
// import Home from "./Component/Home";
import Leaves from "./Component/Leaves";
import Task from "./Component/Task";
import Home from './Component/Home';
import EditProfile from "./Component/EditProfile";

function App() {
  return (
    <BrowserRouter className='App'>
  
 <Routes>
 
  <Route path="/" element={<Login/>}></Route>
  <Route path="/signUp" element={<SignUp></SignUp>}></Route>
  
  <Route path="/home" element={<Home/>}></Route>
  <Route path="/leaves" element={<Leaves/>}></Route>
  <Route path="/editProfile" element={<EditProfile/>}></Route>
  
  <Route path="/task" element={<Task/>}></Route>
  
  </Routes>
  </BrowserRouter>
 
  );
}

export default App;
