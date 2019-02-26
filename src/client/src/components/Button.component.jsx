import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Autorenew from "@material-ui/icons/Autorenew";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    width: 300
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  container: {
    marginBottom: 6
  }
});

const FloatingActionButtons = props => {
  const { classes, onClick, name } = props;
  return (
    <div className={classes.container}>
      <Fab
        onClick={onClick}
        variant="extended"
        color="primary"
        className={classes.fab}
      >
        <Autorenew className={classes.extendedIcon} />
        {name}
      </Fab>
    </div>
  );
};

export default withStyles(styles)(FloatingActionButtons);
