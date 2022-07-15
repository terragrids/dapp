# Terragrids DApp
The DApp web interface and Reach backend.

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

You can run it on a local development server with:
```bash
npm run dev
```
or you can build and start a production app with:
```
npm run build
npm run start
```

## Continuous integration
For every commit on the `dev` or `master` branch, the dapp is built on AWS Amplify and deployed on AWS Cloudfront Lambda@Edge functions.

`dev` builds will be accessible at `https://testnet.terragrids.org` and running on Algorand testnet, while `master` builds will be accessible at `https://app.terragrids.org` and running on Algorand mainnet. 

## Make contributions
To make contributions, check out the `dev` branch, crate a personal branch and push your commits. When you are ready, open a Pull Request on the `dev` branch.

**Dev rules**
1. If possible, please use Visual Code to write changes and make contributions to the repository. This will ensure code standard consistency.
2. Make small Pull Requests. This will ensure other developers and project maintainers can review your changes and give feedback as quickly as possible. 
3. Never make a Pull Request on `master`. The `master` branch is regularly updated with `dev` only by project maintainers. 