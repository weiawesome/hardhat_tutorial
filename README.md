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
### Main Function
> The deployer can initiate an election, setting the fundamental parameters such as the basic asset, the duration for voting, and the time for tallying the votes. 
> 
> Additionally, the deployer can define a minimum vote threshold, and candidates need to accumulate votes exceeding this threshold to have their margin deposit refunded.

* **Before the Voting**

> Any individual can register as a candidate, which requires a margin deposit. Candidates also have the ability to modify their information, including their name and manifesto.

* **During the Voting**

> Any participant can cast one vote for a candidate, and all votes carry equal weight.

* **Vote Tallying**

> The election results will be revealed after the voting period. 
> 
> If a candidate accumulates a vote count exceeding the set minimum threshold, the contract will refund their margin deposit.

* **Administrative Control**

> The contract includes an administrative feature where a designated admin, in addition to the deployer, can manage the contract. 
> 
> The admin has the authority to pause the contract's functionality. This feature is crucial in cases where potential vulnerabilities or issues in the contract are identified, allowing for the contract's operations to be halted to prevent further complications.

* **Anytime Access**

> Any user can access the information of all the candidates, including their addresses, names, and manifestos. 
> 
> It is also possible to search for specific candidate information by name or address.

### How to deploy
```shell
npx hardhat run scripts/election/deploy.ts
```

## Contract - Crowdfunding
### Main Function
> The deployer has the capability to establish a crowdfunding platform. 
> 
> Proposers can submit proposals, and the contract will create a new contract for each proposal.

* **Platform**

> Proposers can submit their proposals to the platform, which will generate a dedicated contract for each proposal.
>
> Proposers can activate the contract through the platform.
>
> Proposers can also update their personal information for sponsors to view.

* **Proposers**

> Proposers have the ability to modify the details of their contracts.
>
> The contract will autonomously manage assets based on their type and the predefined rules.

* **Sponsors**

> Sponsors can access and review the contract (proposal) information and support the project.

### How to deploy
```shell
npx hardhat run scripts/crowdFunding/deploy.ts
```

