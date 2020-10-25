import React, { useContext, useEffect, useState } from "react"
import {UserContext} from "../context/UserContext"
import {
  Redirect
} from "react-router-dom";
import axios from "axios" 

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [dataUser, setDataUser] = useState(null)
  const [input, setInput] = useState({email: "", password: "",token:"",name:""})
  const [inputChange, setInputChange] = useState({token:"",password:"",new_password:"",new_confirm_password:""})
  const [statusLogin, setStatusLogin] = useState("login");

  function redirectLogin(){
      return <Redirect to ="/about"/>      
  }  
  useEffect( ()=>{
    console.log(input)
  })

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (statusLogin === "login"){        
      axios.post(`https://backendexample.sanbersy.com/api/user-login?email=${input.email}&password=${input.password}`, {
        email:input.email,
        password:input.password
      })
      .then(res => {
          console.log(res)
          console.log(res.data.user.name)
          console.log(res.data.token)    
          setInput({...input,name:res.data.user.name,token:res.data.token})                                
          setUser({email:input.email})
          localStorage.setItem("email", JSON.stringify({email: input.email, password: input.password,token:input.token, name: res.data.user.name,token:res.data.token}))
        
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

  const switchToLogin = () => {
    setStatusLogin("login")
  }

  return(
    <>
      {statusLogin==="login"?
      <div>
        <h3 style={{textAlign:"center"}}>Login</h3>
        <form onSubmit={handleSubmit}>
          <label for="inp" class="inp">
            <input type="text" name="email" onChange={handleChange} value={input.email} placeholder="&nbsp;"/>
            <span class="label">Email</span>
            <span class="focus-bg"></span>
          </label><br/>
          <label for="inp" class="inp">
            <input type="password" name="password" onChange={handleChange} value={input.password} placeholder="&nbsp;"/>
            <span class="label">Password</span>
            <span class="focus-bg"></span>
          </label><br/><br/>
          <button class="btn btn-outline-info" style={{marginRight:"1%"}}>Login</button>
          <button class="btn btn-outline-warning" onClick={switchToRegister}>Register a New Account</button>

          
        </form>        
      </div>

                  
    
      :
      <div>
        <h3 style={{textAlign:"center"}}>Register</h3>        
        <form onSubmit={handleSubmit}>
        <label for="inp" class="inp">
          <input type="text" name="email" onChange={handleChange} value={input.email} placeholder="&nbsp;"/>
          <span class="label">Email</span>
          <span class="focus-bg"></span>
        </label><br/>
        <label for="inp" class="inp">
          <input type="text" name="name" onChange={handleChange} value={input.name} placeholder="&nbsp;"/>
          <span class="label">Name</span>
          <span class="focus-bg"></span>
        </label><br/>
        <label for="inp" class="inp">
          <input type="password" name="password" onChange={handleChange} value={input.password} placeholder="&nbsp;"/>
          <span class="label">Password</span>
          <span class="focus-bg"></span>
        </label><br/><br/>

        <button class="btn btn-outline-info" style={{marginRight:"1%"}}>Register</button>
        <button class="btn btn-outline-warning" onClick={switchToLogin}>Back To Login</button>
      </form>         
      </div>
     
      }

    </>
  )
}

export default Login