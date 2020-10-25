import React, {Component} from "react"
import axios from "axios"
import {Card, ListGroup} from 'react-bootstrap'
import './bootstrap.css'
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';

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
                    <Card style={{marginBottom:"1%"}} key={item.id}>
                        <Card.Header style={{justifyItems:"space-between",background:"#1F2833"}}>
                          <div style={{background:"#16262E",display:"flex",justifyContent:"left",flexDirection:"row"}}>
                            <Card.Img variant="top" style={{width: "512px", height: "384px", objectFit: "cover",margin:"auto",display:"block",marginLeft:"1%"}} src={item.image_url}/>
                              <div style={{padding:"2.5%",width:"100%"}}>
                                <div>
                                  <Card.Title style={{margin:"1%",textAlign:"center",fontSize:"2em"}}><strong>{item.name}</strong></Card.Title>
                                </div>
                                <div style={{display:"flex",justifyContent:"center",flexDirection:"row",marginTop:"4%"}}>
                                    <a href={`/games/${item.id}`}type="button" class="btn btn-primary">View Details</a>                                 
                                </div>

                              <div style={{display:"flex",justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey",padding:"3%"}}>
                                {(item.singlePlayer===1)?<button type="button" class="btn btn-outline-warning" style={{align:"center",cursor:"default",marginRight:"1%"}}><PersonIcon/> Singleplayer</button>:null}  
                                {(item.multiplayer===1)?<button type="button" class="btn btn-outline-danger" style={{align:"center",cursor:"default",marginRight:"1%"}}><GroupIcon/>  Multiplayer</button>:null}<br/><br/>
                                <button class="btn btn-outline-success" style={{align:"center",cursor:"default",marginRight:"1%"}}><CalendarTodayIcon/>  {item.release}</button>                                    
                              </div>
                              <div style={{display:"flex",justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey",padding:"3%"}}>
                                {
                                  item.genre.split(',').map((items)=>{
                                    return(
                                      <button class="btn btn-outline-danger" style={{cursor:"default",marginRight:"1%"}}>{items}</button>
                                    )    
                                  })
                                }
                              </div>
                              <div style={{display:"flex",justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey",padding:"3%"}}>
                                {
                                  item.platform.split(',').map((items)=>{
                                    return(
                                      <button class="btn btn-outline-info" style={{cursor:"default",marginRight:"1%"}}>{(items.toLowerCase().includes("pc")||items.toLowerCase().includes("windows")||items.toLowerCase().includes("linux")||items.toLowerCase().includes("mac"))?<DesktopWindowsIcon/>:((items.toLowerCase().includes("ios")||items.toLowerCase().includes("android")||items.toLowerCase().includes("mobile"))?<MobileFriendlyIcon/>:<VideogameAssetIcon/>)}   {items}</button>
                                    )    
                                  })
                                }                            
                              </div>
                            </div>
                          </div>
                      </Card.Header>
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