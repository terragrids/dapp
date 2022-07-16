# Terragrids DApp
The DApp web interface and Reach backend.

## Functionality
The Terragrids DApp is still a prototype. When running it on a developer's machine, or accessing it at https://testnet.terragrids.org, it shows a simple web UI. 

A button at the top right allows users to connect to their Algo Wallet. At the moment, only MyAlgo Wallet is supported.

The main content shows a list of currently available Terracells (`$TRCL`) NFTs on the Algorand blockchain. This list is fetched using a Terragrids Proxy API (i.e. https://testnet.terragrids.org/api/), which is a pass-through to the separate Terragrids API instance running on AWS Lambda (https://api-dev.terragrids.org/api/), whose source code is in the `api` repo. The proxy API is part of the next.js application and it's deployed on CloudFront Lambda@Edge together with the rest of the DApp. For this reason, the Terragrids Proxy API cannot access DynamoDB directly, but it needs to rely on the separate Terragrids API.

```
[Terragrids Proxy API] -> [Terragrids API] --> [Algo Indexer + DynamoDB]
```

Terragrids API fetches the list of Terragrids from the Algo Indexer API. Note, this list is currently not paginated, i.e. only the first page is fetched.

Clicking on each element in the list, more information about the Terracell is displayed. 

When a user connects to their wallet, they see how many `ALGO` they have at the top right of the screen. They can also mint new Terracells by clicking on the button in the top menu. Note: currently, all users can mint Terracell NFTs. In the future, only admin users connected to the Terragrids Treasure Wallet (TTW) will be able to mint NFTs.

When a user is connected to their wallet and they click on a Terracell, they can see possible actions to be taken on it, based on whether they own it, it is up for sale, or it is owned by someone else.

If they own it, they can decide to sell it. In this case, they deploys a smart contract (i.e. an Algorand application) on the blockchain using their wallet. The smart contract currently transfers the NFT to the contract's wallet, and exposes an API for further action.

If the smart contract deployment is successful, an Application ID is returned to the application frontend. The frontend calls the API to store the Application ID on the off-chain DynamoDB database. 

> Note: storing on the off-chain DB from the frontend can fail and lead to system inconsistency, and it is not secure. This is fine for a first prototype, but this implementation should be replaced with backend service workers fetching this information from the blockchain.

Sellers can withdraw the Terracell from the market before it is purchased by other users. This is done by connecting to the smart contract `Market` API and call the `stop` function, which transfers back the NFT to the seller's wallet and terminates the contract.

While the Terracell is on the market, other users can connect to their wallet, click on a Terracell put up for sale, and see that it is available to purchase. The Algorand Application ID is fetched from the off-chain DynamoDB database through the API and displayed for transparency, so users can check what it does on the blockchain, if they want.

Users can purchase the Terracell connecting to the smart contract `Market` API and call the `buy` function. This function transfers the NFT to their wallet, pays the price in `ALGO` into the seller's wallet and terminates the contract.

> Note: to test the DApp on Algorand testnet, you need to get some `ALGO` into your testnet wallet using the [Algorand Dispenser](https://bank.testnet.algorand.network/).

## Reach backend
The source code for the Reach backend is located in `blockchain/index.rsh`.

The current version allows an `Admin` participant to deploy the contract on Algorand and put a non-network token (ARC3 NFT) up for sale. This is achieved transferring the token to the Algorand wallet associated with the smart-contract. A `Market` API allows admins to cancel the sale, get back the token into their wallet and terminate the contract; or other participants to buy the NFT, get the token into their wallet and terminate the contract. The NFT price is transferred to the `Admin` after a successful purchase.

Since deleting a contract involves paying a small transaction fee by the buyer, the current implementation will need to be improved by allowing buyer to only buy the NFT, and admins to delete the contract afterwards (or the contract could terminate automatically after a specific time has passed since the NFT purchase).

Make a copy of `.env.ref` in the root folder and rename it as `.env.local`.

Build it with the following command:
```bash
npm run reach-compile
```

To run the tests, you first need to install the prerequisites: `node`, `npm`, `make`, `docker` and `docker-composer`.
Setup instructions for the prerequisite are on the [Reach website](https://docs.reach.sh/quickstart/#quickstart).

Verify the installations:
```
make --version
docker --version
docker-compose --version
```

The Reach tests are in `blockchain/index.mjs`. The tests will run on a local Algorand blockchain within a docker container.

To run the tests:
```
npm run reach-run
```

## Web interface
The web interface is a Next.js application. You first need to build the Reach backend to run the web interface and test it end-to-end on Algorand testnet.

Install all npm modules:
```bash
npm run ci
```

Run it on a local development server with:
```bash
npm run dev
```
or you can build and start a production app with:
```
npm run build
npm run start
```

## Continuous integration
For every commit on the `dev` or `master` branch, the DApp is built on AWS Amplify and deployed on AWS Cloudfront Lambda@Edge functions.

`dev` builds will be accessible at `https://testnet.terragrids.org` and running on Algorand testnet, while `master` builds will be accessible at `https://app.terragrids.org` and running on Algorand mainnet. 

## Make contributions
To make contributions, check out the `dev` branch, crate a personal branch and push your commits. When you are ready, open a Pull Request on the `dev` branch.

**Dev rules**
1. If possible, please use Visual Code to write changes and make contributions to the repository. This will ensure code standard consistency.
2. Make small Pull Requests. This will ensure other developers and project maintainers can review your changes and give feedback as quickly as possible. 
3. Never make a Pull Request on `master`. The `master` branch is regularly updated with `dev` only by project maintainers. 