import React from 'react'

export type ReachStdlib = {
    stdlib: {
        bigNumberToNumber: (contract: object) => string
        parseCurrency: (amount: number) => number
        formatCurrency: (amount: number, precision: number) => number
        algosdk: object
    }
    nftContractBackend: object
}

export const ReachContext = React.createContext({} as ReachStdlib)
