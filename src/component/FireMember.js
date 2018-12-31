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
    width: 500,
  },
  dense: {
    marginTop: 100,
  },
  menu: {
    width: 1100,
  },
});


class FireMember extends React.Component {
  state = {
    memberAddr: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // 投票按钮
  fire = async()=>{
    var msg = {"memberAddr": this.state.memberAddr}
    this.props.transferMsg(msg);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Member address"
          className={classes.textField}
          onChange={this.handleChange('memberAddr')}
          margin="none"
        />
        <Button variant="contained" color="primary" onClick={this.fire} className={classes.button}>
          Fire Member
        </Button>
      </form>
     
    );
  }
}

FireMember.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FireMember);
