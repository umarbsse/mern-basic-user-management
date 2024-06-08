import React, {useEffect, useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from "../context/user/userContext";

export default function Changepassword(props) {
  
  const context = useContext(userContext);

  const { userData, updateUserPassword } = context;


  let navigate = useNavigate();
  useEffect (()=>{
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;
    let json_response = await updateUserPassword(userData._id, password, confirm_password);
    //console.log(json_response)
    if(json_response.success===true){
      props.showAlert("Account password Update","success")
    }else{
      props.showAlert(json_response.response,"danger")
    }
}
  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input type="password" required className="form-control" id="password" name="password" aria-describedby="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">Confirm New Password</label>
          <input type="password" required className="form-control" id="confirm_password" name="confirm_password" aria-describedby="confirm_password"/>
        </div>
        <button type="submit" onSubmit={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
      
      
    </div>
  )
}
