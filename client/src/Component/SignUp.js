import React, { useRef, useState } from 'react'
import {Link} from 'react-router-dom'
// import '/component.css'
function SignUp() {
    let nameRef=useRef()
    let mobileRef=useRef()
    let ageRef=useRef()
    let emailRef=useRef()
    let passwordRef=useRef()
    let profilePickRef=useRef([]);
    let [imageUrl,setImageUrl]=useState("./img/profilePick.png");
    const [errors, setErrors] = useState('');
    
    const handleInputChange = (ref, fieldName) => {
      const value = ref.current.value;
  
      // Validation rules for each field
      const validations = {
        name: {
          pattern: /^[a-zA-Z ]+$/,
          message: 'Name can only contain letters and spaces',
        },
        age: {
          pattern: /^\d+$/,
          message: 'Age must be a number',
        },
        email: {
          pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          message: 'Invalid email ',
        },
        mobile: {
          pattern: /^\d{10}$/,
          message: 'Phone number must be 10 digits long',
        },
        password: {
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one  number, and one special character',
        },
      };
  
      if (!validations[fieldName].pattern.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: validations[fieldName].message,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [fieldName]: '',
        }));
      }
    };
    let errorStyle={
      color: 'white',
      width: '178px',
      backgroundColor: 'red',
      marginLeft: '122px',
      marginTop: 'auto',
    }
    const validateImage = (file) => {
      const allowedTypes = /\.(jpg|jpeg|png|gif)$/i; // Allowed image file types
      if (!allowedTypes.test(file.name)) {
        setErrors('Please upload a valid image file (JPG, JPEG, PNG, GIF)');
        return false;
      }
      setErrors('');
      return true;
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (validateImage(file)) {
        const selectedImgUrl = URL.createObjectURL(file);
        setImageUrl(selectedImgUrl);
        console.log(selectedImgUrl);
      }
    };
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
          <input ref={nameRef} placeholder="Name" onChange={() => handleInputChange(nameRef, 'name')} />
        {errors.name && <div style={ errorStyle  }>{errors.name}</div>}

        </div>
        <div>
          <label>Mobile No.</label>
          
      <input ref={mobileRef} placeholder="Phone Number" maxLength={10} onChange={() => handleInputChange(mobileRef, 'mobile')} />
      {errors.mobile && <div style={ errorStyle  }>{errors.mobile}</div>}

        </div>
        <div>
          <label>Age</label>
          <input ref={ageRef} maxLength={2} placeholder="Age" onChange={() => handleInputChange(ageRef, 'age')} />
      {errors.age && <div style={ errorStyle  }>{errors.age}</div>}

        </div>
        <div>
          <label>Email</label>
          <input ref={emailRef} placeholder="Email" onChange={() => handleInputChange(emailRef, 'email')} />
      {errors.email && <div style={ errorStyle  }>{errors.email}</div>}

        </div>
        <div>
          <label>Password</label>
          <input ref={passwordRef} type="password" placeholder="Password" onChange={() => handleInputChange(passwordRef, 'password')} />
      {errors.password && <div style={ errorStyle  }>{errors.password}</div>}

        </div>
        <div className='profileDiv'>
          <label>ProfilePick</label>
          <input type='file' accept="image/*" ref={profilePickRef}  onChange={
            handleFileChange
          //   ()=>{
          //   console.log(profilePickRef.current.files);
          //   let selectedImgUrl=URL.createObjectURL(profilePickRef.current.files[0]);
          //   setImageUrl(selectedImgUrl);
          //   console.log(selectedImgUrl);
          // }
          }></input>
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