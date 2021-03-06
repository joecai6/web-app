import React from 'react';
import {Route} from 'react-router-dom';
import Planner from './components/planner';
import Home from './components/home';
import Register from './components/register'
import Login from './components/login'
import './css/App.css'

// render home page in app
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Home} />
      <Route exact path="/planner" component={Planner} />
      <Route exact path="/register" component={Register}/>
      <Route path = "/login" component={Login} />
    </div>
  );
}


export default App;
