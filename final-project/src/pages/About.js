import React, {Component} from "react"
import GitHubIcon from '@material-ui/icons/GitHub';
import {Card, Fade} from 'react-bootstrap'
import Photo from '../developer.jpg'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import LanguageIcon from '@material-ui/icons/Language';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const useStylesForAnim = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

const useStyles = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
    },

  });

const EmailDialog = (props) =>{
    const classes = useStyles();

    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    return(
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Contact Me:</DialogTitle>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <ContactMailIcon/>
                            </Avatar>                        
                        </ListItemAvatar>
                        <ListItemText>   vincentius.samuelgk2@gmail.com</ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={classes.avatar}>
                                <ContactMailIcon/>
                            </Avatar>                        
                        </ListItemAvatar>
                        <ListItemText>18219024@std.stei.itb.ac.id</ListItemText>
                    </ListItem>
                </List>
            </Dialog>             
       
    )    
}

EmailDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

const About = () =>{
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (value) => {
      setOpen(false);
    };

    return(
        <> 
        
            <div style={{width:"65%",margin: "0 auto",paddingBottom:"1%"}}>
                <div>
                    <h1>About the Developer</h1>
                        <Card style={{width:"85%", margin:"1% auto"}}>
                            <Card.Header style={{background:"#1F2833"}}>
                                <Card.Img variant="top" style={{width: "512px", height: "550px", objectFit: "cover",margin:"auto",display:"block"}} src={Photo}/>
                                <Card.Title style={{marginTop:"2%",textAlign:"center",fontSize:"2.5em"}}><strong>Vincentius Samuel Gondokusumo</strong></Card.Title>
                                <div style={{width:"50%",margin:"auto",display:"flex",justifyContent:"space-around",flexDirection:"row"}}>
                                    <a href="https://github.com/f1reboywatergrl"><button type="button" class="btn btn-outline-warning" style={{align:"center"}}><GitHubIcon fontSize="medium"/></button></a>
                                    <a href="https://www.linkedin.com/in/vincentius-samuel/"><button type="button" class="btn btn-outline-info" style={{align:"center"}}><LinkedInIcon fontSize="medium"/></button></a>
                                    <button type="button" class="btn btn-outline-success" style={{align:"center"}} onClick={handleClickOpen}><MailIcon fontSize="medium"/></button>
                                        <EmailDialog open={open}onClose={handleClose} elevation={4}/>                                               
                                    

                                    <button type="button" class="btn btn-outline-danger" style={{align:"center"}}><LanguageIcon fontSize="medium"/></button>
                                </div>
                                                
                            </Card.Header>
                            <Card.Body>                        
                                <Card.Subtitle>
                                    <p style={{textAlign:"justify", fontSize:"1.25em"}}>Hello! I am a second year Information Systems and Technology undergraduate of Institut Teknologi Bandung, Indonesia. I am passionate about
                                        the world of programming, especially Web Development and Data Science. If you want to check out my other projects, feel free to check out my
                                        GitHub or LinkedIn!</p>                             
                                </Card.Subtitle>
                                <Card.Text style={{textAlign:"justify"}}>
                                    <p style={{fontSize:"1.15em"}}>
                                        <strong>About the project</strong>:<br/>
                                        This project was mainly built with React, along with Material UI, React-Bootstrap, and Bootswatch to beautify several
                                        aspects of the design. This project is my final project submission for a 2020 Front End
                                        Development Bootcamp.<br/><br/>

                                        In this web app, you can view the best films and games, fetched by an API, and you can also execute CRUD (Create-Read-Update-Delete)
                                        functions by accessing the Edit tab. Feel free to experiment around, and have fun!
                                    </p> 
                                                            
                                </Card.Text>
                            </Card.Body>
                        </Card>
                </div>
 
            </div>            


        </>
    )
}

export default About