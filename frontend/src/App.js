import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// LoginForm stuff
import Login from "./components/LoginFormModal/LoginForm";
// end LoginStuff



function App() {

  


  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;
