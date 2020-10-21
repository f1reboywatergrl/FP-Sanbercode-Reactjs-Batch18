import React, {Component} from "react"
import axios from "axios"
import {Card, ListGroup} from 'react-bootstrap'
import './bootstrap.css'
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

class GameList extends Component {
  constructor(props){
    super(props)
    this.state = {
      games: []
    }
  }

  componentDidMount(){
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let games = res.data.map(el=>{ return {
        id: el.id, 
        name: el.name, 
        singlePlayer: el.singlePlayer,
        multiplayer: el.multiplayer,
        platform: el.platform,
        genre: el.genre,
        release: el.release,
        image_url: el.image_url
      }})
      this.setState({games})
      console.log(res)
    })
  }

  render(){
    return (
      <>
        <div style={{width:"75%",margin: "0 auto",padding:"1%"}}>
            <h1>Daftar Games Terbaik</h1>
            <div id="article-list">
            {
                this.state.games.map((item)=>{
                return(
                    <Card style={{width:"85%", margin:"1% auto"}} key={item.id}>
                        <Card.Header style={{justifyItems:"space-around",background:"#1F2833"}}>
                            <Card.Img variant="top" style={{width: "512px", height: "384px", objectFit: "cover",margin:"auto",display:"block"}} src={item.image_url}/>
                            <Card.Title style={{margin:"1%",textAlign:"center",fontSize:"2.5em"}}><strong style={{marginTop:"2%",textAlign:"center"}}>{item.name}</strong></Card.Title>
                        </Card.Header>                        
                        <Card.Body>
                            <ListGroup variant="flush">                                
                                <Card.Subtitle>
                                    <div style={{display:"flex",justifyContent:"center",flexDirection:"row",margin:"0.5%"}}>
                                      {(item.singlePlayer===1)?<button type="button" class="btn btn-outline-warning" style={{align:"center",cursor:"default",marginRight:"1%"}}><PersonIcon/> Singleplayer</button>:null}  
                                      {(item.multiplayer===1)?<button type="button" class="btn btn-outline-danger" style={{align:"center",cursor:"default",marginRight:"1%"}}><GroupIcon/>  Multiplayer</button>:null}<br/><br/>
                                      <button class="btn btn-outline-success" style={{align:"center",cursor:"default",marginRight:"1%"}}><CalendarTodayIcon/>  {item.release}</button>                                    
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center",flexDirection:"row",margin:"1%"}}>
                                      {
                                        item.genre.split(',').map((items)=>{
                                          return(
                                            <button class="btn btn-outline-danger" style={{cursor:"default",marginRight:"1%"}}>{items}</button>
                                          )    
                                        })
                                      }                            
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center",flexDirection:"row",margin:"0.5%"}}>
                                      {
                                        item.platform.split(',').map((items)=>{
                                          return(
                                            <button class="btn btn-outline-info" style={{cursor:"default",marginRight:"1%"}}>{(items.replace(" ","")=="Microsoft Windows"||items.replace(" ","")=="Linux"||items.replace(" ","")=="Classic Mac OS")?<DesktopWindowsIcon/>:<VideogameAssetIcon/>}   {items}</button>
                                          )    
                                        })
                                      }                            
                                    </div>

                                </Card.Subtitle>                               
                            </ListGroup>

                        </Card.Body>
                    </Card>
                )
                })
            }
            </div>            
        </div>

      </>
    )
  }
}

export default GameList