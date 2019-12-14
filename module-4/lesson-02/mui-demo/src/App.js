import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import "./App.css";

const useStyles = makeStyles(theme => {
  return {
    root: {
      flexgrow: 1,
      width: '100%',
    },
    paper: {
      height: 140,
      width: 100,
      backgroundColor: "red"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
  };
});

function App() {
  const classes = useStyles()
  const [spacing, setSpacing] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  const [RowCheck, setRowCheck] = React.useState(true)
  const [labelText, setLabelText] = React.useState("Row")

  const [expanded, setExpanded] = React.useState(false);
  const handleExpansion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };




  return (
    <div className="App">
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {[0, 1, 2].map(value => (
              <Grid key={value} item>  <Paper className={classes.paper} /> </Grid>))}
          </Grid>
        </Grid>
        <FormControlLabel
          labelPlacement="top"
          label={labelText}
          control={
            <Switch  checked={checked} onChange={() => {
                setChecked(!checked)
                setRowCheck(checked)
                setLabelText(!checked ? "Column" : "Row")
              }}
            />
          }
        />
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleExpansion('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Setting</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {<Grid container>
                <RadioGroup  name="spacing" value={spacing.toString()} onChange={handleChange} row={RowCheck} >
                  {[0, 1, 2, 5, 7, 9].map(value => (
                    <FormControlLabel key={value} control={<Radio />} label={value} value={value.toString()} />
                  ))}
                </RadioGroup>
              </Grid>}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
}

export default App;
