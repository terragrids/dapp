import React from 'react'

export type ReachStdlib = {
    stdlib: {
        bigNumberToNumber: (contract: object) => string
        algosdk: object
    }
    nftContractBackend: object
}

export const ReachContext = React.createContext({} as ReachStdlib)
