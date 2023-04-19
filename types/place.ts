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
    static readonly TRADITIONAL_HOUSE = new PlaceType('traditional-house', strings.traditionalHouse)
    static readonly MODERN_HOUSE = new PlaceType('modern-house', strings.modernHouse)
    static readonly MODERN_APARTMENT = new PlaceType('modern-apartment', strings.modernApartment)

    private constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly rank: number = 1,
        public readonly mediaId: string = ''
    ) {}

    static list() {
        return [PlaceType.TRADITIONAL_HOUSE, PlaceType.MODERN_HOUSE, PlaceType.MODERN_APARTMENT]
    }

    static new(code: string, rank = 1, mediaId = ''): PlaceType {
        const place = this.list().find(place => place.code === code) || PlaceType.TRADITIONAL_HOUSE
        return new PlaceType(place.code, place.name, rank, mediaId)
    }

    static sort(places: Array<PlaceType>): Array<PlaceType> {
        return this.list()
            .map(place => places.find(p => place.code === p.code))
            .filter(p => p !== undefined) as Array<PlaceType>
    }

    static newFromMediaItem(item: MediaItem): PlaceType {
        return PlaceType.new(item.key, item.rank, item.id)
    }

    static newPlaceTypesFromMediaItems(items: Array<MediaItem>): Array<PlaceType> {
        const types = items.map((item: MediaItem) => PlaceType.newFromMediaItem(item))
        return PlaceType.sort(types) as Array<PlaceType>
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
