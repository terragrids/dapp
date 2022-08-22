import LocalizedStrings from 'react-localization'

const enStrings = {
    siteTitle: 'Terragrids',
    siteDescription: 'Web client for Terragrids',
    helloExplorer: 'Hello, Terragrids explorer!',
    connectWallet: 'Connect to a wallet',
    myAlgoWallet: 'My Algo Wallet',
    peraWallet: 'Pera Wallet',
    algoSigner: 'AlgoSigner',
    errorConnectingWallet:
        'Unable to connect your wallet. Either something went wrong, or you cancelled the connection.',
    comingSoon: 'Coming soon',
    mint: 'Mint',
    mintNft: 'Mint a new NFT',
    mintingTerracell: 'Minting a new $TRCL token',
    solarPowerPlant: 'Solar Power Plant',
    sell: 'Sell',
    sellFor: 'Sell for',
    withdraw: 'Withdraw',
    buy: 'Buy',
    buyFor: 'Buy for',
    change: 'Change',
    close: 'Close',
    terralandInformation: 'Terraland ($TRLD)',
    terracellInformation: 'Terracell ($TRCL)',
    terracellOnTheMarket: 'This terracell is on the market',
    contractId: 'Contract ID',
    transactionFailed: 'Your transaction failed or has been cancelled.',
    errorCreatingTerracellSaleContract:
        'Unable to put this terracell up for sale. Either something went wrong, or you cancelled the transaction.',
    errorCreatingNftSaleContract:
        'Unable to put this NFT up for sale. Either something went wrong, or you cancelled the transaction.',
    errorDeletingTerracellSaleContract:
        'Unable to withdraw this terracell from sale. Either something went wrong, or you cancelled the transaction.',
    errorDeletingNftSaleContract:
        'Unable to withdraw this NFT from sale. Either something went wrong, or you cancelled the transaction.',
    errorBuyingNft:
        'Unable to buy this NFT. Do you have enough ALGO in your wallet, or did you cancel the transaction?',
    errorAccountNfts: 'Unable to retrieve your NFTs. Either something went wrong, or you cancelled the transaction.',
    yourWallet: 'Your wallet',
    disconnect: 'Disconnect',
    dropImageHere: 'Drop image here',
    orPickFromDialog: 'or click to pick from dialog',
    tapToPick: 'Tap to pick an image',
    errorFileReader: 'Unable to retrieve your NFT amounts',
    type: 'Type',
    name: 'Name',
    description: 'Description',
    nominalPower: 'Nominal power (TRW)',
    power: 'Power',
    holder: 'Holder',
    totalOutput: 'Total output',
    yourSolarPvCells: 'Your solar PV cells',
    yourPlotsOfLand: 'Your plots of land',
    yourBuildings: 'Your buildings',
    output: 'Output',
    errorUploadingFile: 'Something went wrong when uploading or pinning your NFT file. Please try again.',
    errorMinting: 'Something went wrong when minting your NFT. Please try again',
    errorFetchingTerraland: 'Unable to retrieve this Terraland. Please refresh the page and try again.',
    errorFetchingTerracell: 'Unable to retrieve this Terracell. Please refresh the page and try again.',
    errorFechingSpp: 'Unable to retrieve the Solar Power Plant. Please refresh the page and try again.',
    positionX: 'Position X',
    positionY: 'Position Y',
    availableToBuy: 'Available to buy',
    capacity: 'Capacity',
    back: '< Back',
    assetID: 'Asset ID',
    price: 'Price',
    position: 'Position',
    contract: 'Contract',
    youHaveNoNfts: 'You have no {0} in your wallet',
    noDescription: 'No description',
    connectToWalletToSeeSPP: 'You need to connect to a wallet to access the Solar Power Plant'
}

export const strings = new LocalizedStrings({
    en: enStrings
})
