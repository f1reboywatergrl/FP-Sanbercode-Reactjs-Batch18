import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Movies from "../pages/Movies.js"
import {UserContext} from "../context/UserContext"
import Login from "../pages/Login"
import Games from "../pages/Games.js"
import EditMovies from "../pages/EditMovie.js"
import EditGames from "../pages/EditGame.js"
import SingleMovie from "../pages/SingleMovie.js"
import About from "../pages/About.js";

const Section = () =>{
  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section style={{margin:"5%"}}>
      <Switch>
        <Route exact path="/about" component={About}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute exact path="/movies/{id}" user={user} component={(id)=>SingleMovie(id)}/>
        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
        <PrivateRoute exact path="/games" user={user} component={Games}/>
        <PrivateRoute exact path="/editmovies" user={user} component={EditMovies}/>
        <PrivateRoute exact path="/editgames" user={user} component={EditGames}/>
      </Switch>
    </section>
  )
}

export default Section