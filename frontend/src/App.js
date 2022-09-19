// I am the Main APP
// I live in the src folder
import { Route, Switch } from "react-router-dom";
import React from "react";

import Splash from "./components/Splash";

function App() {
  return (
    <>
    <h1>Hello from App</h1>
    <Switch>
      <Route exact path='/'>
      <Splash />
      </Route>



    </Switch>
    </>
  );
}

export default App;
