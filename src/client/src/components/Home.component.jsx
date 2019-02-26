import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Navbar from "./Navbar.component";
import TableComponent from "./Table.component";
import SpinnerComponent from "./Spinner.component";
import ButtonComponent from "./Button.component";
import SnackBarComponent from "./SnackBar.component";

const generateButtonName = "Generate Phone Numbers";
const viewButtonName = "View All Phone Numbers";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 8
  },
  paper: {
    height: 680,
    width: 600
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  textField: {
    marginRight: theme.spacing.unit,
    width: 300,
    marginBottom: 15
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 8
  }
});

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      phoneNumbers: [],
      numberOfPhoneNumbers: null,
      generate: false,
      phoneNumberCount: null,
      showSnackBar: false,
      errorMessage: null
    };

    this.generateNumbers = this.generateNumbers.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.viewNumbers = this.viewNumbers.bind(this);
  }

  async componentDidMount() {
    await this.viewNumbers();
  }

  handleChange = event => {
    const value = Number(event.target.value);
    if (Number.isInteger(value)) {
      this.setState({ phoneNumberCount: value });
    } else {
      this.setState({ phoneNumberCount: "invalid" });
    }
  };

  async handleClose() {
    await this.setState({
      showSnackBar: false,
      errorMessage: null
    });
  }

  async generateNumbers() {
    try {
      let response;
      const { phoneNumberCount } = this.state;
      if (phoneNumberCount > 0) {
        response = await axios.post("/api/v1/generate", {
          phoneNumberCount
        });
      } else {
        response = await axios.post("/api/v1/generate");
      }
      this.setState({
        phoneNumbers: response.data.data,
        numberOfPhoneNumbers: response.data.length,
        isLoading: false,
        generate: true
      });
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({
        showSnackBar: true,
        errorMessage
      });
    }
  }

  async viewNumbers() {
    const response = await axios.get("/api/v1/phone");
    this.setState({
      phoneNumbers: response.data.data,
      numberOfPhoneNumbers: response.data.length,
      isLoading: false
    });
  }

  renderActionButton() {
    const { phoneNumberCount } = this.state;
    const { classes } = this.props;
    const isError = phoneNumberCount === "invalid";
    return (
      <div className="button-container">
        <div className="button">
          <form className={classes.container} noValidate autoComplete="off">
            <FormControl className={classes.container} error={isError}>
              <InputLabel htmlFor="component-error">Number</InputLabel>
              <Input
                className={classes.textField}
                placeholder="Number of phone numbers to generate"
                onChange={this.handleChange}
                aria-describedby="component-error-text"
              />
              {isError && (
                <FormHelperText id="component-error-text">
                  should be a number
                </FormHelperText>
              )}
            </FormControl>
          </form>
          <ButtonComponent
            name={generateButtonName}
            onClick={this.generateNumbers}
          />
          <ButtonComponent name={viewButtonName} onClick={this.viewNumbers} />
        </div>
      </div>
    );
  }

  renderTableComponent() {
    const { phoneNumbers, generate, numberOfPhoneNumbers } = this.state;
    const phoneToArray = phoneNumbers.split(",");
    const titleHeaderForAllNumbers = `LIST OF ALL GENERATED PHONE NUMBERS - ${numberOfPhoneNumbers} IN TOTAL`;
    const titleHeaderForGeneratedNumbers = `${numberOfPhoneNumbers} OF PHONE NUMBERS GENERATED`;
    const title = generate
      ? titleHeaderForGeneratedNumbers
      : titleHeaderForAllNumbers;
    return (
      <div className="table-container">
        <TableComponent phoneNumbers={phoneToArray} title={title} />
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderSpinner() {
    return (
      <div>
        <div className="spinner-container">
          <SpinnerComponent />
        </div>
      </div>
    );
  }

  renderSnackBar() {
    const { showSnackBar, errorMessage } = this.state;
    return (
      <div className="snackBar">
        <SnackBarComponent
          open={showSnackBar}
          handleClose={this.handleClose}
          errorMessage={errorMessage}
        />
      </div>
    );
  }

  renderGrid() {
    const { classes } = this.props;
    const { isLoading } = this.state;
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            <Grid item>
              <Paper className={classes.paper}>
                {this.renderActionButton()}
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper}>
                {isLoading ? this.renderSpinner() : this.renderTableComponent()}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div className={{ display: "block" }}>
        <Navbar />
        {this.renderGrid()}
        {this.renderSnackBar()}
      </div>
    );
  }
}

export default withStyles(styles)(HomeComponent);
