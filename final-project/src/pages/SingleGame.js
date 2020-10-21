import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"


const SingleGame = () => {
  let { id } = useParams();
  const [game, setGame] = useState(null) 

  useEffect(()=>{
    if (game === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
      .then(res => {
          setGame(res.data)
      })
    }
  })

  return (
    <>
      {game !== null &&
        <>
          <h1>{game.title}</h1>
          <p>{game.description}</p>
          <p><img width="200" src={game.image_url}/></p>
        </>
      }
    </>
  )

}

export default SingleGame

