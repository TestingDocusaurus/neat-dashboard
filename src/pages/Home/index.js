import React, { PureComponent } from 'react';
import { Typography } from 'material-ui';

class HomePage extends PureComponent {
  render() {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
      <Typography
        variant="display1"
        color="primary"
        align="center"
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        Welcome back, {user.first_name} {user.last_name}!
      </Typography>
    );
  }
}

export default HomePage;
