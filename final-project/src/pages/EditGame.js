import React, {useState, useEffect} from "react"
import axios from "axios"
import "../Movies.css"
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { blue } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});


const EditGames = () => {
  const SortDialog = (props) =>{
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
      handleSelectedSort(value);
      onClose(value);
    };

    return(
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Sort items by...</DialogTitle>
          <List>
              <ListItem autoFocus button onClick={() => handleListItemClick('Default')}>
                  <ListItemText>Reset Default</ListItemText>
              </ListItem>
              <ListItem autoFocus button onClick={() => handleListItemClick('name')}>
                  <ListItemText>Name</ListItemText>
              </ListItem>
              <ListItem autoFocus button onClick={() => handleListItemClick('genre')}>
                  <ListItemText>Genre</ListItemText>
              </ListItem>
              <ListItem autoFocus button onClick={() => handleListItemClick('release')}>
                  <ListItemText>Release Year</ListItemText>
              </ListItem>
          </List>
      </Dialog>
    )
  }
  
  SortDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };  
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    genre: "",
    release: "",
    image_url:""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")

  useEffect( () => {
    if (games === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            genre: el.genre,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    console.log(input)

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre, 
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,          
          release: input.release,
          image_url: input.image_url
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/games/${selectedId}`, {
            name: input.name, 
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            genre: input.genre,
            release: input.release,
            image_url: input.image_url
        })
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.name = input.name
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.platform = input.platform
            singleGame.genre = input.genre
            singleGame.release = input.release
            singleGame.image_url = input.image_url
            setGames([...games])
        })
        
      }
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        singlePlayer: 0,
        multiplayer: 0,
        platform: "",
        genre: "",
        release: "",
        image_url: ""
      })
    }

  }
  
  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id !== itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/games/${itemId}`)
      .then(res => {
        console.log(res)
      }).catch((response) => console.log('error', response));
            
      setGames([...newGames])
      
    }
  
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        name: singleGame.name, 
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        platform: singleGame.platform,
        genre: singleGame.genre,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button  className="btn btn-outline-warning" onClick={handleEdit} style={{marginRight:"1%"}}>Edit</button>
        &nbsp;
        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  function handleSelectedSort(attribute){
    submitSort(attribute);
  }
  function submitSort(attribute){
    attribute.preventDefault()
    console.log(attribute)
    let temp = []
    games.map(function(value,index){
        temp.push(value[attribute])
        temp.sort()
        console.log(temp)
    })
    console.log(temp)
    console.log(temp.length)
    console.log(games.length)
    /*let temp2 = [];
    for(let i=0;i<temp.length;i++){
        for(let j=0;j<games.length;i++)
            if(games[j][attribute]==temp[i]){
                temp2.push(games[j])
            }
    }
    setGames(temp2)*/
  }

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/games`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            genre: el.genre,
            release: el.release,
            image_url: el.image_url
        }
      })

      let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setGames([...filteredGames])
    })
    
 
  }
  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }
  const resetSearch = ()=>{
    setSearch("")
  }

  return(
    <>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} style={{height:"35px",width:"250px",marginRight:"1%"}} placeholder="Search for a game title..."/>
          <button className="btn btn-outline-info" style={{marginRight:"1%"}}>Search</button>
          <button className="btn btn-outline-danger" onClick={resetSearch}style={{marginRight:"1%"}}>Reset Field</button>
          <button className="btn btn-outline-success" onClick={handleClickOpen}>Sort Data</button>
          <SortDialog open={open} onClose={handleClose} elevation={4}/>
        </form>          
      </div>

      <h1>Daftar Game</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th >Single&nbsp;Player</th>
            <th>Multi&nbsp;Player</th>
            <th>Platform</th>
            <th>Release</th>
            <th style={{width:"150px"}}>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              games !== null && games.map((item, index)=>{
                return(                    
                  <tr key={item.id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.singlePlayer===1?"Yes":"No"}</td>
                    <td>{item.multiplayer===1?"Yes":"No"}</td>
                    <td>{truncateString(item.platform, 20)}</td>
                    <td>{item.release}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Games Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <textarea style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Single Player (0=False, 1=True):
          </label>
          <input style={{float: "right"}} type="number" name="singlePlayer" max={1} min={0} value={input.singlePlayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Multi Player (0=False, 1=True):
          </label>
          <input style={{float: "right"}} type="number" name="multiplayer" max={1} min={0} value={input.multiplayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text"  name="platform" value={input.platform} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Release:
          </label>
          <input style={{float: "right"}} type="number" name="release" value={input.release} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button className="btn btn-outline-info">Submit</button>
      </form>
    </>
  )
}

export default EditGames