import React, { useState } from "react";
import UserContext from "./userContext";
export default function UserState(props) {
    const host = process.env.REACT_APP_BACKEND_URL;
    const userInitial = [];
    const [userData, setuserData] = useState({fname: "", lname: "", gender: "", email: ""});


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
     };



     //Update User Account Data
    const updateUserSetting = async (fname, lname, gender, email) => {
      console.log("Update user setting")  ;
      console.log(fname+" = "+lname+" = "+gender+" = "+email)  ;
    };
     


  return (
    <UserContext.Provider value={{ userData,setuserData, getUserSetting, updateUserSetting }}>
      {props.children}
    </UserContext.Provider>
  )
}





