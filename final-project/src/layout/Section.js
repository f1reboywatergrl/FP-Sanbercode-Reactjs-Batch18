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
import ChangePass from "../pages/ChangePass.js"
import SingleGame from "../pages/SingleGame.js"

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
    <section style={{margin:"6%"}}>
      <Switch>
        <Route exact path="/about" component={About}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute path="/movies/1" user={user} component={()=>SingleMovie(1)}/>
        <PrivateRoute path="/games/{id}" user={user} component={SingleGame}/>
        <PrivateRoute exact path="/" user={user} component={Movies}/>
        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
        <PrivateRoute exact path="/games" user={user} component={Games}/>
        <PrivateRoute exact path="/editmovies" user={user} component={EditMovies}/>
        <PrivateRoute exact path="/editgames" user={user} component={EditGames}/>
        <PrivateRoute exact path="/changepass" user={user} component={ChangePass}/>
      </Switch>
    </section>
  )
}

export default Section