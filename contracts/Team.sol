pragma solidity ^0.5.0;

interface TaskInterface {
    enum TaskState {START, END}
    function getTaskInfo()external view  returns(
        string memory _taskName,
        uint _startTime,
        uint _endTime,
        uint _actualEndTime,
        bool _voteFlag
    );
    
    function getMember(address member) external view returns(
        string memory _name,
        bool _voted,
        uint _voteNum
    );
    function finishTask() external;
    function addMember(address staff) external ;
    function removeMember(address staff)external;
    function voteTo(address member) external ;
    function setVoteFlag(bool flag)external;
    function getVoteFlag()external view  returns(bool);
    function getTaskName()external view returns(string memory);
    function setExpectedEndTime(uint end)external;
    function getExpectedEndTime()external view returns(uint);
    function getActualEndTime()external view returns(uint);
    function getStateOfTask()external view returns(TaskState);
}

contract Team{
    ///////////////// basic 
    address public creator;
    uint TeamCreatedTime;
    string TeamName;

    ////////////////// struct
    struct Staff{
        string name;
        uint score;
        bool existFlag;
        string contact;
    }

    ////////////////// storage 
    mapping(uint256 => address) staffIDList;
    mapping(address => Staff)  staffList; 
    uint maxStaffID;

    mapping(uint256 => address) taskIDList;
    mapping(address => TaskInterface) taskList;
    uint maxTaskID;

    ////////////////// event
    event CreateTaskEvent(address _creatorAddress, uint _taskName);
    event RewardEvent(address _from, address _to, uint _value);
    event AddStaffEvent(address _staffAddr);
    event FireStaffEvent(address _staffAddr);

    //////////////// constructor
    constructor(string memory teamName, string memory bossName, string memory _contact) public{
        creator = msg.sender;
        TeamCreatedTime = now;
        TeamName = teamName;
        Staff memory boss = Staff(bossName, 0, true, _contact);
        staffIDList[0] = msg.sender;
        staffList[msg.sender] = boss;
        maxStaffID = 1;
        maxTaskID = 0;
    }

    ////////////////// modifier
    modifier isStaff(address _staff){
        require(staffList[_staff].existFlag == true);
        _;
    }
    modifier isNotStaff(address _staff){
        require(staffList[_staff].existFlag == false);
        _;
    }
    modifier onlyCreator(){
        require(msg.sender == creator);
        _;
    }
    modifier isTeamTask(uint256 _taskID, address _task){
        require(taskIDList[_taskID] == _task);
        _;
    }
   

    ///////////////// staff
    function addStaff(address staffAddr, string memory name, string memory contact) public onlyCreator isNotStaff(staffAddr) returns(bool){
        Staff memory staff = Staff(name, 0, true, contact);
        staffIDList[maxStaffID] = staffAddr;
        maxStaffID = maxStaffID + 1;
        staffList[staffAddr] = staff;
        emit AddStaffEvent(staffAddr);
        return true;
    }

    function fireStaff(address staffAddr) public onlyCreator isStaff(staffAddr) returns(bool){
        staffList[staffAddr].existFlag = false;
        emit FireStaffEvent(staffAddr);
    }

    function getStaffInfo(uint staffID) public isStaff(tx.origin) view
    returns(
        string memory _name,
        address _addr,
        uint _score,
        string memory _contact,
        bool _exitFlag
    ){
        string memory Name = staffList[staffIDList[staffID]].name;
        string memory Contact = staffList[staffIDList[staffID]].contact;
        bool Flag = staffList[staffIDList[staffID]].existFlag;
        uint Score = staffList[staffIDList[staffID]].score;

        return (Name, staffIDList[staffID], 
        Score,  Contact, Flag);
    }

    function rewardForStaff(address payable staffAddr) public onlyCreator payable{
        address(staffAddr).transfer(msg.value);
        emit RewardEvent(msg.sender, staffAddr, msg.value);
    }

    ///////////////// task
    function createTask(address taskAddr) 
    public onlyCreator payable returns(bool){
        TaskInterface _task = TaskInterface(taskAddr);
       // require(_task.creator == creator);
        taskIDList[maxTaskID] = taskAddr;
        maxTaskID = maxTaskID + 1;
        taskList[taskAddr] = _task;
        emit CreateTaskEvent(msg.sender, now);
        return true;
    }

    function getTaskByID(uint256 taskID)public
    isStaff(tx.origin) 
    isTeamTask(taskID, taskIDList[taskID])
    view returns(address){
        return taskIDList[taskID];
    }

    function getTeamName()public view returns(string memory){
        return TeamName;
    }

    function setTeamName(string memory _teamName)public{
        TeamName = _teamName;
    }

    function getMaxStaffID()public view returns (uint) {
        return maxStaffID;
    }

    function getMaxTaskID()public view returns (uint){
        return maxTaskID;
    }

    ///// todo
    // 1 team task 返回ID
    // 
}