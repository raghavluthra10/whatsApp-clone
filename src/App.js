import './App.css';
import Sidebar from './Sidebar';
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
 
  const [ {user}, dispatch ] = useStateValue();
   
  return (
    <div className="App">

      { !user ? (
        <Login  />
      ) : (
          <div className='app_body'>
          <Router>
          <Sidebar  />
            <Switch>
              <Route path='/rooms/:roomId'> 
                <Chats  /> 
              </Route>
              <Route exact path='/'> 
                <Chats  /> 
              </Route>
            </Switch>
          </Router>
        </div>
      )}       
    </div>
  );
}

export default App;


//1:58:00