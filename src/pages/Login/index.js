import React, { PureComponent } from 'react';
import _ from 'lodash';
import { Button, Paper } from 'material-ui';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

import { login } from '../../api';
import '../../App.css';

const style = {
  height: 250,
  width: 250,
  textAlign: 'center',
  display: 'inline-block'
};

const errorLabel = 'This field is required';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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

  requestLogin = async () => {
    const { email, password } = this.state;
    const { history, setIsAuthenticated } = this.props;

    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    let response = await login(data);
    let result = await response.json();
    if (result.error) {
      return this.setState({
        error: result.error.message
      });
    }

    localStorage.setItem('user', JSON.stringify(result));
    setIsAuthenticated(true);
    history.push('/home');
  };

  handleLogin = () => {
    this.setState({
      isSubmit: true
    });

    const { email, password } = this.state;

    if (_.isEmpty(email) || _.isEmpty(password)) {
      return;
    }

    this.requestLogin();
  };

  render() {
    const { email, password, isSubmit, error } = this.state;

    return (
      <div className="fullContainer">
        <Paper style={style} elevation={1}>
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
              />
              {isSubmit &&
                _.isEmpty(password) && (
                  <FormHelperText id="password-text">
                    {errorLabel}
                  </FormHelperText>
                )}
            </FormControl>
          </div>
          <span className={`error ${!_.isEmpty(error) ? 'visible' : 'hidden'}`}>
            {error}
          </span>
          <Button
            variant="raised"
            color="primary"
            style={{ marginTop: 25 }}
            onClick={this.handleLogin}>
            Login
          </Button>
        </Paper>
      </div>
    );
  }
}

export default LoginPage;
