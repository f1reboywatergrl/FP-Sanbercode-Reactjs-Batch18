import React, {Component} from "react"
import axios from "axios"
import {Card, Button} from 'react-bootstrap'
import Rating from '../rating.png'
import Icon from '@material-ui/core/Icon';
import StarRateIcon from '@material-ui/icons/StarRate';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function minuteToHours(num){
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return ( rhours === 0 ? "" : rhours + " h") + (rminutes === 0 ? "" : " " + rminutes + " m")
}

class Movies extends Component {
  constructor(props){
    super(props)
    this.state = {
      movies: []
    }
  }



  componentDidMount(){
    axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let movies = res.data.map(el=>{ return {
        id: el.id,
        year: el.year, 
        title: el.title, 
        rating: el.rating,
        duration: el.duration,
        genre: el.genre,
        description: el.description,
        image_url: el.image_url
      }})
      this.setState({movies})
    })
  }

  render(){
    return (
      <>
      <div style={{width:"75%",margin: "0 auto",padding:"1%"}}>
        <h1 style={{}}>Daftar Film Film Terbaik</h1>
        <div id="article-list">
        {
            this.state.movies.map((item)=>{
            return(
                <Card style={{marginBottom:"1.5%"}}key={item.id}>
                    <Card.Header style={{justifyItems:"space-between",background:"#1F2833"}}>
                      <div style={{background:"#16262E",display:"flex",justifyContent:"left",flexDirection:"row"}}>
                          <Card.Img variant="top" style={{width: "512px", height: "384px", objectFit: "cover",margin:"auto",display:"block",marginLeft:"1%"}} src={item.image_url}/>
                          <div style={{padding:"2.5%",width:"100%"}}>
                            <div style={{justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey", paddingBottom:"7%",width:"100%"}}>
                              <div>
                                <Card.Title style={{textAlign:"center",fontSize:"3em"}}><strong>{item.title}</strong></Card.Title>                                
                              </div>
                              <div style={{display:"flex",justifyContent:"center",flexDirection:"row",marginTop:"4%"}}>
                                <button type="button" class="btn btn-primary">View Details</button>                                 
                              </div>
                              
                            </div>
                            <div style={{display:"flex",justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey",padding:"3%"}}>
                              <button type="button" class="btn btn-outline-warning" style={{cursor:"default",marginRight:"3%",justifyItems:"space-between"}}><StarRateIcon fontSize="medium"/>  {item.rating} / 10</button>                   
                              <button type="button" class="btn btn-outline-info" style={{cursor:"default",marginRight:"3%"}}><QueryBuilderIcon fontSize="medium"/>  {minuteToHours(item.duration)}</button>                   
                              <button type="button" class="btn btn-outline-success" style={{cursor:"default"}}><CalendarTodayIcon fontSize="medium"/>  {item.year}</button>                   
                            </div>
                            <div style={{display:"flex",justifyContent:"center",flexDirection:"row",borderBottom: "1px solid lightgrey",padding:"3%"}}>
                              {
                                item.genre.split(',').map((items)=>{
                                  return(
                                    <button class="btn btn-outline-danger" style={{cursor:"default",marginRight:"3%"}}>{items}</button>
                                  )    
                                })
                              }                            
                            </div>                            
                          </div>
                     
                      </div>

                    </Card.Header>
                    <Card.Body>                      
                        <Card.Subtitle style={{fontSize:"1.25em"}}>
                          {item.description}                              
                        </Card.Subtitle>
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
/* style={{background:"#38807c"}}*/
export default Movies