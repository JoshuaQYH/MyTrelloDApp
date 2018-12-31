import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../component/Navigator';
import Content from '../component/Content';
import Header from '../component/Header';


import TeamContractAddress from '../data/teamAddr.json';
import Task from '../contract/task.json';
import Team from '../contract/team.json';
import deployTeamFunc from '../web3Call/deploy_team';
import deployTaskFunc from '../web3Call/deploy_task';
import getWeb3 from '../web3Call/getWeb3';
import task_call from '../web3Call/task_call';
import team_call from '../web3Call/team_call';



let theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'initial',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing.unit,
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'initial',
        margin: '0 16px',
        minWidth: 0,
        [theme.breakpoints.up('md')]: {
          minWidth: 0,
        },
      },
      labelContainer: {
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing.unit,
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
};

const drawerWidth = 256;

const styles = () => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
});

class taskInfo extends React.Component {

  state = {team_contract: null, task_contract: [], 
    web3: null, accounts: null, mobileOpen: false, 
    team_name: null, teamAddress: null, 
    max_staffID: null, memberList: [],
    max_taskID: null, task_contract: [],taskAddress: [],
    task_info:[], task_state: [], 
    max_ID:[], task_member_list:[]};

  componentWillMount = async () =>{
    try{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const teamAddress = TeamContractAddress.address;
      console.log("加载team合约中！");
      const teamContract = new web3.eth.Contract(Team.abi, teamAddress);
      console.log(teamContract)
    
      var teamName = await teamContract.methods.getTeamName().call();
      console.log(teamName)
      const maxTaskID = await teamContract.methods.getMaxTaskID().call();
      console.log(maxTaskID)
      
      // 根据team获取task的合约地址，然后获取task合约对象
      var taskAddr = []
      var taskContractSet  = []
      var taskInfoSet = []
      var taskState = []
      var maxIDList = []
      var memberList = []
      for(var i = 0; i < maxTaskID; i++){
        var addr = "";
        await teamContract.methods
        .getTaskByID(i)
        .call({from: accounts[0], gas:'5000000'})
        .then(function(result){
          console.log(result)
          addr = result;
        })
        taskAddr.push(addr)
        const taskContract = new web3.eth.Contract(Task.abi, addr);
        taskContractSet.push(taskContract)
        console.log(taskContract)
        
        // 获取task合约数据
        let info = {}
        await taskContract.methods.getTaskInfo()
        .call({from: accounts[0], gas: "4700000"})
        .then((result)=>{
          console.log(result);
          info = result;
        })
        taskInfoSet.push(info);

        // task state 
        let state = "";
        await taskContract.methods.getStateOfTask()
        .call({from: accounts[0], gas: "4700000"})
        .then((result)=>{
          console.log(result)
          state = result;
        })
        taskState.push(state)


        // task member list
        let maxID;
        await taskContract.methods.getMaxID()
        .call({from: accounts[0], gas:"4700000"})
        .then((result)=>{
          console.log("maxID" + result)
          maxID = result
        })
        maxIDList.push(maxID)
        // 获取memberlist
        let memList = []
        for(var j = 0; j < maxID; j++){
          let memInfo = {};
          await taskContract.methods.getMember(j)
          .call({from: accounts[0], gas:"4700000"})
          .then((result)=>{
            console.log(result)
            memInfo = result
          }) 
          console.log("memInfo")
          console.log(memInfo)
          memList.push(memInfo) 
        }
        memberList.push(memList)
      }
      console.log("memeberList")
      console.log(memberList)

      this.setState({ web3, accounts, team_contract: teamContract,
        taskAddress: taskAddr, task_contract: taskContractSet, max_taskID: maxTaskID,
        team_name: teamName, task_info: taskInfoSet, task_state: taskState,
        max_ID: maxIDList, task_member_list: memberList});

    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  addMember = async(taskID, memberAddr, name)=>{
    try{
      let _web3 = this.state.web3;
      let _account = this.state.accounts[0];
      var taskAddr = this.state.taskAddress[taskID]
      const taskContract = this.state.task_contract[taskID]
      console.log(taskContract)
      await taskContract.methods
      .addMember(memberAddr, name).send({from: _account, gas: "4700000"})
      .then(function(result){
        console.log(result);
        alert("Add member sucessfully.")
      })
    }
    catch(error){
      console.error(error);
      alert("Add member failed. Maybe there's something error. You can open the console for detail.")
    }
  }

  removeMember = async(taskID, memberAddr)=>{
    try{
      let _web3 = this.state.web3;
      let _account = this.state.accounts[0];
      var taskAddr = this.state.taskAddress[taskID]
      const taskContract = this.state.task_contract[taskID]
      console.log(taskContract)
      await taskContract.methods
      .removeMember(memberAddr).send({from: _account, gas: "4700000"})
      .then(function(result){
        console.log(result);
        alert("Remove member sucessfully.")
      })
    }
    catch(error){
      console.error(error);
      alert("Remove member failed. Maybe there's something error. You can open the console for detail.")
    }
  }

  finishTask = async(taskID)=>{
    try{
      let _web3 = this.state.web3;
      let _account = this.state.accounts[0];
      var taskAddr = this.state.taskAddress[taskID]
      const taskContract = this.state.task_contract[taskID]
      console.log(taskContract)
      await taskContract.methods
      .finishTask().send({from: _account, gas: "4700000"})
      .then(function(result){
        console.log(result);
        alert("finish task sucessfully.")
      })
    }
    catch(error){
      console.error(error);
      alert("finish task failed. Maybe there's something error. You can open the console for detail.")
    }
  }

 // 负责解析子组件传递过来的信息
 transferMsg(msg){
  console.log(msg)
  try{
    if(msg.msg === "add"){
      this.addMember(msg.taskID, msg.memberAddr, msg.memberName)
    }
    else if(msg.msg === "remove"){
      this.removeMember(msg.taskID, msg.memberAddr)
    }
    else if(msg.msg === "finish"){
      this.finishTask()
    }
  }catch(error){
    console.log(error)
  }
}

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes} = this.props;
    var taskItem = []
    for(var i = 0; i < this.state.max_taskID; i++){
      console.log(this.state.task_member_list)
      taskItem.push(<Content transferMsg = {msg => this.transferMsg(msg)} 
                    taskInfo = {this.state.task_info[i]} 
                    taskState={this.state.task_state[i]}
                    maxID = {this.state.max_ID[i]}
                    memberList = {this.state.task_member_list[i]} 
                    taskID = {i} />)
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header onDrawerToggle={this.handleDrawerToggle} team_name={this.state.team_name} />
            <main className={classes.mainContent}>
             {taskItem}
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

taskInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(taskInfo);
