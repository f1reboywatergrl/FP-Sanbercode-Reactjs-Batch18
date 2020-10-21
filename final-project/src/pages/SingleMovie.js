import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"


const SingleMovie = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState(null) 

  useEffect(()=>{
    if (movie === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies/${id}`)
      .then(res => {
          setMovie(res.data)
      })
    }
  })

  return (
    <>
      {movie !== null &&
        <>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <p><img width="200" src={movie.image_url}/></p>
        </>
      }
    </>
  )

}

export default SingleMovie

