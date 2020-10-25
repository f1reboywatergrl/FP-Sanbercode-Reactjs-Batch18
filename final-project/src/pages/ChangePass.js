import React, { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/UserContext"
import {
  Redirect
} from "react-router-dom";
import axios from "axios" 
import swal from 'sweetalert';
const ChangePass = () =>{
  const [, setUser] = useContext(UserContext)
  const [inputChange, setInputChange] = useState({password:"",new_password:"",new_confirm_password:""})
  
  function redirectLogin(){
      return <Redirect to ="/about"/>      
  }  

  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("email")
  }

  const userData = JSON.parse(localStorage.getItem('email'))

  const handleSubmit = (event) =>{
    event.preventDefault()
      axios.post(`https://backendexample.sanbersy.com/api/change-password?token=${userData.token}&current_password=${inputChange.password}
      &new_password=${inputChange.new_password}&new_confirm_password=${inputChange.new_confirm_password}`, {
        token:userData.token,
        password:inputChange.password,
        new_password:inputChange.new_password,
        new_confirm_password: inputChange.new_confirm_password
      })
      .then(res => {
          setUser({email:inputChange.email})
          localStorage.setItem("email", JSON.stringify({...userData,password:inputChange.new_password}))
          redirectLogin()
          swal("Password successfully changed!",{
            button:"Close"
          })
          handleLogout()
      }).catch(res=>{
        swal ( "Invalid input!" ,  "Please recheck your password inputs!" ,  "error" )
      })
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "new_password":{
        setInputChange({...inputChange, new_password: value})
        break;
      }
      case "password":{
        setInputChange({...inputChange, password: value})
        break;
      }
      case "new_confirm_password":{
        setInputChange({...inputChange, new_confirm_password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
        <h3 style={{textAlign:"center"}}>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <label for="inp" class="inp">
            <input type="password" name="password" onChange={handleChange} value={inputChange.password} placeholder="&nbsp;"/>
            <span class="label">Current Password </span>
            <span class="focus-bg"></span>
          </label><br/>
          <label for="inp" class="inp">
            <input type="password" name="new_password" onChange={handleChange} value={inputChange.new_password} placeholder="&nbsp;"/>
            <span class="label">New Password </span>
            <span class="focus-bg"></span>
          </label><br/>
          <label for="inp" class="inp">
            <input type="password" name="new_confirm_password" onChange={handleChange} value={inputChange.new_confirm_password} placeholder="&nbsp;"/>
            <span class="label">Confirm Password </span>
            <span class="focus-bg"></span>
          </label><br/><br/>
          <button className="btn btn-outline-info">Change Password</button>
        </form>                
    </>
  )
}

export default ChangePass