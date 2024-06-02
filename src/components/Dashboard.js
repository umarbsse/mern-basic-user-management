import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  let navigate = useNavigate();
  useEffect (()=>{
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])


  return (
    <div>
      Dashboard is here {localStorage.getItem('token')}
    </div>
  )
}
