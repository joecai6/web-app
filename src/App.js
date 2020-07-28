import React from 'react';
import {Route} from 'react-router-dom';
import Planner from './components/planner';
import Home from './components/home';
import Header from './components/header'

// render home page in app
function App() {
  return (
    <div className="container flex-column">
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/planner" component={Planner} />
    </div>
  );
}

export default App;
