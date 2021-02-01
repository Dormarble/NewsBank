import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation.js';
import Home from './routes/Home.js';
import Economy from './routes/Economy.js';
import NewsBody from './routes/NewsBody.js';
import SignIn from './routes/SignIn.js';
import SignUp from './routes/SignUp.js';
import SignOut from './routes/Signout.js';

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/economy" exact={true} component={Economy} />
      <Route path="/economy/:id" exact={true} component={NewsBody} />
      <Route path="/signin" exact={true} component={SignIn} />
      <Route path="/signup" exact={true} component={SignUp} />
      <Route path="/signout" exact={true} component={SignOut} />
      <Redirect path="*" path="/" />
    </HashRouter>

  );
}

export default App;
