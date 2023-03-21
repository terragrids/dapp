export class PlaceType {
    static readonly DETACHED = new PlaceType('detached', 'Deatched House')
    static readonly SEMIDETACHED = new PlaceType('semidetached', 'Semi-detached House')
    static readonly TERRACED = new PlaceType('terraced', 'Terraced House')
    static readonly FLAT = new PlaceType('flat', 'Flat Apartment')
    static readonly COMMUNITY = new PlaceType('community', 'Community Space')
    static readonly COMMERCIAL = new PlaceType('commercial', 'Commercial Space')
    static readonly WAREHOUSE = new PlaceType('warehouse', 'Warehouse')
    static readonly RETAIL = new PlaceType('retail', 'Retail Store')
    static readonly BARN = new PlaceType('barn', 'Barn')
    static readonly FARM = new PlaceType('farm', 'Country Farm')

    // private to disallow creating other instances of this type
    private constructor(public readonly code: string, public readonly name: string) {}

    static list() {
        return [
            PlaceType.DETACHED,
            PlaceType.SEMIDETACHED,
            PlaceType.TERRACED,
            PlaceType.FLAT,
            PlaceType.COMMUNITY,
            PlaceType.COMMERCIAL,
            PlaceType.RETAIL,
            PlaceType.WAREHOUSE,
            PlaceType.BARN,
            PlaceType.FARM
        ]
    }

    static new(code: string) {
        const newPlace = this.list().find(place => place.code === code)
        return newPlace || PlaceType.DETACHED
    }
}
