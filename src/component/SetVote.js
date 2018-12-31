import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600,
  },
  dense: {
    marginTop: 100,
  },
  menu: {
    width: 1100,
  },
});


class SetVote extends React.Component {
  state = {
    taskAddr: 'null'
  };

  handleChange = taskAddr => event => {
    this.setState({
      [taskAddr]: event.target.value,
    });
  };

  startVoting = async()=>{
    var addr = this.state.taskAddr;
    var msg = {"vote": true, "addr": addr}
    this.props.transferMsg(msg)
  }

  stopVoting = async()=>{
    var msg = {"vote": false, "addr": this.state.taskAddr}
    this.props.transferMsg(msg)
  }

  render() {
    const { classes } = this.props;
    console.log(this.state)
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Task Address"
          className={classes.textField}
          onChange={this.handleChange('taskAddr')}
          margin="none"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick ={this.startVoting}>
          Start Voting. 
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={this.stopVoting} >
          Stop Voting.
        </Button>
      </form>
     
    );
  }
}

SetVote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SetVote);
