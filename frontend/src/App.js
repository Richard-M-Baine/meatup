import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

// LoginForm stuff

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

// event stuff
import AllEvents from './components/Events/ReadEvents'
import CreateEventForm from "./components/Events/CreateEvent";




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

          <Route path='/groups/:groupId/edit'>
            <EditGroupForm />
          </Route>

          <Route path='/events/all'>
            <AllEvents />
          </Route>

          <Route path='/groups/:groupId/events/new'>
            <CreateEventForm />
          </Route>
          
        </Switch>
      )}
    </>
  );
}


export default App;
