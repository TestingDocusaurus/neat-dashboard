import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CircularProgress } from 'material-ui';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import UsersPage from './pages/Users';
import AddUserPage from './pages/AddUser';
import ForexPage from './pages/Forex';
import auth from './auth';
import './App.css';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  setIsAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Component {...props} setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Routes extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    auth.checkAuth(isAuthenticated => {
      this.props.setIsAuthenticated(isAuthenticated);
      this.setState({
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading } = this.state;
    const { pathname, isAuthenticated, setIsAuthenticated } = this.props;

    if ((pathname === '/' && !localStorage.getItem('user')) || !isLoading) {
      return (
        <React.Fragment>
          <PublicRoute
            exact
            path="/"
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            component={LoginPage}
          />
          <PrivateRoute
            exact
            path="/home"
            isAuthenticated={isAuthenticated}
            component={HomePage}
          />
          <PrivateRoute
            exact
            path="/users"
            isAuthenticated={isAuthenticated}
            component={UsersPage}
          />
          <PrivateRoute
            exact
            path="/add-user"
            isAuthenticated={isAuthenticated}
            component={AddUserPage}
          />
          <PrivateRoute
            exact
            path="/forex"
            isAuthenticated={isAuthenticated}
            component={ForexPage}
          />
        </React.Fragment>
      );
    }

    return (
      <div className="fullContainer">
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  }
}

export default Routes;
