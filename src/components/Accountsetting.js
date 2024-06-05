import React, { useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from "../context/user/userContext";

export default function Accountsetting(props) {



  
  const context = useContext(userContext);

  const { userData, getUserSetting } = context;


  let navigate = useNavigate();
  useEffect (()=>{
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }else{
      getUserSetting();
    }
    // eslint-disable-next-line
  },[]);

  
  const [accountdata, setAccountdata] = useState({fname: "", lname: "", gender: "", email: ""});
  const [credentials, seCredentials] = useState({fname: ""});


  

  

 const host = process.env.REACT_APP_BACKEND_URL;
/*   const getuserData = async () =>{
    //API CALL to display data in fields
    const response = await fetch(`${host}/api/auth/getuser/`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        },
    });
    const json = await response.json();
    //setAccountdata()
    //const {fname, lname, gender, email} = json;
    console.log(json);
    //console.log(fname);
}

*/



  
  const handleSubmit = async (e) =>{
      e.preventDefault();
      const {fname,lname,gender, email, password} = credentials;


      //API CALL
      const response = await fetch(`${host}/api/auth/createuser/`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
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

      



      <h2 className='my-2'>Account Setting</h2>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">First Name</label>
          <input type="text" required className="form-control" id="fname"  value={accountdata.fname} name="fname" onChange={onChange}  aria-describedby="fname"/>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
      
      <div className="row my-3">
        <h1>user data</h1>

        <ul>
        {Array.isArray(userData) && userData.map(item => {
          return <li>{item}</li>;
        })}
      </ul>
      </div>
    </div>
  )
}
