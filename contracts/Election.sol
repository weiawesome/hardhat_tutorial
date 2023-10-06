// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {

    struct Candidate {
        address addr;
        string name;
        string manifesto;
        uint256 depositAmount;
        bool isRegistered;
    }
    struct VotesResult {
        address addr;
        uint votes;
    }

    mapping(address => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    mapping(address => uint) public voteStatus;

    address payable public owner;
    uint public voteTime;
    uint public voteTallyingTime;
    address[] public candidatesAddress;

    uint private leastVoteCount;
    uint private depositCount;
    bool private isSuspended;

    event RegisterRecord(address addr,string name,string manifesto,uint time);
    event UpdateInfoRecord(address addr,string name,string manifesto,uint time);
    event VoteRecord(address addr,uint time);
    event DepositRecord(address addr,uint count,uint time);

    constructor(uint _voteTime,uint _voteTallyingTime,uint _leastVoteCount,uint _depositCount) payable {
        require(
            _voteTallyingTime > _voteTime,
            "Vote tallying time should be after the vote time"
        );
        require(
            block.timestamp < _voteTime,
            "Vote time should be in the future"
        );

        voteTime = _voteTime;
        voteTallyingTime=_voteTallyingTime;
        leastVoteCount=_leastVoteCount;
        depositCount=_depositCount;
        owner = payable(msg.sender);
        isSuspended =false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    modifier contractValid() {
        require(isSuspended ==false,"The election is Stopping");
        _;
    }
    modifier beforeVote(){
        require(block.timestamp<voteTime,"Error vote has been started!");
        _;
    }
    modifier inVote(){
        require(block.timestamp>voteTime && block.timestamp<voteTallyingTime,"Now is not vote time!");
        _;
    }
    modifier afterVote(){
        require(block.timestamp>voteTallyingTime,"Now is not vote tallying time!");
        _;
    }

    function registerCandidate(string memory _name, string memory _manifesto) public payable contractValid beforeVote{
        require(!candidates[msg.sender].isRegistered, "Candidate is already registered");
        require(msg.value == depositCount, "Error deposit amount");

        Candidate memory newCandidate = Candidate({
            addr : msg.sender,
            name: _name,
            manifesto: _manifesto,
            depositAmount: msg.value,
            isRegistered: true
        });

        candidates[msg.sender] = newCandidate;
        candidatesAddress.push(msg.sender);
        emit RegisterRecord(msg.sender,_name,_manifesto,block.timestamp);
    }
    function updateCandidateInfo(string memory _name, string memory _manifesto) public contractValid beforeVote{
        require(candidates[msg.sender].isRegistered, "Candidate is not registered");

        Candidate storage candidateToUpdate = candidates[msg.sender];
        candidateToUpdate.name = _name;
        candidateToUpdate.manifesto = _manifesto;

        emit UpdateInfoRecord(msg.sender,_name,_manifesto,block.timestamp);

    }

    function vote(address addr) public contractValid inVote{
        require(hasVoted[msg.sender]==false,"The voter has been voted");
        require(candidates[addr].isRegistered==true,"The candidate is not exist");

        hasVoted[msg.sender]=true;
        voteStatus[addr]+=1;

        emit VoteRecord(msg.sender,block.timestamp);
    }

    function revealVotes() public view contractValid afterVote returns (VotesResult[] memory) {
        VotesResult[] memory votesResult = new VotesResult[](candidatesAddress.length);

        for (uint i = 0; i < candidatesAddress.length; i++) {
            votesResult[i].addr=candidatesAddress[i];
            votesResult[i].votes=voteStatus[candidatesAddress[i]];
        }

        return votesResult;
    }
    function refundDeposit() public contractValid afterVote {
        require(address(this).balance>0,"The contract has no more balance!");
        for (uint i=0;i<candidatesAddress.length;i++){
            if (voteStatus[candidatesAddress[i]]>=leastVoteCount){
                address payable addr=payable(candidatesAddress[i]);
                addr.transfer(candidates[candidatesAddress[i]].depositAmount);
                emit DepositRecord(candidatesAddress[i],candidates[candidatesAddress[i]].depositAmount,block.timestamp);
                candidates[candidatesAddress[i]].depositAmount=0;
            }
        }
        uint amount=address(this).balance;
        owner.transfer(amount);
        emit DepositRecord(owner,amount,block.timestamp);
    }

    function getCandidates() public view contractValid returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidatesAddress.length);
        uint256 index = 0;

        for (uint256 i = 0; i < candidatesAddress.length; i++) {
            address addr = candidatesAddress[i];
            Candidate storage candidate = candidates[addr];
            if (candidate.isRegistered) {
                result[index] = candidate;
                index++;
            }
        }

        return result;
    }
    function getSpecificCandidate(address addr) public view contractValid returns (Candidate memory){
        require(candidates[addr].isRegistered==true,"The candidate is not exist!");
        return candidates[addr];
    }
    function getSpecificCandidateByName(string memory _name) public view contractValid returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidatesAddress.length);
        uint index = 0;

        for (uint i = 0; i < candidatesAddress.length; i++) {
            if (candidates[candidatesAddress[i]].isRegistered == true && keccak256(bytes(candidates[candidatesAddress[i]].name)) == keccak256(bytes(_name))) {
                address addr = candidatesAddress[i];
                result[index] = candidates[addr];
                index++;
            }
        }

        Candidate[] memory finalResult = new Candidate[](index);
        for (uint j = 0; j < index; j++) {
            finalResult[j] = result[j];
        }

        return finalResult;
    }

    function suspend() public onlyOwner {
        isSuspended=true;
    }
    function stopSuspend() public onlyOwner {
        isSuspended=false;
    }
}
