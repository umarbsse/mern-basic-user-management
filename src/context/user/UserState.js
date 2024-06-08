import React, { useState } from "react";
import UserContext from "./userContext";
export default function UserState(props) {
    const host = process.env.REACT_APP_BACKEND_URL;
    const userInitial = [];
    const [userData, setuserData] = useState({_id: "",fname: "", lname: "", gender: "", email: ""});


     //Get User data
     const getUserSetting = async () => {
        //TODO API call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
          });
          const json_response = await response.json();
          setuserData(json_response);
          //console.log(json_response);
     };



    //Update User Account Data
    const updateUserSetting = async (id, fname, lname, gender, email) => {      
      const response = await fetch(`${host}/api/auth/updateaccountsetting/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({fname, lname, gender, email}), // body data type must match "Content-Type" header
  
      });
      const json_response = await response.json();
      if(json_response.success===true){
        setuserData(json_response.is_account_setting);
      }
      return json_response;
    };


    //Update User Account Data
    const updateUserPassword = async (id, password, confirm_password) => {
      //console.log(id);   
      const response = await fetch(`${host}/api/auth/updateaccountsettingpassword/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({password, confirm_password}), // body data type must match "Content-Type" header
      });
      const json_response = await response.json();
      //console.log(json_response);
      if(json_response.success===true){
        //setuserData(json_response.is_account_setting);
      }
      return json_response;
    };
  return (
    <UserContext.Provider value={{ userData,setuserData, getUserSetting, updateUserSetting, updateUserPassword }}>
      {props.children}
    </UserContext.Provider>
  )
}





