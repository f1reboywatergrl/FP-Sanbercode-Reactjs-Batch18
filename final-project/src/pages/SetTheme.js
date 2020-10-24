import React, {useContext} from "react"
import { LightDarkContext } from "../context/LightDark.js"
import {Dropdown} from 'react-bootstrap'
import Switch from '@material-ui/core/Switch';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

const SwitchTheme = ()=>{
  const [theme, setTheme] = useContext(LightDarkContext)

  const changeTheme = ()=>{
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return(
    <Dropdown.Item>
        <WbIncandescentIcon></WbIncandescentIcon><Switch onClick={changeTheme}></Switch>
    </Dropdown.Item>
  )
}


export default SwitchTheme
