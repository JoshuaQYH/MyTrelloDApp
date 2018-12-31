import Task from '../contract/task.json';

const getTaskInfo = async(account, contract, memberAddr)=>{
    try{
        const response = await contract.memthods.getTaskInfo().call(); 
        console.log("get Task info successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: getTaskInfo function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}



const getMember = async(account, contract, memberID)=>{
    try{
        const response = await contract.memthods.getMember(memberID).call(); 
        console.log("get member function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: getMember function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const finishTask = async(account, contract)=>{
    try{
        const response = await contract.memthods.finishTask().send({from: account, gas: '4700000'}); 
        console.log("finishTask function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: finishTask function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const addMember = async(account, contract, staffAddr, name)=>{
    try{
        const response = await contract.memthods.addMember(staffAddr, name).send({from: account, gas: '4700000'}); 
        console.log("add member function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: addMember function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const removeMember = async(account, contract, staffAddr)=>{
    try{
        const response = await contract.memthods.removeMember(staffAddr).send({from: account, gas: '4700000'}); 
        console.log("remove member function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: removeMember function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}

const voteTo = async(account, contract, staffAddr)=>{
    try{
        const response = await contract.memthods.voteTo(staffAddr).send({from: account, gas: '4700000'}); 
        console.log("voteTo function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: voteTo function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const setVoteFlag = async(account, contract, flag)=>{
    try{
        const response = await contract.memthods.setVoteFlag(flag).send({from: account, gas: '4700000'}); 
        console.log("set Vote flag function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: set vote flag function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const getVoteFlag= async(account, contract)=>{
    try{
        const response = await contract.memthods.getVoteFlag().call(); 
        console.log("get vote flag successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get vote flag function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}



const setTaskName = async(account, contract, name)=>{
    try{
        const response = await contract.memthods.setTaskName(name).send({from: account, gas: '4700000'}); 
        console.log("set task name function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: set task name function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const getTaskName= async(account, contract)=>{
    try{
        const response = await contract.memthods.getTaskName().call(); 
        console.log("get taskName successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get task name function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const setExpectedEndTime= async(account, contract,end)=>{
    try{
        const response = await contract.memthods.setExpectedEndTime(end).send({from: account, gas: '4700000'}); 
        console.log("set expected end time  function sucessfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: expected end time function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const getExpectedEndTime = async(account, contract)=>{
    try{
        const response = await contract.memthods.getExpectedEndTime().call(); 
        console.log("get expectedEndtime  successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get expected end time function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const getActualEndTime = async(account, contract)=>{
    try{
        const response = await contract.memthods.getActualEndTime().call(); 
        console.log("get actual Endtime  successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get actual end time function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}



const getStateOfTask = async(account, contract)=>{
    try{
        const response = await contract.memthods.getStateOfTask().call(); 
        console.log("get task state successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get task state function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}


const getMaxID = async(account, contract)=>{
    try{
        const response = await contract.memthods.getMaxID().call(); 
        console.log("get max member id successfully.")
        return response;
    }
    catch(error){
        console.error(error);
        console.log("Task call: get max id function error.");
     //   alert('Error: you cannot add member temporialy. \nMaybe it\'s a bug.')
    }
}





export default {getTaskInfo, getMember, finishTask, addMember,removeMember, voteTo,
setVoteFlag, getVoteFlag, setTaskName, getTaskName, setExpectedEndTime, getExpectedEndTime,
getActualEndTime, getStateOfTask, getMaxID};