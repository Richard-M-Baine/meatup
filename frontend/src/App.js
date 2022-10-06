import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// LoginForm stuff
import Login from "./components/LoginFormModal/LoginForm";
import Signup from "./components/SignupFormModal/SignupForm"

// end LoginStuff
import * as sessionActions from "./store/session";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  


  return isLoaded &&(
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
    </Switch>
  );
}

export default App;
