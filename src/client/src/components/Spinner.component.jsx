import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    boxShadow: "none"
  },
  progress: {
    margin: theme.spacing.unit * 2,
    marginTop: "auto",
    marginBottom: "auto",
    display: "flex",
    justifyContent: "center"
  },
  spinner: {
    color: "#3f51b5",
    animationDuration: "550ms"
  }
});

function CustomizedProgress(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <div className={classes.progress}>
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.spinner}
          size={32}
          thickness={4}
        />
      </div>
    </Paper>
  );
}

export default withStyles(styles)(CustomizedProgress);
