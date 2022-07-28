export class Nft {
    static readonly TRCL = new Nft('TRCL', 'Terracell')
    static readonly TRLD = new Nft('TRLD', 'Terraland')
    static readonly TRAS = new Nft('TRAS', 'Terrasset')

    // private to disallow creating other instances of this type
    private constructor(private readonly symbol: string, public readonly name: string) { }

    toString() {
        return `${this.name} [${this.symbol}]`
    }

    toCurrencySymbol() {
        return `$${this.symbol}`
    }

    static currencyList() {
        return [
            Nft.TRCL.toCurrencySymbol(),
            Nft.TRLD.toCurrencySymbol(),
            Nft.TRAS.toCurrencySymbol()
        ]
    }
}
