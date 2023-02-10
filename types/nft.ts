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
    offChainImageUrl: string
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

export class NftStatus {
    static readonly FORSALE = new NftStatus('forsale', 'For Sale')
    static readonly SOLD = new NftStatus('sold', 'Sold')
    static readonly ARCHIVED = new NftStatus('archived', 'Archived')

    // private to disallow creating other instances of this type
    private constructor(public readonly code: string, public readonly name: string) {}

    static list() {
        return [NftStatus.FORSALE, NftStatus.SOLD, NftStatus.ARCHIVED]
    }

    static new(code: string) {
        switch (code) {
            default:
            case 'forsale':
                return NftStatus.FORSALE
            case 'sold':
                return NftStatus.SOLD
            case 'archived':
                return NftStatus.ARCHIVED
        }
    }
}
