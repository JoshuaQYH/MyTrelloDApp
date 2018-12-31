import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';

import TeamContractAddress from '../data/teamAddr.json';
import Task from '../contract/task.json';
import Team from '../contract/team.json';
import deployTeamFunc from '../web3Call/deploy_team';
import deployTaskFunc from '../web3Call/deploy_task';
import getWeb3 from '../web3Call/getWeb3';
import task_call from '../web3Call/task_call';
import team_call from '../web3Call/team_call';



//var HDWalletProvider = require('truffle-hdwallet-provider');
//var mnemonic = "either guide hedgehog erosion buddy still match canal conduct property city limb";
//var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/8873a9f9d7424a6183dc9b4f2c242b79");
//var Web3 = require('web3');
//var web3 = new Web3(provider);

/*
var Web3 = require('web3');
var provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/8873a9f9d7424a6183dc9b4f2c242b79");
var web3 = new Web3(provider);
var acct = web3.eth.accounts.privateKeyToAccount("either guide hedgehog erosion buddy still match canal conduct property city limb");
web3.eth.accounts.wallet.add(acct);
web3.eth.defaultAccount = acct.address;
var auth = new web3.eth.Contract(abi, acct.address);
*/
/*
var ganache = require('ganache-cli');
var Web3 = require('web3');
var web3 = new Web3(ganache.provider());
*/


class App extends Component {
  
  state = {team_contract: null, task_contract: null, web3: null, accounts: null, storage: null}

  componentDidMount = async () => {
    try {
      //TaskAddr.save();
      console.log("准备获取账户！");
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      // Use web3 to get the user's accounts.
      const teamAddress = "0xf1153236bfdc8db0e9e1fea16fed0dd77efbd604";
      console.log("加载合约中！");
      const teamContract = new web3.eth.Contract(Team.abi, teamAddress);
      console.log(teamContract);
      var val = await teamContract.methods.getTeamName().call();
      console.log(val);
      this.setState({ web3, accounts, team_contract: teamContract, storage: val});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  deployTeamEvent = async() => {
    try{
     const {accounts, web3} = this.state;
     const TeamContract = await deployTeamFunc(web3, accounts[0], Team.abi, Team.bytecode, 
      'teamname', 'bossname', 'contact'); 
      
     console.log(TeamContract)
     alert("Deploy sucessfully.The teamAddress is " + TeamContract.options.address)
    }catch(error){
      console.log(error)
      alert("Deploy team ")
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div> Deploy a team</div>
          <Button margin="dense" variant = "contained" color = "primary"  onClick = {()=>this.deployTeamEvent()}> 部署 Team 合约</Button>
         </header>
      </div>
    );
  }
}

export default App;
