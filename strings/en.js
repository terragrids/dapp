import LocalizedStrings from 'react-localization'

const enStrings = {
    activeTerracells: 'Active terracells',
    algoSigner: 'AlgoSigner',
    assetID: 'Asset ID',
    availableToBuy: 'Available to buy',
    back: '< Back',
    buy: 'Buy',
    buyFor: 'Buy for',
    capacity: 'Capacity',
    change: 'Change',
    close: 'Close',
    comingSoon: 'Coming soon',
    connectToWalletToSeeSPP: 'You need to connect to a wallet to access the Solar Power Plant',
    connectWallet: 'Connect to a wallet',
    contract: 'Contract',
    contractId: 'Contract ID',
    createProject: 'Create new project',
    createProjectWithWallet: 'Create a new project associated with your wallet address',
    description: 'Description',
    details: 'Details',
    disconnect: 'Disconnect',
    dropImageHere: 'Drop image here',
    errorAccountNfts: 'Unable to retrieve your NFTs. Either something went wrong, or you cancelled the transaction.',
    errorBuyingNft:
        'Unable to buy this NFT. Do you have enough ALGO in your wallet, or did you cancel the transaction?',
    errorConnectingWallet:
        'Unable to connect your wallet. Either something went wrong, or you cancelled the connection.',
    errorCreatingNftSaleContract:
        'Unable to put this NFT up for sale. Either something went wrong, or you cancelled the transaction.',
    errorCreatingTerracellSaleContract:
        'Unable to put this terracell up for sale. Either something went wrong, or you cancelled the transaction.',
    errorDeletingNftSaleContract:
        'Unable to withdraw this NFT from sale. Either something went wrong, or you cancelled the transaction.',
    errorDeletingTerracellSaleContract:
        'Unable to withdraw this terracell from sale. Either something went wrong, or you cancelled the transaction.',
    errorDeployingSppContract: 'Unable to deploy the Solar Power Plant Smart Contract.',
    errorFetchingMap: 'Something went wrong when fetching the Terragrids map.\nPlease refresh the page and try again.',
    errorFetchingProjects: 'Unable to retrieve the projects. Please refresh the page and try again.',
    errorFetchingSpp: 'Unable to retrieve the Solar Power Plant. Please refresh the page and try again.',
    errorFetchingSppFromContract: 'Unable to retrieve the Solar Power Plant from the Smart Contract.',
    errorFetchingTerracell: 'Unable to retrieve this Terracell. Please refresh the page and try again.',
    errorFetchingTerraland: 'Unable to retrieve this Terraland. Please refresh the page and try again.',
    errorFileReader: 'Unable to retrieve your NFT amounts',
    errorMinting: 'Something went wrong when minting your NFT. Please try again',
    errorNoSppContract: 'Unable to find the Solar Power Plant Smart Contract.',
    errorTerminatingSppContract: 'Unable to terminate the Solar Power Plant Smart Contract.',
    errorUpdatingSppContract: 'Unable to update the Solar Power Plant Smart Contract.',
    errorUploadingFile: 'Something went wrong when uploading or pinning your NFT file. Please try again.',
    helloExplorer: 'Hello, Terragrids explorer!',
    holder: 'Holder',
    mint: 'Mint',
    mintingTerracell: 'Minting a new $TRCL token',
    mintNft: 'Mint a new NFT',
    myAlgoWallet: 'My Algo Wallet',
    myProjects: 'My Projects',
    name: 'Name',
    projectLogo: 'Project logo',
    noContractPleaseRedeploy: 'No contract id is found. Please redeploy the SPP contract.',
    noDescription: 'No description',
    nominalPower: 'Nominal power (TRW)',
    onlyAdminWalletsCanAccess: 'Only admin wallets can access this content.',
    openSppAdminPanel: 'Open SPP Admin Panel',
    orPickFromDialog: 'or click to pick from dialog',
    output: 'Output',
    peraWallet: 'Pera Wallet',
    position: 'Position',
    positionX: 'Position X',
    positionY: 'Position Y',
    power: 'Power',
    price: 'Price',
    redeployContract: 'Redeploy contract',
    refreshAndTryAgain: 'Please refresh the page and try again.',
    sell: 'Sell',
    sellFor: 'Sell for',
    siteDescription: 'Web client for Terragrids',
    siteTitle: 'Terragrids',
    solarPowerPlant: 'Solar Power Plant',
    sppAdminPanel: 'SPP Admin Panel',
    tapToPick: 'Tap to pick an image',
    terminate: 'Terminate',
    terracellInformation: 'Terracell ($TRCL)',
    terracellOnTheMarket: 'This terracell is on the market',
    terralandInformation: 'Terraland ($TRLD)',
    totalOutput: 'Total output',
    totalTerracells: 'Total terracells',
    transactionFailed: 'Your transaction failed or has been cancelled.',
    type: 'Type',
    update: 'Update',
    withdraw: 'Withdraw',
    youHaveNoNfts: 'You have no {0} in your wallet',
    yourBuildings: 'Your buildings',
    yourPlotsOfLand: 'Your plots of land',
    yourSolarPvCells: 'Your solar PV cells',
    yourWallet: 'Your wallet'
}

export const strings = new LocalizedStrings({
    en: enStrings
})
