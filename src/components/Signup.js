import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

export default function Signup(props) {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [credentials, seCredentials] = useState({fname: "",lname: "",gender: "",email: "",password:"",cpassword:""})
  let navigate  = useNavigate ();
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const {fname,lname,gender, email, password} = credentials;


      //API CALL
      const response = await fetch(`${host}/api/auth/createuser/`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({fname,lname,gender, email, password}), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      //console.log(json)
      if(json.success===true){
          // Save the auth token and redirect
          localStorage.setItem('token',json.authToken);
          navigate("/login");
          props.showAlert("Account created successfully","success")

      }else{
          props.showAlert("Invalid Credentials","danger")
      }
  }
  const onChange = (e) =>{
      seCredentials({...credentials,[e.target.name]:e.target.value})
  }
  return (
    <div className='mt-2'>
      <h2 className='my-2'>Create an account to use iNoteBook</h2>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">First Name</label>
          <input type="text" required className="form-control" id="fname" name="fname" onChange={onChange}  aria-describedby="fname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lname" name="lname" onChange={onChange}  aria-describedby="lname"/>
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select required className="form-select" name='gender'  onChange={onChange} aria-label="Default select example">
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" required  className="form-control" id="email" name="email" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" required  className="form-control" id="password" name="password" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" required  className="form-control" id="cpassword" name="cpassword" onChange={onChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" required id="toc" name='toc' />
          <label required className="form-check-label"  htmlFor="exampleCheck1">Agree to all terms and conditions</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}