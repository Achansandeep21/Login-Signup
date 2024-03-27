import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

function Navigation(props) {
  let navigate=useNavigate();
  let storeObj=useSelector((store)=>{return store});
  useEffect(()=>{
    console.log("inside navigation onload")
    if(storeObj && 
      storeObj.userDetails &&
      storeObj.userDetails.data && 
      storeObj.userDetails.data.isLoggedIn &&
      storeObj.userDetails.data.isLoggedIn == true
       ){     
       }
       else{
        navigate("/");
       }
       console.log(storeObj);

  },[])
  

  return (
    <div>
        <nav>
            <Link to={"/home"}>Home</Link>

            <Link to={"/task"}>Task</Link>
            <Link to={"/leaves"}>Leaves</Link>
          

            <Link to={"/editProfile"}>Edit</Link>

            <Link to={"/"} onClick={()=>{
              localStorage.clear();
            }}>LogOut</Link>
        </nav>
    </div>
  )
}

export default Navigation