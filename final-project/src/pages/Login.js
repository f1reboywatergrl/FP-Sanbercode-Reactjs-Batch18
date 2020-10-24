import React, { useContext, useState } from "react"
import {UserContext} from "../context/UserContext"
import {
  Redirect
} from "react-router-dom";
import axios from "axios" 

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "", password: "",token:"",name:""})
  const [inputChange, setInputChange] = useState({token:"",password:"",new_password:"",new_confirm_password:""})
  const [statusLogin, setStatusLogin] = useState("login");

  function redirectLogin(){
      return <Redirect to ="/about"/>      
  }  

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (statusLogin === "login"){        
      axios.post(`https://backendexample.sanbersy.com/api/user-login?email=${input.email}&password=${input.password}`, {
        email:input.email,
        password:input.password
      })
      .then(res => {
          console.log(res.data)
          console.log(res.data.token)
          console.log(res.data.user.name)
          let temp_name = res.data.user.name
          let temp_token = 1
          console.log(input)          
          setUser({email:input.email})
          localStorage.setItem("email", JSON.stringify({email: input.email, password: input.password,token:input.token, name:temp_name}))

          redirectLogin()
      }).catch(res=>{
        console.log("Gabisa")
      })
    }
    else if(statusLogin==="register"){
      axios.post(`https://backendexample.sanbersy.com/api/register?name=${input.name}&email=${input.email}&password=${input.password}`, {
        email:input.email,
        password:input.password,
        name:input.name
      })
      .then(res => {
          console.log(input)
          setUser({email:input.email})
          localStorage.setItem("email", JSON.stringify({email: input.email, password: input.password,name:input.name}))
          redirectLogin()
      }).catch(res=>{
        console.log("Gabisa")
      })
    }
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      case "name":{
        setInput({...input, name: value})
        break;
      }      
      default:{break;}

    }
  }

  const switchToRegister = () =>{
    setStatusLogin("register")
  }

  return(
    <>
      {statusLogin==="login"?
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
    
      :
        <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input type="text" name="email" onChange={handleChange} value={input.email}/>
        <br/>
        <label>Name: </label>
        <input type="text" name="name" onChange={handleChange} value={input.name}/>
        <br/>
        <label>Password: </label>
        <input type="password" name="password" onChange={handleChange} value={input.password}/>
        <br/>
        <button>Register</button>
      </form>      
      }

    </>
  )
}

export default Login