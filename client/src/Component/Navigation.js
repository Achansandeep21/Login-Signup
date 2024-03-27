import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link,  NavLink,  useNavigate } from 'react-router-dom'

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
        <NavLink to={"/home"}
        style={(obj)=>{
          if(obj.isActive==true){
            return {
              backgroundColor:"darkcyan", color:"white"
            }
          }
        }}>Home</NavLink>
        {/* <Link to={"/home"}>Home</Link> */}

        <NavLink to={"/task"}
        style={(obj)=>{
          if(obj.isActive==true){
            return {
              backgroundColor:"darkcyan", color:"white"
            }
          }
        }}
        >Task</NavLink>
        <NavLink to={"/leaves"}
        style={(obj)=>{
          if(obj.isActive==true){
            return {
              backgroundColor:"darkcyan", color:"white"
            }
          }
        }}
        >Leaves</NavLink>


        <NavLink to={"/editProfile"}
        style={(obj)=>{
          if(obj.isActive==true){
            return {
              backgroundColor:"darkcyan", color:"white"
            }
          }
        }}
        >Edit</NavLink>


            <NavLink to={"/"} onClick={()=>{
              localStorage.clear();
            }}>LogOut</NavLink>
        </nav>
    </div>
  )
}

export default Navigation