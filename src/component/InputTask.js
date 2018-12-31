import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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


class InputTask extends React.Component {
  state = {
    taskName: '',
    endTime: '',
    des:''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  //  添加按钮触发事件
  addTask = async()=>{
    var msg = {"taskName": this.state.taskName,
     "endTime": this.state.endTime,
    "des": this.state.des}
    this.props.transferMsg(msg);
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Task Name"
          className={classes.textField}
          onChange={this.handleChange('taskName')}
          margin="auto"
        />
        <TextField
          id="standard-name"
          label="End Time"
          className={classes.textField}
          onChange={this.handleChange('endTime')}
          margin="auto"
        />
        <TextField
          id="standard-name"
          label="Description"
          className={classes.textField}
          onChange={this.handleChange('des')}
          margin="auto"
        />
        <Button variant="contained" color="primary" onClick={this.addTask} className={classes.button}>
          Add Task
        </Button>
      </form>
     
    );
  }
}

InputTask.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputTask);
