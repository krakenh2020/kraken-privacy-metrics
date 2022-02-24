import React from 'react';
import './App.css';
import Input from './components/Input';
import AdversaryStrength from './components/AdversaryStrength'
import privacyVal from './components/PrivacyVal';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router';

/**
 * Main entry point to the privacy metrics widget
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
