import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import AddIcon from 'material-ui-icons/Add';
import { withStyles } from 'material-ui/styles';
import { CircularProgress, Button, Tooltip } from 'material-ui';
import _ from 'lodash';

import { fetchUsers, fetchUser } from '../../api';
import '../../App.css';
import './styles.css';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 13,
    right: theme.spacing.unit * 2
  }
});

class UsersPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const response = await fetchUsers();
    const result = await response.json();

    this.setState({
      users: result.data,
      isLoading: false
    });
  };

  getUser = async user => {
    if (!user.account) {
      const index = this.state.users.findIndex(
        userState => userState.id === user.id
      );

      const response = await fetchUser(user.id);
      const result = await response.json();

      const users = _.cloneDeep(this.state.users);
      users[index] = result;

      this.setState({
        users
      });
    }
  };

  render() {
    const { isLoading, users } = this.state;
    const { classes, history } = this.props;

    if (isLoading) {
      return (
        <div className="fullContainer">
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }
    return (
      <div className="container">
        {users.map((user, index) => {
          return (
            <div style={{ marginBottom: 10 }} key={index}>
              <ExpansionPanel
                onChange={(event, expanded) => {
                  if (expanded) {
                    this.getUser(user);
                  }
                }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className="column">
                  <div style={{ width: '15em', height: '.25em' }} />
                  {!user.account && (
                    <div className="panelLoading">
                      <CircularProgress />
                    </div>
                  )}
                  {user.account && (
                    <div className="panel">
                      <div className="panelAcc">
                        <span>Account</span>
                        <span>{user.account.card_number}</span>
                      </div>
                      <div className="panelBalance">
                        <span>${user.account.balance}</span>
                      </div>
                    </div>
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          );
        })}
        <Tooltip title="Add User">
          <Button
            variant="fab"
            className={classes.fab}
            color="primary"
            onClick={() => history.push('/add-user')}>
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

UsersPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersPage);
