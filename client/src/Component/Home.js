import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
    let loc=useLocation();
    let navigate=useNavigate();

    let storeObj=useSelector((store)=>{return store})
    let [userName,setUserName]=useState("");
    let [profilePath,setProfilePath]=useState("");

    console.log(loc);
    useEffect(()=>{
         if(storeObj && 
      storeObj.userDetails &&
      storeObj.userDetails.data && 
      storeObj.userDetails.data.isLoggedIn &&
      storeObj.userDetails.data.isLoggedIn == true
       ){     
        setUserName(storeObj.userDetails.data.name);
        setProfilePath("http://localhost:1212/"+storeObj.userDetails.data.ProfilePick)



       }
    })
    let deleteAccount= async()=>{
        let url=`http://localhost:1212/deleteAccount?id=${storeObj.userDetails.data.Id}`;
        console.log(url);
        let reqOptions={
            method:"DELETE"
        }
        let JSONData=await fetch(url,reqOptions);
        let JSOData=await JSONData.json();
        if(JSOData.status=="Success")
        {
            alert(JSOData.msg);
            localStorage.clear();
            navigate("/");

        }
    }
  return (
    <div className='home'>
        <Navigation userDetails={loc.state}/>
        <br></br>
        <button type='button' onClick={()=>{deleteAccount();}}>Delete Account</button>
        <h1>Home</h1>
        <h1>Welcome {userName}</h1>
        <img src={profilePath}></img>

    </div>
  )
}

export default Home