import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, Input, Button, InputLabel, makeStyles } from '@material-ui/core';
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
 * Form for per-file questions
 * @param adversaryState state from the adversary form
 */
export default function CheckboxLabels(adversaryState) {
  //each checkbox has its own variable
  const [state, setState] = React.useState({
    numFiles: 1,
    numCountry: 0,
    numCity: 0,
    numGPS: 0,
    numAge: 0,
    numGender: 0,
    numBody: 0,
    numHealth: 0,
    numJob: 0,
    numDegree: 0,
    numConnection: 0,
    numGrade: 0,
    numSport: 0,
    numOther: 0,
    checkCountry: false,
    checkCity: false,
    checkGPS: false,
    checkAge: false,
    checkGender: false,
    checkBody: false,
    checkHealth: false,
    checkJob: false,
    checkDegree: false,
    checkConnection: false,
    checkGrades: false,
    checkSports: false,
    checkOther: false,
  });

  const classes = useStyles();

  //when clicking on a checkbox the value gets changed here
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangeCount = (event) => {
    setState({ ...state, [event.target.name]: parseInt(event.target.value) });
  }

  let history = useHistory(); //needed for flow between the pages

  //sends data to the backend
  const handleClick = (e) => {
    e.preventDefault();
    const input = { ...state, ...adversaryState.adversaryState }; // no idea why this needs adversaryState.adversaryState, but it works
    console.log(input);
    history.push("/privacyVal", input);
  }
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={state.checkCountry} onChange={handleChange} name="checkCountry" />}
        label="Country"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkCity} onChange={handleChange} name="checkCity" />}
        label="City"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkGPS} onChange={handleChange} name="checkGPS" />}
        label="GPS-Location"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkAge} onChange={handleChange} name="checkAge" />}
        label="Age/Birthdate"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkGender} onChange={handleChange} name="checkGender" />}
        label="Gender"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkBody} onChange={handleChange} name="checkBody" />}
        label="Body size/weight"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkHealth} onChange={handleChange} name="checkHealth" />}
        label="Health data"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkJob} onChange={handleChange} name="checkJob" />}
        label="Profession/Job"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkDegree} onChange={handleChange} name="checkDegree" />}
        label="Degree/Diploma"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkConnection} onChange={handleChange} name="checkConnection" />}
        label="Connection to other people"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkGrades} onChange={handleChange} name="checkGrades" />}
        label="Grades"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkSports} onChange={handleChange} name="checkSports" />}
        label="Sports/physical activity"
      />
      <FormControlLabel
        control={<Checkbox checked={state.checkOther} onChange={handleChange} name="checkOther" />}
        label="Other data"
      />

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files</InputLabel>
        <Input name="numFiles" value={state.numFiles} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with counties</InputLabel>
        <Input name="numCountry" value={state.numCountry} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with cities</InputLabel>
        <Input name="numCity" value={state.numCity} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with GPS data</InputLabel>
        <Input name="numGPS" value={state.numGPS} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with age/birthdate</InputLabel>
        <Input name="numAge" value={state.numAge} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with gender</InputLabel>
        <Input name="numGender" value={state.numGender} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with height/weight data</InputLabel>
        <Input name="numBody" value={state.numBody} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with health data</InputLabel>
        <Input name="numHealth" value={state.numHealth} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with job/professional data</InputLabel>
        <Input name="numJob" value={state.numJob} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with degrees</InputLabel>
        <Input name="numDegree" value={state.numDegree} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with social connections</InputLabel>
        <Input name="numConnection" value={state.numConnection} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with grades</InputLabel>
        <Input name="numGrade" value={state.numGrade} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files with sports data</InputLabel>
        <Input name="numSport" value={state.numSport} type="number" onChange={handleChangeCount} />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="component-simple">Number of files other data</InputLabel>
        <Input name="numOther" value={state.numOther} type="number" onChange={handleChangeCount} />
      </FormControl>

      <div>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Calculate Privacy
        </Button>
      </div>
    </FormGroup>
  );
}
