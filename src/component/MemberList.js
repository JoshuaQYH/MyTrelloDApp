import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import TeamContractAddress from '../data/teamAddr.json';
import Task from '../contract/task.json';
import Team from '../contract/team.json';
import deployTeamFunc from '../web3Call/deploy_team';
import deployTaskFunc from '../web3Call/deploy_task';
import getWeb3 from '../web3Call/getWeb3';
import task_call from '../web3Call/task_call';
import team_call from '../web3Call/team_call';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


class MemberList extends React.Component{
  state = {
    id: 0, rows: []
  };


  createData(id, name, address, score, contact, status){
    //let id = this.state.id;
    this.setState({id: id});
    return {id, name, address, score, contact, status};
  }

  componentWillReceiveProps = async(nextProps)=>{
    console.log("memberList")
    console.log(nextProps)
    
    var id = nextProps.length - 1;
    var rows = this.state.rows;
    var list = nextProps.list;
    console.log(list)
    for(var i = 0; i <= id; i++){
     // console.log(list[i])
      var data = this.createData(i, list[i]._name, list[i]._addr,
        list[i]._score, list[i]._contact, list[i]._exitFlag);
        console.log(data);
        rows.push(data);
    }
    this.setState({id: id, rows: rows})
    console.log(this.state.rows)
    /*
    console.log("生命周期存在期，父组件传入props")
    const web3 = await getWeb3();
    console.log(nextProps.length);
    const teamAddress = TeamContractAddress.address;
    console.log("memberList: 加载合约中！准备获取member用户信息");
    const teamContract = new web3.eth.Contract(Team.abi, teamAddress);
    console.log(this.props.length);
    for(var i = 0; i < nextProps.length; i++){
      var res = await teamContract.methods.getStaffInfo(i).call();
      var info = this.createData(i, res[0], res[1], res[2], res[3], res[4]);
      console.log(info)
      var newRows = this.state.rows;
      newRows.push(info);
      this.setState({rows: newRows});  // 读取合约数据到state中，进行渲染。
    }
    */
  }

  render(){
    const { classes} = this.props;
    console.log("member render")

    var tableData;
    var _status;
       
    if(this.state.id === 0){
      tableData = <div></div>
    }
    else{
      tableData = this.state.rows.map(row => {
        if(row.status === false){
          _status = "false"
        }
        else{
          _status = "true"
        } 
        return (
          <TableRow key={row.id}>
            <TableCell align="center">{row.id}</TableCell>
            <TableCell component="th" scope="row" align="center">
              {row.name}
            </TableCell>
            <TableCell align="center">{row.address}</TableCell>
            <TableCell align="center">{row.score}</TableCell>
            <TableCell align="center">{row.contact}</TableCell>
            <TableCell align="center">{_status}</TableCell>
          </TableRow>
        );
      })
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Member Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData}
          </TableBody>
        </Table>
      </Paper>
    )
  }

}

MemberList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberList);
