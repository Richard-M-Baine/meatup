import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// LoginForm stuff
import Login from "./components/LoginFormModal/LoginForm";
import Signup from "./components/SignupFormModal/SignupForm"

// end LoginStuff
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
// end authme stuff

//Splash
import Home from './components/Home'

// group stuff
import CreateGroupForm from './components/Groups/CreateGroup'
import AllGroups from "./components/Groups/AllGroups";
import GroupDetails from "./components/Groups/GroupDetails";
import EditGroupForm from "./components/Groups/EditGroup";


function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          <Route path='/' exact>
            <Home />
            </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path='/groups/new'>
            <CreateGroupForm />
          </Route>

          <Route path='/groups/all'>
            <AllGroups/>
          </Route>

          <Route path='/groups/:groupId/about'>
            <GroupDetails />
          </Route>

          <Route path='/test'>
            <EditGroupForm />
          </Route>
          
        </Switch>
      )}
    </>
  );
}


export default App;
