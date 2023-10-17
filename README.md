# HardHat Tutorial

## What is Smart contract ?
A smart contract is a self-executing digital contract with automated terms and actions, often used in blockchain technology.

## How to install ?
```shell
git clone https://github.com/weiawesome/hardhat_tutorial.git
```

## The Contracts
### 1. Lock
### 2. Election
### 3. CrowdFunding

## Contract - Lock
### Main function
> Deployer can lock the asset and set the time to the contract.
> 
> Until reaching the setting time, deployer can't get the asset back.

### How to deploy
```shell
npx hardhat run scripts/deploy.ts
```

## Contract - Election
### Main function
> Deployer can hold an election set the basic asset, vote time and vote tallying time.
 
* **Before the voting**

> Anyone can register to be a candidate and need to pay margin deposit.
>
> Candidate can edit the information(name, manifesto...).

* **In the voting**

> Anyone can vote a candidate onetime.
>
> Anyone's vote is all equal.

* **In the vote tallying**

> It will reveal the result of election.
>
> If the candidate's vote number is higher than mini vote number, the contract will return their margin deposit. 

* **Any Time**

> Anyone can get all the candidates' information(address, name, manifesto...).
> 
> Can search by name, address to get specific candidate's information.

### How to deploy
```shell
npx hardhat run scripts/election/deploy.ts
```

## Contract - Crowdfunding
### Main function
> Deployer can build a crowdfunding platform, proposer can propose and the contract can build a new contract for the proposal.

* **Platform** 

> The proposer can propose to the platform that will make a contract for the proposal.
> 
> The proposer can activate the contract by the platform.
> 
> The proposer can update the personal information for sponsor to view it.

* **Proposer**

> Proposer can edit its contract's information.
> 
> Contract will deal with the asset auto by its type and the rule.

* **Sponsor**

> Sponsor can view the contract(proposal) information and back the project.

### How to deploy
```shell
npx hardhat run scripts/crowdFunding/deploy.ts
```


