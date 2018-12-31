pragma solidity ^0.5.0;

contract Task {
    enum TaskState {START, END}

    address public creator;

    struct Member{
        string name;
        bool voted;
        uint voteNum;
        bool existFlag;
    }
    mapping (uint => address) memberIDList;
    mapping (address=>Member) memberList;
    uint maxID;  
    /*
    some configuration of the task.
    */
    string taskName;
    string description;
    uint startTime;
    uint endTime;
    uint actualEndTime;
    TaskState state;
    bool voteFlag;
    
    constructor(string memory _taskName, uint256 _endTime, string memory _description) public {
        taskName = _taskName;
        description = _description;
        maxID = 1;
        creator = tx.origin;
        state = TaskState.START;
        startTime = now;
        endTime = _endTime;
        memberIDList[maxID - 1] = creator;
        memberList[creator].voted = false;
        memberList[creator].voteNum = 0;
        memberList[creator].existFlag = true;
    }

    modifier onlyCreator(){
        require(tx.origin == creator);
        _;
    }
    
    modifier isMember(){
        require(memberList[tx.origin].existFlag == true);
        _;
    }

    function getTaskInfo()external view isMember returns(
        string memory _taskName,
        string memory _description,
        uint _startTime,
        uint _endTime,
        uint _actualEndTime,
        bool _voteFlag
    ){
        return (taskName, description, startTime, endTime, actualEndTime, voteFlag);
    }
    
    function getMember(uint memberID)external view isMember returns(
        string memory _name,
        bool _voted,
        uint _voteNum
    ){
        require(memberID < maxID);
        require(memberList[memberIDList[memberID]].existFlag == true);
        return (memberList[memberIDList[memberID]].name, memberList[memberIDList[memberID]].voted, memberList[memberIDList[memberID]].voteNum);
    }

    function finishTask() external onlyCreator{
        actualEndTime = now;
        state = TaskState.END;
    }

    function addMember(address staff, string memory name) public onlyCreator{
        require(memberList[staff].existFlag == false);
        memberList[staff].name = name;
        memberList[staff].voted = false;
        memberList[staff].voteNum = 0;
        memberIDList[maxID] = staff;
        maxID = maxID + 1;
    }

    function removeMember(address staff)external onlyCreator{
        memberList[staff].existFlag = false;
    }

    function voteTo(address member) external isMember{
        require(voteFlag == true);
        require(memberList[tx.origin].voted == false);
        memberList[member].voteNum += 1;
        memberList[tx.origin].voted = true;
    }

    function setVoteFlag(bool flag)external onlyCreator{
        voteFlag = flag;
    }

    function getVoteFlag()external view isMember returns(bool){
        return voteFlag;
    }

    function setTaskName(string memory name) public onlyCreator{
        taskName = name;
    }

    function getTaskName()external view returns(string memory){
        return taskName;
    }

     function setExpectedEndTime(uint end)external onlyCreator{
        endTime = end;
    }
    function getExpectedEndTime()external view returns(uint){
        return endTime;
    }

    function getActualEndTime()external view returns(uint){
        return actualEndTime;
    }

    function getStateOfTask()external view returns(TaskState){
        return state;
    }

     function getMaxID()public view returns (uint){
        return maxID;
    }
}