export class Place {
    static readonly DETACHED = new Place('detached', 'Deatched House')
    static readonly SEMIDETACHED = new Place('semidetached', 'Semi-detached House')
    static readonly TERRACED = new Place('terraced', 'Terraced House')
    static readonly FLAT = new Place('flat', 'Flat Apartment')
    static readonly COMMUNITY = new Place('community', 'Community Space')
    static readonly COMMERCIAL = new Place('commercial', 'Commercial Space')
    static readonly WAREHOUSE = new Place('warehouse', 'Warehouse')
    static readonly RETAIL = new Place('retail', 'Retail Store')
    static readonly BARN = new Place('barn', 'Barn')
    static readonly FARM = new Place('farm', 'Country Farm')

    // private to disallow creating other instances of this type
    private constructor(public readonly code: string, public readonly name: string) {}

    static list() {
        return [
            Place.DETACHED,
            Place.SEMIDETACHED,
            Place.TERRACED,
            Place.FLAT,
            Place.COMMUNITY,
            Place.COMMERCIAL,
            Place.RETAIL,
            Place.WAREHOUSE,
            Place.BARN,
            Place.FARM
        ]
    }

    static new(code: string) {
        const newPlace = this.list().find(place => place.code === code)
        return newPlace || Place.DETACHED
    }
}
