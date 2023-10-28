import LocalizedStrings from 'react-localization'

const enStrings = {
    absoluteMeterReadings: 'Absolute meter readings',
    account: 'Account',
    activeTerracells: 'Active terracells',
    addManualReading: 'Add manual reading',
    addTracker: 'Add tracker',
    algoSigner: 'AlgoSigner',
    allPlaces: 'All Places',
    approvalStatus: 'Approval status',
    approve: 'Approve',
    approved: 'Approved',
    archive: 'Archive',
    archived: 'Archived',
    assetID: 'Asset ID',
    assets: 'Assets',
    author: 'Author',
    availableToBuy: 'Available to buy',
    back: 'Back',
    backToPlaceTrackers: 'Back to place trackers',
    basePrice: 'Base Price ($ALGO)',
    buy: 'Buy',
    buyFor: 'Buy for',
    cancel: 'Cancel',
    capacity: 'Capacity',
    change: 'Change',
    close: 'Close',
    comingSoon: 'Coming soon',
    common: 'Common',
    connectAccount: 'Connect account',
    connectedToUtilityApi: 'connected to utility API',
    connectToUtilityApi: 'Connect to Utility API',
    connectToWalletToSeeSPP: 'You need to connect to a wallet to access the Solar Power Plant',
    connectWallet: 'Connect to a wallet',
    consumption: 'Consumption',
    consumptionCycle: 'Consumption cycle',
    consumptionReadings: 'Consumption readings',
    contract: 'Contract',
    contractId: 'Contract ID',
    create: 'Create',
    created: 'Created',
    createNewPlaceAtNode: 'You are creating a new Terragrids Place at node ({0},{1}) in the map.',
    createPlace: 'Create new place',
    daily: 'Daily',
    delete: 'Delete',
    describeYourPlace: 'Describe your place in a few words',
    description: 'Description',
    details: 'Details',
    disconnect: 'Disconnect',
    disconnectAccount: 'Disconnect account',
    dropImageHere: 'Drop image here',
    edit: 'Edit',
    editConnectionToUtilityApi: 'Edit connection to utility API',
    edited: 'Edited',
    electricityMeter: 'Electricity meter',
    endDate: 'End date',
    energyUsage: 'Energy usage',
    errorAccountNfts: 'Unable to retrieve your NFTs. Either something went wrong, or you cancelled the transaction.',
    errorApprovingPlace: 'Something went wrong when approving this place. Please try again.',
    errorArchivingPlace: 'Something went wrong when archiving this place. Please try again.',
    errorBuyingNft:
        'Unable to buy this NFT. Do you have enough ALGO in your wallet, or did you cancel the transaction?',
    errorConnectingWallet:
        'Unable to connect your wallet. Either something went wrong, or you cancelled the connection.',
    errorCreatingNftSaleContract:
        'Unable to put this NFT up for sale. Either something went wrong, or you cancelled the transaction.',
    errorCreatingPlace: 'Something went wrong when creating your place. Please try again.',
    errorCreatingTerracellSaleContract:
        'Unable to put this terracell up for sale. Either something went wrong, or you cancelled the transaction.',
    errorCreatingTracker: 'Something went wrong when creating your tracker. Please try again.',
    errorDeletingNftSaleContract:
        'Unable to withdraw this NFT from sale. Either something went wrong, or you cancelled the transaction.',
    errorDeletingReading: 'Unable to delete the reading. Please try again.',
    errorDeletingTerracellSaleContract:
        'Unable to withdraw this terracell from sale. Either something went wrong, or you cancelled the transaction.',
    errorDeployingSppContract: 'Unable to deploy the Solar Power Plant Smart Contract.',
    errorFetchingConsumptions: 'Unable to retrieve consumption data. Please try again.',
    errorFetchingMap: 'Something went wrong when fetching the Terragrids map.\nPlease refresh the page and try again.',
    errorFetchingNft: 'Unable to retrieve the NFT. Please refresh the page and try again.',
    errorFetchingNfts: 'Unable to retrieve the NFTs. Please refresh the page and try again.',
    errorFetchingPlace: 'Unable to retrieve this place. Please refresh the page and try again.',
    errorFetchingPlaces: 'Unable to retrieve the places. Please refresh the page and try again.',
    errorFetchingReadings: 'Unable to retrieve the readings. Please refresh the page and try again.',
    errorFetchingSpp: 'Unable to retrieve the Solar Power Plant. Please refresh the page and try again.',
    errorFetchingSppFromContract: 'Unable to retrieve the Solar Power Plant from the Smart Contract.',
    errorFetchingTerracell: 'Unable to retrieve this Terracell. Please refresh the page and try again.',
    errorFetchingTerraland: 'Unable to retrieve this Terraland. Please refresh the page and try again.',
    errorFetchingTracker: 'Unable to retrieve this tracker. Please refresh the page and try again.',
    errorFetchingTrackers: 'Unable to retrieve the trackers. Please refresh the page and try again.',
    errorFetchingUtilityMeters:
        'Unable to retrieve utility meters. Please check that your account details are correct and try again.',
    errorFileReader: 'Unable to retrieve your NFT amounts',
    errorImportingConsumptions: 'Something went wrong when importing your energy consumption. Please try again.',
    errorMinting: 'Something went wrong when minting your NFT. Please try again',
    errorNoSppContract: 'Unable to find the Solar Power Plant Smart Contract.',
    errorSubmittingReading: 'Something went wrong when submitting your reading. Please try again.',
    errorTerminatingSppContract: 'Unable to terminate the Solar Power Plant Smart Contract.',
    errorUpdatingPlace: 'Something went wrong when updating your place. Please try again.',
    errorUpdatingSppContract: 'Unable to update the Solar Power Plant Smart Contract.',
    errorUpdatingTracker: 'Something went wrong when updating your tracker. Please try again.',
    errorUploadingFile: 'Something went wrong when uploading or pinning your NFT file. Please try again.',
    failedArchivingPlace: 'Failed archiving this place',
    failedDeletingContract: 'Failed deleting the contract',
    failedDeletingPlace: 'Failed deleting this place',
    gasMeter: 'Gas meter',
    giveMemorablePlaceName: 'Give your place a memorable name',
    giveMemorableTrackerName: 'Give your tracker a nickname',
    helloExplorer: 'Hello, Terragrids explorer!',
    holder: 'Holder',
    howToSeePlaceOnMap: 'How your place will show on the map',
    importConsumption: 'Import consumption',
    imported: 'Imported',
    lastSalePrice: 'Last sale price',
    learnMore: 'Learn more',
    legendary: 'Legendary',
    login: 'Login',
    logout: 'Logout',
    mapPosition: 'Position on map',
    meterReading: 'Meter reading',
    mint: 'Mint',
    mintingTerracell: 'Minting a new $TRCL token',
    mintNft: 'Mint a new NFT',
    modernApartment: 'Modern Apartment',
    modernHouse: 'Modern House',
    monthly: 'Monthly',
    myAlgoWallet: 'My Algo Wallet',
    myPlaces: 'My Places',
    name: 'Name',
    noConsumptionsFound: 'No consumption data found.',
    noContractPleaseRedeploy: 'No contract id is found. Please redeploy the SPP contract.',
    noDescription: 'No description',
    nominalPower: 'Nominal power (TRW)',
    noNftsFoundForSearch: 'No NFTs found for this search criteria',
    noPlacesFound: 'No places found here.',
    noReadingsFound: 'No readings found here.',
    noTrackersFound: 'No trackers found here.',
    onlyAdminWalletsCanAccess: 'Only admin wallets can access this content.',
    openSppAdminPanel: 'Open SPP Admin Panel',
    orPickFromDialog: 'or click to pick from dialog',
    output: 'Output',
    peraWallet: 'Pera Wallet',
    pickMapPosition: 'To continue, pick a position for your NFT on the map. You will confirm your contribution later.',
    placeArchived: 'Place archived',
    placeDeleted: 'Place deleted',
    positionX: 'Position X',
    positionY: 'Position Y',
    power: 'Power',
    price: 'Price',
    rare: 'Rare',
    rarity: 'Rarity',
    reading: 'Reading ({0})',
    readingCycle: 'Reading cycle',
    redeployContract: 'Redeploy contract',
    refreshAndTryAgain: 'Please refresh the page and try again.',
    reject: 'Reject',
    rejected: 'Rejected',
    saleContractId: 'Sale contract ID',
    selectMeter: 'Select one of the available meters',
    sell: 'Sell',
    sellFor: 'Sell for',
    showMore: 'Show more',
    siteDescription: 'Web client for Terragrids',
    siteTitle: 'Terragrids',
    solarPowerPlant: 'Solar Power Plant',
    sppAdminPanel: 'SPP Admin Panel',
    startDate: 'Start date',
    status: 'Status',
    submit: 'Submit',
    tapToPick: 'Tap to pick an image',
    terminate: 'Terminate',
    terracellInformation: 'Terracell ($TRCL)',
    terracellOnTheMarket: 'This terracell is on the market',
    terralandInformation: 'Terraland ($TRLD)',
    totalOutput: 'Total output',
    totalTerracells: 'Total terracells',
    trackers: 'Trackers',
    traditionalHouse: 'Traditional House',
    transactionFailed: 'Your transaction failed or has been cancelled.',
    transactionId: 'Transaction ID',
    type: 'Type',
    underReview: 'Under review',
    update: 'Update',
    updateAccount: 'Update account',
    updateMeter: 'Update meter',
    utilityAccount: 'Utility account',
    utilityApiKey: 'Utility API key',
    viewConsumption: 'View consumption',
    viewDetails: 'View details',
    viewReadings: 'View readings',
    viewTrackerDetails: 'View tracker details',
    viewTrackerReadings: 'View tracker readings',
    viewTrackers: 'View trackers',
    waitingForApproval: 'Waiting for approval',
    waitingForEditReview: 'Waiting for edit review',
    weekly: 'Weekly',
    whatTypeOfPlace: 'What type of place is it?',
    whatTypeOfTracker: 'What type of tracker is it?',
    withdraw: 'Withdraw',
    youCanOnlyConnectToOctopusEnergy: 'You can only connect to Octopus Energy accounts at the moment.',
    youHaveNoNfts: 'You have no {0} in your wallet',
    yourAccount: 'Your account',
    yourBuildings: 'Your buildings',
    yourPlotsOfLand: 'Your plots of land',
    yourSolarPvCells: 'Your solar PV cells',
    yourWallet: 'Your wallet'
}

export const strings = new LocalizedStrings({
    en: enStrings
})
