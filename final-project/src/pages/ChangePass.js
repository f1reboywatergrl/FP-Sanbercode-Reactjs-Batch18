import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import {
  Redirect
} from "react-router-dom";
import axios from "axios" 

const ChangePass = () =>{
  const [, setUser] = useContext(UserContext)
  const [inputChange, setInputChange] = useState({email:"",password:"",new_password:"",new_confirm_password:""})

  function redirectLogin(){
      return <Redirect to ="/about"/>      
  }  

  const handleSubmit = (event) =>{
    event.preventDefault()
      axios.post(`https://backendexample.sanbersy.com/api/change-password?token=${inputChange.token}&current_password=${inputChange.current_password}
      &new_password=${inputChange.new_password}&confirmed_password=${inputChange.confirmed_password}`, {
        email:inputRegister.email,
        password:inputRegister.password,
        name:inputRegister.name
      })
      .then(res => {
          console.log(res.token)
          setUser({email:inputRegister.email})
          localStorage.setItem("email", JSON.stringify({email: inputRegister.email, password: inputRegister.password,name:inputRegister.name}))
          redirectLogin()
      }).catch(res=>{
        console.log("Gabisa")
      })
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "current_password":{
        setInput({...inputChange, email: value})
        break;
      }
      case "password":{
        setInput({...inputChange, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
        <form onSubmit={handleSubmit}>
          <label>email: </label>
          <input type="text" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/>
          <button>Login</button>
          <button onClick={switchToRegister}>Register</button>
        </form>                  

    </>
  )
}

export default ChangePass