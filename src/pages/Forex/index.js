import React, { PureComponent } from 'react';
import { CircularProgress, Button } from 'material-ui';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

import { fetchForex } from '../../api';
import './styles.css';

const POLL_TIME = 1800000;
let pollForex;

class ForexPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      othersToHKD: {},
      hkdToOthers: {},
      isLoading: true,
      isOthersToHKD: true
    };
  }

  componentDidMount() {
    this.getForex();
  }

  getForex = async () => {
    if (pollForex) {
      clearTimeout(pollForex);
    }
    const response = await fetchForex();
    const result = await response.json();

    const { rates } = result;
    const othersToHKD = [];
    const hkdToOthers = [];

    for (const key in rates) {
      othersToHKD.push({
        key,
        value: Number((1 / rates[key]).toFixed(2))
      });
      hkdToOthers.push({
        key,
        value: Number(rates[key].toFixed(2))
      });
    }

    this.setState({
      othersToHKD,
      hkdToOthers,
      isLoading: false
    });

    pollForex = setTimeout(() => this.getForex(), POLL_TIME);
  };

  render() {
    const { isLoading, isOthersToHKD, othersToHKD, hkdToOthers } = this.state;

    const currencies = isOthersToHKD ? othersToHKD : hkdToOthers;

    if (isLoading) {
      return (
        <div className="fullContainer">
          <CircularProgress size={80} thickness={5} />
        </div>
      );
    }

    return (
      <div className="forexContainer">
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          <FormGroup row style={{ marginLeft: 20 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!isOthersToHKD}
                  onChange={() => {
                    this.setState({
                      isOthersToHKD: !isOthersToHKD
                    });
                  }}
                  value={'Toggle'}
                />
              }
              label="Toggle Currency"
            />
          </FormGroup>
          <Button
            variant="raised"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={this.getForex}>
            Refresh Rates
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currencies.map((currency, index) => {
              const value = `1 ${isOthersToHKD ? currency.key : 'HKD'} equals ${
                currency.value
              } ${isOthersToHKD ? 'HKD' : currency.key}`;
              return (
                <TableRow key={index}>
                  <TableCell>{currency.key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ForexPage;
