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


class InputMember extends React.Component {
  state = {
    name: '',
    memberAddr: '',
    contact: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // 添加按钮
  add = async()=>{
    var msg = {"name": this.state.name, 
    "memberAddr": this.state.memberAddr,
     "contact": this.state.contact }
    this.props.transferMsg(msg);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Member Name"
          className={classes.textField}
          onChange={this.handleChange('name')}
          margin="auto"
        />
        <TextField
          id="standard-name"
          label="Member address"
          className={classes.textField}
          onChange={this.handleChange('memberAddr')}
          margin="auto"
        />
        <TextField
          id="standard-name"
          label="Contact"
          className={classes.textField}
          onChange={this.handleChange('contact')}
          margin="auto"
        />
        <Button variant="contained" color="primary" onClick={this.add} className={classes.button}>
          Add Member
        </Button>
      </form>
     
    );
  }
}

InputMember.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputMember);
