import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Accountsetting() {
  let navigate = useNavigate();
  useEffect (()=>{
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])
  return (
    <div>
      Change user account setting page {localStorage.getItem('token')}
    </div>
  )
}
