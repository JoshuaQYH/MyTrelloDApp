import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SubjectIcon from '@material-ui/icons/Subject';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});


class Content extends React.Component{
  
  state = {team_contract: null, task_contract: [], 
    web3: null, accounts: null, mobileOpen: false, 
    team_name: null, teamAddress: null, 
    max_staffID: null, memberList: [],
    max_taskID: null, task_contract: [],taskAddress: [],
    task_info:[],
    finish_open: false,
    remove_member_open: false,
    add_member_open: false,
    add_member_address: null,
    add_member_name:null,
    remove_member_address: null};

    finish_handleClickOpen = ()=>{
      this.setState({finish_open: true})
    }
    finish_handleClickClose = ()=>{
      this.setState({finish_open: false})
    }

    addMember_handleClickOpen = ()=>{
      this.setState({add_member_open: true})
    }
    addMember_handleClickClose = ()=>{
      this.setState({add_member_open: false})
    }

    removeMember_handleClickOpen = ()=>{
      this.setState({remove_member_open: true})
    }
    removeMember_handleClickClose = ()=>{
      this.setState({remove_member_open: false})
    }
    
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
  
     // add member 按钮
    addMemberEvent = async()=>{
      var msg = {"taskID": this.props.taskID,"msg": "add","memberAddr": this.state.add_member_address, "memberName": this.state.add_member_name}
      this.props.transferMsg(msg);
      this.addMember_handleClickClose();
    }

    // remove member 按钮
    removeMemberEvent = async()=>{
      var msg = {"taskID": this.props.taskID,"msg": "remove","memberAddr": this.state.remove_member_address}
      this.props.transferMsg(msg);
      this.removeMember_handleClickClose()
    }

    // finish按钮
    finishEvent = async()=>{
      var msg = {"taskID": this.props.taskID,"msg": "finish", "finish": true}
      this.props.transferMsg(msg);
      this.finish_handleClickClose()
    }

    render(){
      const { classes } = this.props;
      console.log(this.props)

      var task_state = "";
      if(this.props.taskState === "0"){
        task_state = "starting..."
      }
      else{
        task_state = "ended..."
      }

      var vote_flag =""
      if(this.props.taskInfo._voteFlag === true){
        vote_flag = "true";
      }
      else{
        vote_flag = "false"
      }
      
      var ac_end_time;
      if(this.props.taskInfo._actualEndTime === "0"){
        ac_end_time = "not yet."
      }else{
        ac_end_time = this.props.taskInfo._actualEndTime
      }

      // memberList
      var member_name_list = ""
      for(var i = 0; i < this.props.memberList.length; i++){
        if(i === 0){
          member_name_list = "Creator"
        }
        else
           member_name_list += this.props.memberList[i]._name + " "
      }
      console.log(member_name_list)
     
      return (
        <div>
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SubjectIcon/>
                </Grid>
                <Grid item xs>
                <Typography  color="textSecondary" align="center" variant = "h5">
                  {this.props.taskInfo._taskName}
                </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" className={classes.addUser} onClick={this.addMember_handleClickOpen}>
                    Add Member
                  </Button>
                  <Button variant="contained" color="secondary" className={classes.addUser} onClick={this.removeMember_handleClickOpen}>
                    remove Member
                  </Button>
                  <Button variant="contained" color="inherit" className={classes.addUser} onClick={this.finish_handleClickOpen}>
                    Finish
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="left">
            Description: {this.props.taskInfo._description}
            </Typography>
            <Typography color="textSecondary" align="left">
              Task state: {task_state} 
            </Typography>
            <Typography color="textSecondary" align="left">
              Start Time: {this.props.taskInfo._startTime} 
            </Typography>
            <Typography color="textSecondary" align="left">
              Expected End Time: {this.props.taskInfo._endTime} 
            </Typography>
            <Typography color="textSecondary" align="left">
              Actual End Time: {ac_end_time} 
            </Typography>
            <Typography color="textSecondary" align="left">
              Member List: {member_name_list}
            </Typography>
            <Typography color="textSecondary" align="left">
              Can vote:  {vote_flag} 
            </Typography>
          </div>
        </Paper>

        <Dialog
          open={this.state.add_member_open}
          onClose={this.addMember_handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are adding member for the task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Member Address"
              fullWidth
              onChange={this.handleChange('add_member_address')}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Member Name"
              onChange={this.handleChange('add_member_name')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.addMemberEvent} color="primary">
              Add 
            </Button>
            <Button onClick={this.addMember_handleClickClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        
        <Dialog
          open={this.state.remove_member_open}
          onClose={this.removeMember_handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Remove member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are removing member for the task.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Member Address"
              fullWidth
              onChange={this.handleChange('remove_member_name')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.removeMemberEvent} color="primary">
              Remove
            </Button>
            <Button onClick={this.removeMember_handleClickClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog
        open={this.state.finish_open}
        onClose={this.finish_handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">{"Are you sure the task is OK?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you finish the task, it could be change again. Because it will be record in the blockchain. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.finishEvent} color="primary">
            Finish
          </Button>
          <Button onClick={this.finish_handleClickClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
        </Dialog>

      
        </div>
      );
    }
}


Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
