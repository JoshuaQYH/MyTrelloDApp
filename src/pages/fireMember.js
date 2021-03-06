import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../component/Navigator';
import Header from '../component/Header';
import FireMember from "../component/FireMember";

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

class fireMember extends React.Component {

  state = {team_contract: null, task_contract: [], 
    web3: null, accounts: null, mobileOpen: false, 
    team_name: null, teamAddress: null, taskAddress: null,
    max_staffID: null, memberList: [],mobileOpen: false, 
    };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentWillMount = async () =>{
    try{
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const teamAddress = TeamContractAddress.address;
      console.log("加载team合约中！");
      const teamContract = new web3.eth.Contract(Team.abi, teamAddress);
      console.log(teamContract)
    
      var teamName = await teamContract.methods.getTeamName().call();

      this.setState({ web3, accounts, team_contract: teamContract, 
        team_name: teamName});

    }
    catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  // web3 调用fireMember函数
  fire = async(memberAddr)=>{

    try{
      let _web3 = this.state.web3;
      let _account = this.state.accounts[0];
    
      const _teamContract = this.state.team_contract;
      console.log(_teamContract)
      await _teamContract.methods
      .fireStaff(memberAddr).send({from: _account, gas: "4700000"})
      .then(function(result){
        console.log(result);
        alert("fire member sucessfully.")
      })
    }
    catch(error){
      console.error(error);
      alert("Fire failed. Maybe there's something error. You can open the console for detail.")
    }
  }

  // 负责解析子组件传递过来的信息
  transferMsg(msg){
    console.log(msg)
    this.fire(msg.memberAddr)
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

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
            <Header onDrawerToggle={this.handleDrawerToggle} team_name={this.state.team_name}/>
            <main className={classes.mainContent}>
              <FireMember transferMsg = {msg => this.transferMsg(msg)} />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

fireMember.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(fireMember);
