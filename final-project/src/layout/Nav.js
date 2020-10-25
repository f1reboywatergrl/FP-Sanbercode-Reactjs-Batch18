
import React, {useContext,useEffect} from 'react';
import Logo from '../logo.svg'
import ITB from '../logo.png'
import '../pages/bootstrap.css'
import {Dropdown,SplitButton} from 'react-bootstrap'
import { UserContext } from "../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { LightDarkContext } from "../context/LightDark.js"
import SetTheme from "../pages/SetTheme.js"
import Switch from '@material-ui/core/Switch';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
//
const Nav = () => {
    const [user, setUser] = useContext(UserContext)
    //const [theme, setTheme] = useContext(LightDarkContext)
  
    const handleLogout = () =>{
      setUser(null)
      localStorage.removeItem("email")
    }
    const classes = useStyles();
    const switchMode = (e) =>{
      e.stopPropagation()
      //setTheme(theme==="dark"?"light":"dark")
    }
    useEffect(()=>console.log(LightDarkContext) )
    //{ user!==null?<Dropdown.Header>Welcome back, {userData.name}!</Dropdown.Header>:null}
    return(    
      <AppBar style={{position:"static"}}>
        <Toolbar style={{background:"#041624",padding:"0.25%",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"0.5%",position:"fixed",top:0,width:"100%",zIndex:1}}>
          <img className="App-logo" id="logo" src={Logo} width="125px" height="125px"/>
          <span style={{justifyContent:"center"}}><a href="/games"><img src="https://www.flaticon.com/svg/static/icons/svg/2780/2780137.svg" className="games" width="128px" height="96px"></img></a><a href="/movies"><img src="https://www.flaticon.com/svg/static/icons/svg/705/705062.svg"className="movies" width="128px" height="96px"></img></a> </span>
          <nav class="navbar">                               
              <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-split-variants-primary" size="lg">
                      Menu
                  </Dropdown.Toggle> 
                  <Dropdown.Menu>
                                            
                      <Dropdown.Item href="/about">About</Dropdown.Item>
                      { user && <Dropdown.Divider/>}

                      { user && <Dropdown.Header>View Data</Dropdown.Header>}                    
                      { user && <Dropdown.Item href="/games">Games</Dropdown.Item> }
                      { user && <Dropdown.Item href="/movies">Movies</Dropdown.Item> }

                      { user && <Dropdown.Divider/>}
                      { user && <Dropdown.Header>Edit Data</Dropdown.Header>}                    
                      { user && <Dropdown.Item href="/editgames">Edit Games</Dropdown.Item> }
                      { user && <Dropdown.Item href="/editmovies">Edit Movies</Dropdown.Item> }

                      <Dropdown.Divider/>
                      { user === null && <Dropdown.Item href="/login">Login</Dropdown.Item> }
                      { user && <Dropdown.Item href="#" style={{cursor: "pointer"}} onClick={handleLogout}>Logout</Dropdown.Item> }
                      { user && <Dropdown.Item href="/changepass">Change Password</Dropdown.Item>}
                      <Dropdown.Divider/>
                      <Dropdown.Item onClick={e => e.stopPropagation()}>
                          <WbIncandescentIcon onClick={e => e.stopPropagation()}></WbIncandescentIcon><Switch onClick={e => switchMode(e)}></Switch>
                      </Dropdown.Item>                                           
                  </Dropdown.Menu>                   
              </Dropdown>
          </nav>           
        </Toolbar>

      </AppBar>
    )
}
//
export default Nav;
