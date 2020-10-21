import { responsiveFontSizes } from "@material-ui/core"
import React from "react"

const Footer = () =>{
  return (
    <footer style={{
        color:"#FFFFFF",
        backgroundColor:"#0B0C10",
        textAlign:"center",
        bottom:0,
        position:"fixed",
        width:"100%"        
    }}>
      <h5 style={{fontSize:"15px",margin:"0.5%"}}>Made by <strong>Vincentius Samuel Gondokusumo</strong>, 2020</h5>
    </footer>
  )
}

export default Footer