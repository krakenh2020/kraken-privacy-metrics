import React from 'react';
import './App.css';
import Input from './components/Input';
import AdversaryStrength from './components/AdversaryStrength'
import privacyVal from './components/PrivacyVal';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';

/*
description:
This is the control file of the frontend. From here the flow of the different pages gets controlled.
*/

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Redirect to="/setup" />

        <Switch>
          <Route exact path="/setup" component={AdversaryStrength} />
          <Route exact path="/profile" component={Input} />
          <Route exact path="/privacyVal" component={privacyVal} />
        </Switch>

      </BrowserRouter>
    </div>
  );
}

export default App;
