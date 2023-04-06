import { strings } from 'strings/en.js'
import { MediaItem } from './media.js'

export type Place = {
    id: string
    created: string
    creator: string
    name: string
    offChainImageUrl: string
}

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

    private constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly flavor: string = '',
        public readonly mediaId: string = ''
    ) {
        this.name = flavor ? `${name} Type ${flavor}` : name
    }

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

    static new(code: string, key = '', mediaId = ''): PlaceType {
        const place = this.list().find(place => place.code === code) || PlaceType.DETACHED
        return new PlaceType(place.code, place.name, key, mediaId)
    }

    static newFromMediaItem(item: MediaItem): PlaceType {
        const [code, flavor] = item.key.split('|')
        return PlaceType.new(code, flavor, item.id)
    }
}

export class PlaceStatus {
    static readonly CREATED = new PlaceStatus('created', strings.waitingForApproval)
    static readonly APPROVED = new PlaceStatus('approved', strings.approved)
    static readonly REJECTED = new PlaceStatus('rejected', strings.rejected)
    static readonly EDITED = new PlaceStatus('approved-edited', strings.waitingForEditReview)
    static readonly ARCHIVED = new PlaceStatus('archived', strings.archived)

    // private to disallow creating other instances of this type
    private constructor(public readonly key: string, public readonly value: string) {}

    static list() {
        return [PlaceStatus.CREATED, PlaceStatus.APPROVED, PlaceStatus.REJECTED, PlaceStatus.ARCHIVED]
    }

    static getByKey(key: string): string {
        const status = this.list().find(status => status.key === key)
        return status ? status.value : ''
    }
}
