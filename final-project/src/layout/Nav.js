
import React, {useContext} from 'react';
import Logo from '../logo.svg'
import Sanber from '../logo.png'
import '../pages/bootstrap.css'
import {Dropdown} from 'react-bootstrap'
import { UserContext } from "../context/UserContext";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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

const Nav = () => {
    const [user, setUser] = useContext(UserContext)
    const handleLogout = () =>{
      setUser(null)
      localStorage.removeItem("user")
    }
    const classes = useStyles();
    return(    
      <AppBar style={{position:"static"}}>
        <Toolbar style={{background:"#041624",display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"0.5%",position:"fixed",top:0,width:"100%",zIndex:1}}>
          <img className="App-logo" id="logo" src={Logo} width="100px" height="100px"/>
          <a href="https://sanbercode.com"><img src={Sanber}></img> </a>
          <nav class="navbar">                               
              <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic" size="lg">
                      Menu
                  </Dropdown.Toggle> 
                  <Dropdown.Menu>
                      <Dropdown.Item href="/about">About</Dropdown.Item>
                      {user && <Dropdown.Divider/>}

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
                  </Dropdown.Menu>                   
              </Dropdown>
          </nav>           
        </Toolbar>

      </AppBar>
    )
}
//
export default Nav;
