import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  root: {
    width: "100%",
    overflowX: "auto",
    display: "block",
    textAlign: "center"
  },
  table: {
    minWidth: 500
  },
  tableData: {
    textAlign: "center",
    fontSize: "1rem"
  }
});

const SimpleTable = props => {
  const { classes, phoneNumbers, title } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableData}>{title}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phoneNumbers.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell
                className={classes.tableData}
                component="th"
                scope="row"
              >
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(SimpleTable);
