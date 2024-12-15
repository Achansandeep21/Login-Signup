import React, { useEffect, useRef, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import Navigation from './Navigation';
import { useSelector } from 'react-redux';

function EditProfile() {
  let storeObj=useSelector((store)=>{return store})

  let loc=useLocation();
    let nameRef=useRef()
    let mobileRef=useRef()
    let ageRef=useRef()
    let emailRef=useRef()
    let passwordRef=useRef()
    let profilePickRef=useRef([]);
    let [imageUrl,setImageUrl]=useState("");
    useEffect(()=>{
      if(storeObj && 
        storeObj.userDetails &&
        storeObj.userDetails.data && 
        storeObj.userDetails.data.isLoggedIn &&
        storeObj.userDetails.data.isLoggedIn == true
         ){     
         nameRef.current.value=storeObj.userDetails.data.name;
         mobileRef.current.value=storeObj.userDetails.data.MobileNo;
         ageRef.current.value=storeObj.userDetails.data.age;
         emailRef.current.value=storeObj.userDetails.data.EmailId
         setImageUrl("http://localhost:1212/"+storeObj.userDetails.data.ProfilePick)

         
        }
   })


    
    console.log(loc);
    let updateProfileUsingFormData=async()=>{
      let dataToServer=new FormData();
      dataToServer.append("name",nameRef.current.value);
      dataToServer.append("mobileNo",mobileRef.current.value);
      dataToServer.append("age",ageRef.current.value);
      dataToServer.append("emailId",emailRef.current.value);
      dataToServer.append("password",passwordRef.current.value)
      dataToServer.append("id",loc.state.data.Id);
      // dataToServer.append("profilePick",profilePickRef.current.files[0])//use to send file single file
      
      //to send multiple to server
      
       for(let i=0;i<profilePickRef.current.files.length;i++){
        dataToServer.append("profilePick",profilePickRef.current.files[i]);
       }
       
      let reqOptions={
        method:"PATCH",
        body:dataToServer,
      }
      let JSONData=await fetch("http://localhost:1212/updateProfile",reqOptions);
      let JSOData=await JSONData.json();
      alert(JSOData.msg);
      console.log(JSOData);
    }
  return (
    <div className='App'>
      <Navigation/>
        <br></br>
        <form>
          <h1>Update Profile</h1>
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
          <button type='button' onClick={()=>{updateProfileUsingFormData();}}>Update</button>
        </div>
      </form>
      <br></br><br></br>
      <Link to="/">Login</Link>
    </div>
  )
}

export default EditProfile;