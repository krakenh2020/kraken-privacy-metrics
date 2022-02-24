import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';
import CheckBox from './CheckBox'
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  },
}));

/**
 * Input form for per-file questions
 */
export default function Input() {
  const classes = useStyles();
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  let history = useHistory();

  // this is the input from AdversaryStrength.js
  const state = history.location.state;

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}><u>Calculate privacy metric</u></h1>

        <form classmin={classes.root} noValidate autoComplete="off">
          Does this file have similar information or does it have relating data to previously uploaded files?
          Please select all items that are contained in the file:
          <CheckBox adversaryState={state} />
        </form>
      </Paper>
    </Container>
  );
}

