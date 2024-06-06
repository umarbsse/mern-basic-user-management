import React, { useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from "../context/user/userContext";

export default function Accountsetting(props) {



  
  const context = useContext(userContext);

  const { userData,setuserData, getUserSetting, updateUserSetting } = context;


  let navigate = useNavigate();
  useEffect (()=>{
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }else{
      getUserSetting();
    }
    // eslint-disable-next-line
  },[]);
  //const [credentials, setCredentials] = useState({fname: "", lname: "", gender: "", email: ""});
  //const host = process.env.REACT_APP_BACKEND_URL;



  
  const handleSubmit = async (e) =>{
      e.preventDefault();
      updateUserSetting(userData.fname, userData.lname, userData.gender, userData.email);


      /*const {fname,lname,gender, email, password} = credentials;
      //API CALL
      const response = await fetch(`${host}/api/auth/createuser/`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({fname,lname,gender, email}), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json)
      if(json.success===true){
          // Save the auth token and redirect
          localStorage.setItem('token',json.authToken);
          navigate("/login");
          props.showAlert("Account created successfully","success")
      }else{
          props.showAlert("Invalid Credentials","danger")
      }*/
  }
  
  const onChange = (e) =>{
    setuserData({...userData,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <h2>Account Setting</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">First Name</label>
          <input type="text" required className="form-control" id="fname"  value={userData.fname} name="fname" onChange={onChange}  aria-describedby="fname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lname" name="lname" value={userData.lname} onChange={onChange}  aria-describedby="lname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select required className="form-select" name='gender' value={userData.gender} onChange={onChange} aria-label="Default select example">
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" required  className="form-control" id="email" name="email"  value={userData.email} onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <button type="submit" onSubmit={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
      
      
    </div>
  )
}
