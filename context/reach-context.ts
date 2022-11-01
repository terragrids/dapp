import React from 'react'

export type ReachStdlib = {
    stdlib: {
        bigNumberToNumber: (contract: object) => string
    }
}

export const ReachContext = React.createContext({} as ReachStdlib)
