/// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdFunding {
    address public owner;

    event ProposalEvent(address indexed addr,address indexed contractAddress,string title);
    event UserInfoEvent(address indexed addr,string name,string info);

    constructor(){
        owner=msg.sender;
    }

    function propose(string memory _title) public payable{
        require(msg.value>0,"The proposal need a fundamental asset.");
        Proposal p=new Proposal{value: msg.value}(msg.sender,_title);
        emit ProposalEvent(msg.sender,address(p),_title);
    }

    function activateProposal(address _contractAddr) public{
        Proposal proposal = Proposal(_contractAddr);
        proposal.activateProposal(msg.sender);
    }

    function updatePersonalInfo(string memory _name,string memory _info) public{
        emit UserInfoEvent(msg.sender,_name,_info);
    }
}

contract Proposal{
    enum ProposalType{
        LendingBased,
        EquityBased,
        DonationBased,
        RewardBased
    }
    enum ProposalClassification{
        Social,
        Multimedia,
        Entertainment,
        Publishing,
        Lifestyle,
        Design,
        Technology,
        Leisure,
        Other
    }
    enum ProposalReturnSystem{
        AllOrNothing,
        ForProposer
    }

    struct Plan {
        string title;
        string content;
        uint quantity;
        uint price;
        bool exist;
    }

    address public platformOwner;
    address payable public  owner;
    string public proposalTitle;

    string public info;
    uint public contractAmount;
    uint public goalAmount;
    uint public campaignDuration;
    string[] public plansTitle;
    mapping(string => Plan)  public plans;

    ProposalType public pt;
    ProposalClassification public pc;
    ProposalReturnSystem public pr;

    mapping(address => uint) public backRecord;
    address[] public backers;

    bool public contractValid;

    event BackEvent(address addr,string _title,uint amount);
    event SettlementEvent(address addr,string _title,uint amount);

    constructor(address _owner,string memory _title) payable{
        platformOwner=msg.sender;
        owner=payable(_owner);
        proposalTitle=_title;
        contractValid=false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    modifier onlyContractValid() {
        require(contractValid, "The contract is invalid now");
        _;
    }
    modifier inFundingPeriod(){
        require(block.timestamp<campaignDuration,"The crowd funding time is over.");
        _;
    }
    modifier outFundingPeriod(){
        require(block.timestamp>campaignDuration,"The crowd funding time is not over.");
        _;
    }

    function editInfo(string memory _info) public onlyOwner{
        info=_info;
    }
    function editPlan(string memory _title,string memory _content,uint _quantity,uint _price) public onlyOwner{
        require(plans[_title].exist==false,"The plan has been exist.");
        require(_price>0,"The price must be large then 0.");
        plansTitle.push(_title);
        plans[_title]=Plan(_title,_content,_quantity,_price,true);
    }
    function editGoalAmount(uint _amount) public onlyOwner{
        require(_amount>0,"The GoalAmount must be large than 0.");
        goalAmount=_amount;
    }
    function editCampaignDuration(uint _time) public onlyOwner{
        require(_time>block.timestamp,"The time must be in the future.");
        campaignDuration=_time;
    }
    function editType(ProposalType _pt,ProposalClassification _pc,ProposalReturnSystem _pr) public onlyOwner{
        pt=_pt;
        pc=_pc;
        pr=_pr;
    }

    function getTitle() public view returns(string memory){
        return proposalTitle;
    }
    function getInfo() public view returns(string memory) {
        return info;
    }
    function getPlans() public view returns(Plan[] memory) {
        Plan[] memory result = new Plan[](plansTitle.length);
        uint index = 0;

        for (uint i = 0; i < plansTitle.length; i++) {
            string memory _title=plansTitle[i];
            Plan storage plan = plans[_title];
            if (plan.exist==true){
                result[index]=plan;
                index++;
            }
        }
        return result;
    }
    function getGoalAmount() public view returns(uint) {
        return goalAmount;
    }
    function getType() public view returns(ProposalType,ProposalClassification,ProposalReturnSystem){
        return (pt,pc,pr);
    }
    function getAmount() public view returns(uint) {
        return contractAmount;
    }
    function getCampaignDuration() public view returns(uint) {
        return campaignDuration;
    }


    function backPlan(string memory _title) public payable onlyContractValid inFundingPeriod{
        require(plans[_title].exist==true,"The plan is not exist.");
        require(plans[_title].quantity>0,"The plan is sold out.");
        require(msg.value==plans[_title].price,"The value is not equal to the plan's price.");
        if (pr==ProposalReturnSystem.AllOrNothing){
            if (backRecord[msg.sender]==0){
                backers.push(msg.sender);
            }
            backRecord[msg.sender]+=msg.value;
        }
        contractAmount+=msg.value;
        plans[_title].quantity-=1;
        emit BackEvent(msg.sender,_title,msg.value);
    }

    function settleProposal() public outFundingPeriod{
        if (pr==ProposalReturnSystem.AllOrNothing){
            if (contractAmount>=goalAmount){
                uint remainAmount=address(this).balance;
                owner.transfer(remainAmount);
                emit SettlementEvent(owner,proposalTitle,remainAmount);
            } else{
                for (uint i=0;i<backers.length;i++){
                    address payable addr=payable(backers[i]);
                    addr.transfer(backRecord[backers[i]]);
                    emit SettlementEvent(addr,proposalTitle,backRecord[backers[i]]);
                    backRecord[backers[i]]=0;
                }
                uint remainAmount=address(this).balance;
                owner.transfer(remainAmount);
                emit SettlementEvent(owner,proposalTitle,remainAmount);
            }
        } else if (pr==ProposalReturnSystem.ForProposer){
            uint remainAmount=address(this).balance;
            owner.transfer(remainAmount);
            emit SettlementEvent(owner,proposalTitle,remainAmount);
        }
        contractValid=false;
    }

    function activateProposal(address addr) public{
        require(addr==owner,"Only owner can activate the proposal");
        require((bytes(info)).length!=0,"The information can't be empty.");
        require(plansTitle.length!=0,"The plans can't be empty.");
        require(goalAmount!=0,"The goal amount can't be 0.");
        require(campaignDuration>block.timestamp,"The campaignDuration can't be in the past.");
        contractValid=true;
    }
}
