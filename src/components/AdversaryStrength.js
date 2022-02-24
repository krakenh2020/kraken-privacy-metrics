import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import { useHistory } from "react-router-dom"

/*
description:
This component is responsible for the questions to calculate the adversary strength
*/

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

//different labels for the bar chart
const marks1 = [
  {
    value: 1,
    label: 'not at all',
  },
  { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },

  {
    value: 5,
    label: 'very serious',
  },
];

const marks2 = [
  {
    value: 1,
    label: 'not at all',
  },
  { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },

  {
    value: 5,
    label: 'very important',
  },
];

const marks3 = [
  {
    value: 1,
    label: 'not at all',
  },
  { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 },

  {
    value: 5,
    label: 'very secure',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function AdversaryStrength() {

  const classes = useStyles();
  const paperStyle = { padding: '50px 50px', width: 600, margin: "20px auto" }

  //each question has its own variable with its associated methods
  const [advStrength, setAdvStrength] = useState('')
  const [advStrength1, setAdvStrength1] = useState('')
  const [advStrength2, setAdvStrength2] = useState([])
  const [advStrength3, setAdvStrength3] = useState('')
  const [advStrength4, setAdvStrength4] = useState('')
  const [advStrength5, setAdvStrength5] = useState('')

  //these store the values of the slide bars
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [q4, setQ4] = useState('')

  const updateVal1 = (e, data) => {
    setQ1(data)
  }
  const updateVal2 = (e, data) => {
    setQ2(data)
  }
  const updateVal3 = (e, data) => {
    setQ3(data)
  }
  const updateVal4 = (e, data) => {
    setQ4(data)
  }
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);


  const handleChange = (event) => {
    setAdvStrength(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange1 = (event) => {
    setAdvStrength1(event.target.value);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleChange2 = (event) => {
    setAdvStrength2(event.target.value);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleChange3 = (event) => {
    setAdvStrength3(event.target.value);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleChange4 = (event) => {
    setAdvStrength4(event.target.value);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleChange5 = (event) => {
    setAdvStrength5(event.target.value);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleOpen5 = () => {
    setOpen5(true);
  };


  let history = useHistory();

  //sends data to the backend
  const handleClickAdversary = (e) => {
    e.preventDefault()
    const state = { advStrength, advStrength1, advStrength2, advStrength3, advStrength4, advStrength5, q1, q2, q3, q4 }

    console.log("Strength set")
    history.push("/profile", state);
  }

  //needed for the flow between the pages (this page is not accessible if user is not logged in)
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h3>For estimating your privacy concerns please answer the following questions:</h3>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">Do you use social networks (like Facebook, LinkedIn, Twitter,...)?</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={advStrength}
            onChange={handleChange}
          >
            <MenuItem value={6}>Yes, public profile</MenuItem>
            <MenuItem value={4}>Yes, private profile</MenuItem>
            <MenuItem value={3}>No, but in the past</MenuItem>
            <MenuItem value={1}>Not at all</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">How present are you in public through your activities and your job?</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open1}
            onClose={handleClose1}
            onOpen={handleOpen1}
            value={advStrength1}
            onChange={handleChange1}
          >
            <MenuItem value={6}>Frequently in the news</MenuItem>
            <MenuItem value={3}>Chairman of an association</MenuItem>
            <MenuItem value={2}>Rarely</MenuItem>
            <MenuItem value={1}>Not at all</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">Who could be a potential adversary? (multiple answers possible)</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            multiple
            open={open2}
            onClose={handleClose2}
            onOpen={handleOpen2}
            value={advStrength2}
            onChange={handleChange2}
          >
            <MenuItem value={6}>Government/Police</MenuItem>
            <MenuItem value={3}>Journalist</MenuItem>
            <MenuItem value={2}>Employer</MenuItem>
            <MenuItem value={1}>Criminal/Hacker</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">How many inhabitants has the city where you live?</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open3}
            onClose={handleClose3}
            onOpen={handleOpen3}
            value={advStrength3}
            onChange={handleChange3}
          >
            <MenuItem value={6}>less than 1.000</MenuItem>
            <MenuItem value={5}>1.000 - 10.000</MenuItem>
            <MenuItem value={3}>10.000 - 100.000</MenuItem>
            <MenuItem value={2}>100.000 - 1 Mio.</MenuItem>
            <MenuItem value={1}>greater than 1 Mio.</MenuItem>
          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">Please select the sector which describes your job best</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open4}
            onClose={handleClose4}
            onOpen={handleOpen4}
            value={advStrength4}
            onChange={handleChange4}
          >
            <MenuItem value={6}>Government/Politics</MenuItem>
            <MenuItem value={5}>Journalist/Author</MenuItem>
            <MenuItem value={4}>Job with high responsibility (like executive, doctor,...)</MenuItem>
            <MenuItem value={3}>Education/Science</MenuItem>
            <MenuItem value={2}>Entertainment</MenuItem>
            <MenuItem value={1}>other Service</MenuItem>

          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="controlled-open-select-label">Are you active in an NGO?</InputLabel>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open5}
            onClose={handleClose5}
            onOpen={handleOpen5}
            value={advStrength5}
            onChange={handleChange5}
          >
            <MenuItem value={6}>Yes</MenuItem>
            <MenuItem value={3}>No, but in the past</MenuItem>
            <MenuItem value={1}>No</MenuItem>

          </Select>
        </FormControl>

        <br /><br />
        How serious do you take your privacy in general?
        <Slider
          defaultValue={3}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          marks={marks1}
          //marks={true}
          min={1}
          max={5}
          onChange={updateVal1}
        />

        <br />
        How important do you think is it to protect your health data?
        <Slider
          defaultValue={3}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          marks={marks2}
          min={1}
          max={5}
          onChange={updateVal2}
        />

        <br />
        How important do you think it is to protect your place of residence?
        <Slider
          defaultValue={3}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          marks={marks2}
          min={1}
          max={5}
          onChange={updateVal3}
        />

        <br />
        How strong do you want to protect information about your job or degree?
        <Slider
          defaultValue={3}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="auto"
          marks={marks3}
          min={1}
          max={5}
          onChange={updateVal4}
        />

        <br />
        <Button variant="contained" color="secondary" onClick={handleClickAdversary}>
          Submit
        </Button>
      </Paper>
    </Container>
  );
}
