export class Nft {
    static readonly TRCL = new Nft('TRCL', 'Terracell')
    static readonly TRLD = new Nft('TRLD', 'Terraland')
    static readonly TRAS = new Nft('TRAS', 'Terrasset')

    currencySymbol: string

    // private to disallow creating other instances of this type
    private constructor(public readonly symbol: string, public readonly name: string) {
        this.currencySymbol = `$${this.symbol}`
    }

    toString() {
        return `${this.name} (${this.currencySymbol})`
    }

    static list() {
        return [Nft.TRCL, Nft.TRLD, Nft.TRAS]
    }
}

export type Symbols = 'TRCL' | 'TRLD' | 'TRAS'

export type Holder = {
    address: string
    amount: number
}
export type Terraland = {
    id: string
    name: string
    description?: string
    symbol: string
    url: string
    offchainUrl: string
    positionX: number
    positionY: number
    holders: Array<Holder>
    contractId?: string
    contractInfo?: string
    assetPrice?: number
    sellerAddress?: string
}

export type SolarPowerPlant = {
    capacity: number
    output: number
    totalTrcl: number
    activeTrcl: number
}

export type Terracell = {
    id: string
    name: string
    symbol: Symbols
    url: string
    offchainUrl: string
    power: number
}
