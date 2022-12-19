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
    reserve: string
    url: string
    offchainUrl: string
    holders: Array<Holder>
    contractId?: string
    contractInfo?: string
    assetPrice?: number
    rarity?: string
    author?: string
    sellerAddress?: string
    positionX: number
    positionY: number
}

export type Terraland = TerragridsNft
export type Terrabuild = TerragridsNft
export type Terracell = TerragridsNft & {
    power: number
}
