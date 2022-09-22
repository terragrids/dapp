export class Nft {
    static readonly TRCL = new Nft('TRCL', 'Terracell')
    static readonly TRLD = new Nft('TRLD', 'Terraland')
    static readonly TRBD = new Nft('TRBD', 'Terrabuild')

    currencySymbol: string

    // private to disallow creating other instances of this type
    private constructor(public readonly symbol: string, public readonly name: string) {
        this.currencySymbol = `$${this.symbol}`
    }

    toString() {
        return `${this.name} (${this.currencySymbol})`
    }

    static list() {
        return [Nft.TRCL, Nft.TRLD, Nft.TRBD]
    }
}

export type Symbols = 'TRCL' | 'TRLD' | 'TRBD'

export type Holder = {
    address: string
    amount: number
}

export type TerraNft = {
    id: string
    name: string
    description?: string
    symbol: string
    url: string
    offchainUrl: string
    holders: Array<Holder>
    contractId?: string
    contractInfo?: string
    assetPrice?: number
    sellerAddress?: string
}

export type Terraland = TerraNft & {
    positionX: number
    positionY: number
}

export type Terracell = TerraNft & {
    power: number
}
