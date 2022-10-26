# Terragrids DApp

The DApp web interface and Reach backend.

## Functionality

The Terragrids DApp is still a prototype. When running it on a developer's machine, or accessing it at https://testnet.terragrids.org, it shows an isometric map, representing the Terragrids metaverse. Currently, all images in the frontend and NFTs are test images and will be replaced.

<img width="1772" alt="image" src="https://user-images.githubusercontent.com/2437709/185810976-f7c6e715-bad7-44a0-9506-811f40fb4292.png">

### User menu

A button at the top right allows users to connect to their Algo Wallet. At the moment, only MyAlgo Wallet is supported.

Once connected, users can see their ALGO balance in their wallet at the top right. If they click on it, they will see a user menu, showing a list of Terragrids NFTs: Terracells (`$TRCL`), Terralands (`$TRLD`), Terrabuilds (`$TRBD`).

https://user-images.githubusercontent.com/2437709/185812001-a75a3fab-1d61-48f9-be60-c45806abf6e6.mov

If they click on one of them, they will see a list of currently owned NFTs in their Algo wallet.
The list of Terragrids NFTs is fetched from the AlgoIndexer API through the Terragrids proxy API.

Note, this list is currently not paginated, i.e. only the first page is fetched. Pagination is still to be implemented.

https://user-images.githubusercontent.com/2437709/185812064-826ceec2-26c8-4132-b42f-2d1290930a93.mov

### NFT Minting

From the user menu, any connected users can mint new Terragrids NFTs. This is temporary on Testnet, as only an administrator's wallet will be able to mint.

If users click on the Mint option, they will see an NFT Mint dialog. From there, they can select an image, enter the type of NFT, its name and description, and more information based on its type, e.g. nominal power in TerraWatts (TRW) for Terracells, or map position for Terralands.

When users submit an NFT for minting, first the image and the NFT metadata is uploaded and pinned to Pinata IPFS. A new ARC3 Algorand Standard Asset is minted and the IPFS URL of the NFT metadata is used as the ARC3 ASA URL.

https://user-images.githubusercontent.com/2437709/185980778-f26c1e81-489e-4cf7-ae95-5f15e0284f81.mov

Once minted, the NFT is on AlgoExplorer and Pinata IPFS.

https://user-images.githubusercontent.com/2437709/185982775-f1177418-29fc-4fe2-bfc5-7d18027aac36.mov

An offchain NoSQL DB is also updated with some frontend information of the minted NFT. This is mainly for improving the user experience when fetching and displaying the NFTs, but the real source of data is distributed and sits on Algorand and IPFS.

If a new Terraland is minted, it will appear on the Terragrids map in the specified position. If a new Terracell NFT is minted, it will appear in the Solar Power Plant dialog. If a Terrabuild NFT is minted, it will appear in the build options dialog of a Terraland owned by a user (this particular feature is still to be implemented).

### Terragrids Map

Users can explore the Terragrids metaverse browsing an isometric map. The map is split into squared plot of lands, each identified by their position coordinates (X,Y). If a Terraland is minted in a particular position, its image will be displayed on the plot.
Users can click on one Terraland to see more information about it. The plot in position (0,0) is a special one, and it is allocated to the Solar Power Plant.

https://user-images.githubusercontent.com/2437709/185983403-7da5da21-117a-4f02-8300-c54e63654e84.mov

### Selling Terralands (`$TRLD`)

When users click on the Terraland, a dialog opens with information about the NFT. Users can click on the Asset ID to see the asset on AlgoExplorer (still to be implemented).

If a user's wallet owns the Terraland NFT (which is always the case for administrators that have just minted a Terraland), they can put it up for sale for specified price in ALGO (at the moment, the price is fixed at 10 `$ALGO`).
Selling a Terraland will deploy a new Algorand contract implemented with Reach. The NFT is transferred from the seller's account to the contract account and the contract will listen to API calls, using a Reach `paralellReduce`.

https://user-images.githubusercontent.com/2437709/185984943-85dbf9f7-16a8-41a3-a0c2-df2d06399f87.mov

The new contract can be seen on AlgoExplorer.

<img width="1270" alt="image" src="https://user-images.githubusercontent.com/2437709/185985515-bec5b6b5-e5cb-42d0-95c9-8f34e97e7094.png">

### Buying Terralands (`$TRLD`)

If a user's wallet does not own a Terraland NFT and it is currently up for sale, users will see their price, their trading contract ID (i.e. the Algorand Application ID), and a button to buy it for the specified price.
Buying a Terraland will connect the user's wallet account to the trading Algorand contract for that NFT. The NFT is transferred from the contract account to the buyer's wallet account, and the price in ALGO is paid from the buyer's account to the Terragrids Treasury crowdfunding account. The contract will keep tracking the NFT, listening to further API calls.

https://user-images.githubusercontent.com/2437709/185997014-dd1061e5-f03e-4f8b-be1c-890685a4c9d8.mov

After purchasing a Terraland, the NFT is owned by the new wallet on AlgoExplorer.

https://user-images.githubusercontent.com/2437709/185997756-b2191589-1774-428f-a108-1822b75ac651.mov

### Withdrawing Terralands (`$TRLD`)

If a Terraland is up for sale, or sold but still tracked by its deployed smart contract, sellers can decide to withdraw it by calling a Reach API. If the Terraland is up for sale, it will be withdrawn from the market, but still visible in the map; if the Terraland is already sold, the seller stops the tracking contract, effectively allowing the new owner to sell the NFT themselves using a new trading contract.

https://user-images.githubusercontent.com/2437709/185994898-a05a0be3-cc15-4379-977e-290705f9c2bd.mov

After withdrawing, AlgoExplorer shows the contract as deleted.

<img width="1253" alt="image" src="https://user-images.githubusercontent.com/2437709/185995110-283f8391-b260-4f0d-8a05-ce8b8aa3b361.png">

### Solar Power Plant

When administrators (at the moment any user) mint a new Terracell (`$TRCL`), it will be displayed in the Terragrids Solar Power Plant (SPP). The SPP dialog can be opened from the map clicking on the plot of land at position (0,0).
The Solar Power Plant has a Capacity and an Output.

-   The Capacity is determined by the total nominal output in TerraWatts (TRW) of all the Terracells that are currently up for sale
-   The Output is determined by the total nominal output in TerraWatts (TRW) of all the Terracells that are currently owned by users that are not administrators, i.e. all the Terracells that have been purchased at least once by regular Terragrids users that are contributing to crowdfunding.

https://user-images.githubusercontent.com/2437709/186000858-ad75a06c-1a7c-453a-a651-e5d1d7ac7610.mov

If the SPP Output reaches its Capacity, it means that administrators need to mint more Terracell NFTs to increase its Capacity.

The SPP Output can be increased only by users that purchase Terracells, i.e. users that are contributing to crowdfunding.

The SPP Output is an essential aspect of the metaverse. Users can buy and build Terrabuild NFTs on their Terraland only if the SPP is generating enough power to cover the current total demand. Since each Terrabuild consumes a specific amount of TerraWatts (TRW), users might need to buy more Terracells and increase the SPP Output, before they can buy and build new Terrabuilds on their Terralands.

### Solar Power Plant Smart Contract

The SPP has its own Algorand smart contract deployed on Algorand to keep track of the SPP Capacity and Output.

<img width="1243" alt="image" src="https://user-images.githubusercontent.com/2437709/186001241-2ae037e2-f1e0-4baf-a278-d9a89e858f70.png">

Since the SPP Capacity is increased by a Terracell nominal power when the Terracell is put on the market, and the SPP Output is increased by a Terracell nominal power when the Terracell is purchased by a user, each Terracell trading contract makes remote calls to the SPP contract to update Capacity and Output with transactional and atomic operations, i.e. only if selling and purchasing are successful the SPP is updated on the Algorand consensus network.

Having the SPP properties in a smart contract makes the DApp also more distributed.

The SPP Capacity and Output properties are fetched using a Reach `View`. This allows the frontend to track this information without the users having to execute transactions and pay network fees.

<img width="1037" alt="image" src="https://user-images.githubusercontent.com/2437709/186011018-77693a1b-28c4-4576-aeab-dc2d42247cdb.png">

### Selling Terracells (`$TRCL`)

When users click on a Terracell, a dialog opens with information about the NFT. Users can click on the Asset ID to see the asset on AlgoExplorer (still to be implemented).

If a user's wallet owns the Terracell NFT (which is always the case for administrators that have just minted a Terracell), they can put it up for sale for specified price in ALGO (at the moment, the price is fixed at 10 `$ALGO`).
Selling a Terracell will deploy a new Algorand smart contract implemented with Reach.
Transactionally:

-   The NFT is transferred from the seller's account to the contract account
-   The SPP smart contract is called to increase the SPP Capacity by the Terracell nominal power.

The contract will listen to API calls, using a Reach `parallelReduce`.

https://user-images.githubusercontent.com/2437709/186003356-a70d34e2-c54f-421e-84bb-871f37f7d3cb.mov

### Buying Terracells (`$TRCL`)

If a user's wallet does not own a Terracell NFT and it is currently up for sale, users will see their price, their trading contract ID (i.e. the Algorand Application ID), and a button to buy it for the specified price.
Buying a Terracell will connect the user's wallet account to the trading Algorand contract for that NFT. Transactionally:

-   The NFT is transferred from the contract account to the buyer's wallet account.
-   The price in ALGO is paid from the buyer's account to the Terragrids Treasury crowdfunding account.
-   The SPP smart contract is called to increase the SPP Output by the Terracell nominal power.

The trading contract will keep tracking the NFT, listening to further API calls.

https://user-images.githubusercontent.com/2437709/186005539-9a27c521-75e4-43c3-973e-547fec271eb5.mov

### Withdrawing Terracells (`$TRCL`)

If a Terracell is up for sale, or sold but still tracked by its deployed smart contract, sellers can decide to withdraw it by calling a Reach API. If the Terracell is up for sale, it will be withdrawn from the market, but still visible in the SPP; if the Terracell is already sold, the seller stops the tracking contract, effectively allowing the new owner to sell the NFT themselves using a new trading contract.
If the Terracell has not been sold yet, the trading contract will also call the SPP smart contract to decrease the SPP Capacity by the Terracell nominal power (still to be implemented).

## Algorand Greenhouse Hack #1

This is the list of new features that have been implemented during the Algorand Greenhouse Hack #1:

**Backend**

1. NFT Minting on Algorand using Reach
2. NFT image uploading and metadata and image pinning on Pinata IPFS
3. Reach Solar Power Plant Smart Contract to update and keep track of the SPP properties
4. Reach Token Market Contract, started before the hackathon with a simple sell/purchase logic and extended during the hackathon to include 1/ NFT tracking after purchase and 2/ remote calls to the SPP smart contract to update SPP properties
5. Storing Algorand Smart Contract ID offchain to attach from user accounts
6. Node.js Proxy API to support most new features above

**User Interface**

1. The isometric map with user interactions
2. The user menu with the list of NFTs belonging to the user's wallet
3. The user dialogs to show the NFT details
4. The NFT Minter dialog
5. The Solar Power Plant dialog

## Algorand Greenhouse Hack #2

This is the list of new features that have been implemented during the Algorand Greenhouse Hack #2:

**Backend**

1. Project Smart Contract developed in Reach to store creators' project details ([GitHub repo](https://github.com/terragrids/project-contract))
2. Node.js API to deploy and connect to the Project Smart Contracts and use their API to update project details.
3. Stateless authentication system - inspired by [ARC-0014](https://github.com/algorandfoundation/ARCs/pull/84) draft - to authenticate users when they want to modify the application state, e.g. create a new project or edit and existing project on the blockchain, sell or buy NFTs to back creators' projects. See current implementation details [here](#stateless-authentication).

**Frontend**

1. User interface to create and edit a project. Project details are stored on Pinata IPFS distributed system and IPFS URLs and metadata hashes are stored on the Project Smart Contract. When project details are updated, a new file is created on IPFS with the new data, and URL and metadata hash are updated on the Project Smart Contract through its API.
2. User interface to see the list of available projects for a specified user and the details of individual projects.
3. Stateless authentication support to authenticate users when they want to modify the application state, e.g. create a new project or edit and existing project on the blockchain, sell or buy NFTs to back creators' projects.

## DApp architecture

<img width="1037" alt="image" src="https://user-images.githubusercontent.com/2437709/186011263-7f2b0b70-872f-4f2e-bab6-e8dcb571261e.png">

## Proxy API

Lists on NFTs are fetched using a Terragrids Proxy API (i.e. https://testnet.terragrids.org/api/), which is a pass-through to the separate Terragrids API instance running on AWS Lambda (https://api-dev.terragrids.org/api/), whose source code is in the `api` repo. The proxy API is part of the next.js application and it's deployed on CloudFront Lambda@Edge together with the rest of the DApp. For this reason, the Terragrids Proxy API cannot access DynamoDB directly, but it needs to rely on the separate Terragrids API.

```
[Terragrids Proxy API] -> [Terragrids API] --> [Algo Indexer + DynamoDB]
```

## Stateless Authentication

A stateless authentication protocol is used to authenticate users using their public wallet address, i.e. the public key `PKa` of their Algorand account.

This first implementation loosely follows the [ARC-0014](https://github.com/algorandfoundation/ARCs/pull/84) proposed authentication standard, although the protocol is currently only implemented by Terragrids frontend and backend, without the changes proposed for Algorand wallets, which will increase the security bar by better preventing man-in-the-middle attacks.

At high-level:

1. Client initiates verification by sending their wallet address a `Verifier` backend, i.e. the system that needs to verify the identity of a User
2. The `Verifier` generates an authentication (AUTH) payload and sends it to the client
3. Client signs AUTH payload and sends back the signature to the `Verifier`
4. The `Verifier` verifies signature against the AUTH payload and the public key

The current version of the Terragrids implementation more in detail:

1. `User` connects to their wallet.
1. `Wallet` returns the connected `PKa`.
1. `Frontend` connects to `Verifier` with `PKa`. This is done sending a `GET /auth?wallet=<PKa>` HTTP request to the `Verifier`.
1. `Verifier` generates a unique message to be signed. The message changes for each authentication request to avoid replay attacks. See [authentication message](#authentication-message)
1. `Verifier` stores the message indexed by `PKa` on DynamoDB to check it at verification time
1. `Verifier` returns the message to `Frontend`
1. `Frontend` creates a 0-fee transaction with the message returned by the `Verifier` and sends the transaction to `Wallet` for signing
1. `User` approves on their wallet when prompted
1. `Frontend` sends the base-64-signed transaction and the account `PKa` to `Verifier` in the `Authorization` header of the HTTP request that needs user authentication. The authentication scheme currently used is `Bearer` for simplicity, although this is specific to IETF RFC-6750 for OAuth 2.0-protected resources. See [signed authentication request](#signed-authentication-request).
1. `Verifier` verifies the message checking the message stored on DynamoDB for the specified `PKa`.
1. If the authentication is successful, the `Verifier` deletes the message stored on DynamoDB for the specified `PKa`.
1. `Verifier` returns authentication response.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Wallet
    participant Verifier
    User-->>Frontend: Connect to Wallet
    Frontend->>Wallet: Connect to Wallet
    Wallet->>Frontend: Return PKa
    Frontend->>Frontend: Check PKa has not been rekeyed
    Frontend->>Verifier: GET /auth?wallet=<PKa>
    Verifier->>Verifier: Create a new msg for PKa with nonce
    Verifier->>Verifier: Store msg for later verification
    Verifier->>Frontend: msg
    Frontend->>Wallet: Sign 0 fee Txn with msg
    User-->>Wallet: Confirm signature
    Wallet->>Frontend: Return signed Txn
    Frontend->>Verifier: POST /auth <PKa, Sig(msg)>
    Verifier->>Verifier: Verify Sig(msg) with PKa and msg
    Verifier->>Frontend: Return authentication response
```

### Authentication Message

The `Verifier` backend asks Users to sign an Authentication Message with their secret keys. The Authentication Message has a JSON format that follows the following interface:

```js
interface AuthMessage {
    /** The domain name of the service */
    service: string;
    /** Optional, description of the service */
    desc?: string;
    /** Algorand account to authenticate with */
    authAcc: string;
    /** Challenge generated server-side */
    nonce: string;
}
```

For example:

```json
{
    "service": "api.terragrids.com",
    "desc": "Terragrids systems",
    "authAcc": "KTGP47G64KCXWJS64W7SGJNKTHE37TYDCI64USXI3XOYE6ZSH4LCI7NIDA",
    "nonce": "1234abcde!%"
}
```

The `nonce` field is unique for each authentication and is not used more than once to avoid replay attacks. It also includes an expiry date to limit the time for which it can be used.

### Transaction Authentication Message

A Transaction Authentication Message is an Authentication Message represented as an Algorand Transaction object. Such a transaction has the following characteristics:

-   it is an Algorand Payment Transaction;
-   it includes an Authentication Message into the transaction's note field;
-   it is invalidated i.e. not executable on any official Algorand network

The fields of a Payment Transaction object which represents a Transaction Authentication Message are as follows:

```
amount = 0;
sender = *PKa*;
receiver = *PKa*;
firstValid/lastValid = 1;
fee = 0;
genesisId = “arc14-arc”;
genesisHash = SHA-512/256 of the string “arc14-auth”;
note = “arc14”+msgpacked_auth_message;
```

For example:

```json
{
    "txn": {
        "amt": 0,
        "fee": 0,
        "fv": 1,
        "gen": "arc14-auth",
        "gh": "f20b122eb226626b5c0d36cd33edcdb94613820f048baf2a1d6dfe46e5be18d1",
        "lv": 1,
        "rcv": "EW64GC6F24M7NDSC5R3ES4YUVE3ZXXNMARJHDCCCLIHZU6TBEOC7XRSBG4",
        "snd": "EW64GC6F24M7NDSC5R3ES4YUVE3ZXXNMARJHDCCCLIHZU6TBEOC7XRSBG4",
        "type": "pay",
        "note": "arc14<msgpacked_auth_message>"
    }
}
```

### Signed Authentication Request

Once a user has signed the Authentication Transaction with their wallet, the `Frontend` makes a request to the protected API resource including the Base-64-signed transaction and the account `PKa` in the `Authorization` header of the HTTP request that needs user authentication. The authentication scheme currently used is `Bearer` for simplicity, although this is specific to IETF RFC-6750 for OAuth 2.0-protected resources. Later implementation will likely post the authentication request to an authentication endpoint to retrieve a JWT session token to use with a `Bearer` `Authorization` header.

The JSON object that is Base-64 encoded and sent with the `Authorization` header has the following interface schema:

```js
interface Identity {
    /** Algorand account to authenticate with, i.e. the PKa address of the account */
    account: string;
    /** The signed authentication transaction */
    authentication: string;
}
```

## Reach backend

The source code for the Reach backend is located under `blockchain/token-market` and .

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

For every commit or PR opened on the `dev` or `master` branch, the DApp is built and tested using a [GitHub actions workflow](https://github.com/terragrids/dapp/actions). The build steps are defined under `.github/workflows/ci.yml`.

For every commit on the `dev` or `master` branch, the DApp is built on AWS Amplify and deployed on AWS Cloudfront Lambda@Edge functions. The build steps are defined in `amplify.yml`.

`dev` builds will be accessible at `https://testnet.terragrids.org` and running on Algorand testnet, while `master` builds will be accessible at `https://app.terragrids.org` and running on Algorand mainnet.

## Test the DApp

To test the [Terragrids on Testnet](https://testnet.terragrids.org), you need to get some `ALGO` into your testnet wallet using the [Algorand Dispenser](https://bank.testnet.algorand.network/).

## Make contributions

To make contributions, check out the `dev` branch, crate a personal branch and push your commits. When you are ready, open a Pull Request on the `dev` branch.

**Dev rules**

1. Please use Visual Code with `Prettier` extension installed to write changes and make contributions to the repository. This will ensure code standard consistency.
2. Make small Pull Requests. This will ensure other developers and project maintainers can review your changes and give feedback as quickly as possible.
3. Never make a Pull Request on `master`. The `master` branch is regularly updated with `dev` only by project maintainers.
