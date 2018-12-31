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
  button: {
    margin: theme.spacing.unit,
  },
});


class VoteTo extends React.Component {
  state = {
    taskAddr: '',
    memberAddr: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // 投票按钮
  voteTo = async()=>{
    console.log(this.state.taskAddr)
    console.log(this.state.memberAddr)
    var msg = {"taskAddr": this.state.taskAddr, "memberAddr": this.state.memberAddr}
    this.props.transferMsg(msg);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Task Address"
          className={classes.textField}
          onChange={this.handleChange('taskAddr')}
          margin="auto"
        />
        <TextField
          id="standard-name"
          label="Member address"
          className={classes.textField}
          onChange={this.handleChange('memberAddr')}
          margin="auto"
        />
        <Button variant="contained" onClick={this.voteTo} color="primary" className={classes.button}>
          VoteTo
        </Button>
      </form>
     
    );
  }
}

VoteTo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VoteTo);
