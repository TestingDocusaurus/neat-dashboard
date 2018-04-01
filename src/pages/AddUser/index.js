import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SendIcon from 'material-ui-icons/Send';
import { Button, Tooltip, Paper } from 'material-ui';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import _ from 'lodash';

import { addUser } from '../../api';
import { withStyles } from 'material-ui/styles';
import '../../App.css';
import './styles.css';

const styles = theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 13,
    right: theme.spacing.unit * 2
  }
});

const errorLabel = 'This field is required';

class AddUserPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      telephoneNumber: '',
      firstName: '',
      lastName: '',
      isSubmit: false,
      error: ''
    };
  }

  handleChangeEmail = event => {
    const { value: email } = event.target;
    this.setState({
      email
    });
  };

  handleChangePassword = event => {
    const { value: password } = event.target;
    this.setState({
      password
    });
  };

  handleChangeTelephoneNumber = event => {
    const { value: telephoneNumber } = event.target;
    this.setState({
      telephoneNumber
    });
  };

  handleChangeFirstName = event => {
    const { value: firstName } = event.target;
    this.setState({
      firstName
    });
  };

  handleChangeLastName = event => {
    const { value: lastName } = event.target;
    this.setState({
      lastName
    });
  };

  requestAddUser = async () => {
    const {
      email,
      password,
      telephoneNumber,
      firstName,
      lastName
    } = this.state;
    const { history } = this.props;

    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('telephone_number', telephoneNumber);
    data.append('first_name', firstName);
    data.append('last_name', lastName);

    let response = await addUser(data);
    let result = await response.json();

    if (result.error) {
      return this.setState({
        error: result.error.message
      });
    }

    history.push('/users');
  };

  handleSubmit = () => {
    this.setState({
      isSubmit: true
    });

    const {
      email,
      password,
      telephoneNumber,
      firstName,
      lastName
    } = this.state;

    if (
      _.isEmpty(email) ||
      _.isEmpty(password) ||
      _.isEmpty(telephoneNumber) ||
      _.isEmpty(firstName) ||
      _.isEmpty(lastName)
    ) {
      return;
    }

    this.requestAddUser();
  };

  render() {
    const {
      isSubmit,
      email,
      firstName,
      lastName,
      telephoneNumber,
      password,
      error
    } = this.state;

    const { classes } = this.props;

    return (
      <div className="container">
        <Paper className="paper" elevation={1}>
          <br />
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(email)}
              aria-describedby="email-text">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={email}
                onChange={this.handleChangeEmail}
                className="inputText"
              />
              {isSubmit &&
                _.isEmpty(email) && (
                  <FormHelperText id="email-text">{errorLabel}</FormHelperText>
                )}
            </FormControl>
          </div>
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(password)}
              aria-describedby="password-text">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={this.handleChangePassword}
                className="inputText"
              />
              {isSubmit &&
                _.isEmpty(password) && (
                  <FormHelperText id="password-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(telephoneNumber)}
              aria-describedby="phone-text">
              <InputLabel htmlFor="phone">Telephone Number</InputLabel>
              <Input
                id="phone"
                value={telephoneNumber}
                onChange={this.handleChangeTelephoneNumber}
                className="inputText"
              />
              {isSubmit &&
                _.isEmpty(telephoneNumber) && (
                  <FormHelperText id="phone-text">{errorLabel}</FormHelperText>
                )}
            </FormControl>
          </div>
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(firstName)}
              aria-describedby="first-name-text">
              <InputLabel htmlFor="first-name">First Name</InputLabel>
              <Input
                id="first-name"
                value={firstName}
                onChange={this.handleChangeFirstName}
                className="inputText"
              />
              {isSubmit &&
                _.isEmpty(firstName) && (
                  <FormHelperText id="first-name-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <div className="textField">
            <FormControl
              error={isSubmit && _.isEmpty(lastName)}
              aria-describedby="last-name-text">
              <InputLabel htmlFor="last-name">Last Name</InputLabel>
              <Input
                id="last-name"
                value={lastName}
                onChange={this.handleChangeLastName}
                className="inputText"
              />
              {isSubmit &&
                _.isEmpty(lastName) && (
                  <FormHelperText id="last-name-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <span className={`error ${!_.isEmpty(error) ? 'visible' : 'hidden'}`}>
            {error}
          </span>
        </Paper>
        <Tooltip title="Submit">
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={this.handleSubmit}>
            <SendIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

AddUserPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddUserPage);
