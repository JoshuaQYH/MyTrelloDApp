import Team from '../contract/team.json';

const addStaff = async(account, contract, memberAddr, name, contact)=>{
    try{
        const response = await contract.memthods.addStaff(memberAddr, name, contact).send({from: account, gas: '4700000'}); 
        if (response == true){
            console.log("Add member sucessfully.");
      //      alert("Add member successfully.");
        }
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Team call: addStaff function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const fireStaff = async(account, contract, memberAddr)=>{
    try{
        const response = await contract.memthods.fireStaff(memberAddr).send({from: account, gas: '4700000'}); 
        console.log("Add member sucessfully.");
        return response;
     //   alert("Add member successfully."); 
    }
    catch(error){
        console.error(error);
        console.log("Team call: fireStaff function error.");
     //   alert('Error: you cannot fire member temporarily.\n May it\'s a bug.')
    }
}


const getStaffInfo = async(account, contract, memberID)=>{
    try{
        const response = await contract.memthods.getStaffInfo(memberID).call(); 
        console.log(response);
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Team call: getStaffInfo function error.");
      //  alert('Error: you cannot fire member temporarily')
    }
}

const getTeamName = async(account, contract)=>{
    try{
        const response = await contract.memthods.getTeamName().call(); 
        console.log("Get team name sucessfully");
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Team call: getTeamName function error.");
     //   alert('Error: you cannot get team name temporarily')
    }
}


const setTeamName = async(account, contract, TeamName)=>{
    try{
        const response = await contract.memthods.setTeamName(TeamName).send({from: account, gas: '4700000'}); 
        console.log("Set team name successfully");
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Team call: getTeamName function error.");
       // alert('Error: you cannot get team name temporarily')
    }
}



const getMaxTaskID = async(account, contract)=>{
    try{
        const response = await contract.memthods.getMaxTaskID().call(); 
        console.log("get max task id successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get max task id function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}



const getMaxStaffID = async(account, contract)=>{
    try{
        console.log(contract);
        console.log(contract.methods);
        console.log(contract.methods.getMaxStaffID());
        const response = await contract.memthods.getMaxStaffID().call(); 
        console.log("get max staff id successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("staff call: get max staff id function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


export default {addStaff, fireStaff, getStaffInfo, getTeamName, 
        setTeamName, getMaxStaffID, getMaxTaskID};