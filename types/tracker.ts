import { strings } from 'strings/en.js'
import { MediaItem } from './media.js'
import { ElectricityMeter, GasMeter } from './utility-meter.js'

export type Tracker = {
    id: string
    userId: string
    type: TrackerType
    name: string
    status: string
    offChainImageUrl: string
    created: number
    utilityAccountId?: string
    electricityMeter?: ElectricityMeter
    gasMeter?: GasMeter
}

export class TrackerType {
    static readonly ELECTRICITY_METER = new TrackerType('electricity-meter', strings.electricityMeter)
    static readonly GAS_METER = new TrackerType('gas-meter', strings.gasMeter)

    private constructor(
        public readonly code: string,
        public readonly name: string,
        public readonly rank: number = 1,
        public readonly mediaId: string = ''
    ) {}

    static list() {
        return [TrackerType.ELECTRICITY_METER, TrackerType.GAS_METER]
    }

    static new(code: string, rank = 1, mediaId = ''): TrackerType {
        const tracker = this.list().find(tracker => tracker.code === code) || TrackerType.ELECTRICITY_METER
        return new TrackerType(tracker.code, tracker.name, rank, mediaId)
    }

    static sort(trackers: Array<TrackerType>): Array<TrackerType> {
        return this.list()
            .map(tracker => trackers.find(t => tracker.code === t.code))
            .filter(t => t !== undefined) as Array<TrackerType>
    }

    static newFromMediaItem(item: MediaItem): TrackerType {
        return TrackerType.new(item.key, item.rank, item.id)
    }

    static newTrackerTypesFromMediaItems(items: Array<MediaItem>): Array<TrackerType> {
        const types = items.map((item: MediaItem) => TrackerType.newFromMediaItem(item))
        return TrackerType.sort(types) as Array<TrackerType>
    }
}
