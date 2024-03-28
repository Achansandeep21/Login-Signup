import React, { useEffect, useRef } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
function Login() {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
  
    let validateLoginWithServer=async()=>{
        let dataToServer=new FormData();
        dataToServer.append("email",emailInputRef.current.value);
        dataToServer.append("password",passwordInputRef.current.value);
        let reqOptions={
            method:"POST",
            body:dataToServer,
        };
        let JSONData=await fetch("http://localhost:1212/validateLogin/validatedLogin",reqOptions);
        let JSOData=await JSONData.json();
        if(JSOData.status=='error'){
            alert(JSOData.msg)
        }else{
            // localStorage.setItem("email",emailInputRef.current.value);
            // localStorage.setItem("password",passwordInputRef.current.value);
            localStorage.setItem("token",JSOData.data.token);
            navigate("/home",{state:JSOData});
        }
        console.log(JSOData);
    }
    let validateLoginWithAxios=async()=>{
        let dataToServer=new FormData();
        dataToServer.append("email",emailInputRef.current.value);
        dataToServer.append("password",passwordInputRef.current.value);
        //let response=await axios.post("http://localhost:1212/validatedLogin",dataToServer)
        
        //we write because the url is same so i have writen baseUrl in useeffect
        let response=await axios.post("/validateLogin/validatedLogin",dataToServer)

        //
        if(response.data.status=='error'){
            alert(response.data.msg)
        }else{
      
            localStorage.setItem("token",response.data.data.token);
            let obj={
                type:"login", 
                data:response.data,
             }
                dispatch(obj);
            navigate("/home",{state:response.data});
        }
        console.log(response);
    }
    let autoLoginWithServer=async()=>{
        if(localStorage.getItem("token")){
            let dataToServer=new FormData();
            dataToServer.append("token",localStorage.getItem("token"));
            
    
            let response=await axios.post("/validateLogin/validatedLogin",dataToServer)
            if(response.status=='error'){
                alert(response.msg)
            }else{
                let obj={
                    type:"login", 
                    data:response.data,
                 }
                    dispatch(obj);
                navigate("/home",{state:response.data});
            }
            console.log(response);
        }
       
    }
    useEffect(()=>{
        emailInputRef.current.value=localStorage.getItem("email");
        passwordInputRef.current.value=localStorage.getItem("password");
        axios.defaults.baseURL="http://localhost:1212";//saying that we are using same url for all API
        
        //if we want to authenicate for every api call we will write the code below
       axios.defaults.headers.common["authorisation"] = localStorage.getItem("token");

        autoLoginWithServer();
    })
  return (
    <div className='App'>
    
    <div className='loginForm'>
        
        <form><h1>Login</h1>
            <div>
            <label>EmailId</label>
            <input ref={emailInputRef}></input>
            </div>
            <div>
            <label>Password</label>
            <input type='password' ref={passwordInputRef} ></input>
            </div>
        <div>
            <button type='button' onClick={()=>{validateLoginWithAxios();}}>Login</button>
        </div>
        </form>
    </div>
    <br></br>
    <Link to="/signup">SignUp</Link>
    
    </div>
  )
}

export default Login