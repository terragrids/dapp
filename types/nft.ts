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
        return [Nft.TRLD, Nft.TRBD, Nft.TRCL]
    }
}

export type Holder = {
    address: string
    amount: number
}

export type TerragridsNft = {
    id: string
    name: string
    description?: string
    symbol: string
    status: string
    url: string
    offchainUrl: string
    holders: Array<Holder>
    contractId?: string
    contractInfo?: string
    assetPrice?: number
    sellerAddress?: string
}

export type Terraland = TerragridsNft & {
    positionX: number
    positionY: number
}

export type Terrabuild = Terraland

export type Terracell = TerragridsNft & {
    power: number
}
