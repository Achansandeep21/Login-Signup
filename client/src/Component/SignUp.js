import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
function SignUp() {
    let nameRef=useRef()
    let mobileRef=useRef()
    let ageRef=useRef()
    let emailRef=useRef()
    let passwordRef=useRef()
    let profilePickRef=useRef([]);
    let [imageUrl,setImageUrl]=useState("./img/profilePick.png");
    
    let SignUpToForm=async()=>{
      let dataToServer=new FormData();
      dataToServer.append("name",nameRef.current.value);
      dataToServer.append("mobileNo",mobileRef.current.value);
      dataToServer.append("age",ageRef.current.value);
      dataToServer.append("emailId",emailRef.current.value);
      dataToServer.append("password",passwordRef.current.value)
      dataToServer.append("profilePick",profilePickRef.current.files[0])//use to send file single file
      
      //to send multiple to server
      /**
       for(int i=0;i<profilePickRef.current.files.length;i++){
        dataToServer.append("profilePick",profilePickRef.current.files[i]);
       }
       */
      let reqOptions={
        method:"POST",
        body:dataToServer,
      }
      let JSONData=await fetch("http://localhost:1212/signUp",reqOptions);
      let JSOData=await JSONData.json();
      alert(JSOData.msg)
      console.log(JSOData);
      
    }
  return (
    <div className='App'>
        <br></br>
        <form>
          <h1>SignUp</h1>
        <div>
          <label>Name</label>
          <input ref={nameRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type='' ref={passwordRef}></input>
        </div>
        <div className='profileDiv'>
          <label>ProfilePick</label>
          <input type='file' ref={profilePickRef}  onChange={()=>{
            console.log(profilePickRef.current.files);
            let selectedImgUrl=URL.createObjectURL(profilePickRef.current.files[0]);
            setImageUrl(selectedImgUrl);
            console.log(selectedImgUrl);
          }}></input>
        </div>
        
        <div className='imgDiv'>
          <img id='profilePick' src={imageUrl} alt='hello'></img>
        </div>
          
        <div>
          <button type='button' onClick={()=>{SignUpToForm();}}>SignUp</button>
        </div>
      </form>
      <br></br>
      <Link to="/">Login</Link>
    </div>
  )
}

export default SignUp;