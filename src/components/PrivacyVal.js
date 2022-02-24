import React from 'react';
import { Container, Paper, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ProgressBar from './ProgressBar';
import calculatePrivacyMetric from '../services/UserPrivacyService';

/*
displays the privacy value in form of a bar chart on a new page
*/

export default function AdversaryStrength() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  let history = useHistory();

  const input = history.location.state;
  const privacy = calculatePrivacyMetric(input);
  console.log("Computed privacy metric:", privacy);

  const handleClickAdversary = (e) => {
    e.preventDefault()
    history.push("/setup")
  }

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <div>
          <h1 className="text-center">Current Privacy Value</h1>
          <ProgressBar key={privacy.id} bgcolor={privacy.bgcolor} completed={privacy.completed} text={privacy.text} />
        </div>

        <br />
        <Button variant="contained" color="secondary" onClick={handleClickAdversary}>
          Back
        </Button>

      </Paper>
    </Container>
  );
}
