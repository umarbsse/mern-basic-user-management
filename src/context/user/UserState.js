import React, { useState } from "react";


import UserContext from "./userContext";





export default function UserState(props) {
    const host = "http://localhost:5000";
    const userInitial = [];
    const [userData, setUserData] = useState(userInitial);

     //Get user_data
     const getUserSetting = async () => {
        console.log("Get User Data Function Called");
        //TODO API call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token'),
            },
          });
          const json = await response.json();
          setUserData(Object.values(json));
          console.log(userData);
     };
  return (
    <UserContext.Provider value={{ userData, getUserSetting }}>
      {props.children}
    </UserContext.Provider>
  )
}





