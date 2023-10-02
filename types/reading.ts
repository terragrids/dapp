export type Reading = {
    id: string
    value: number
    unit: string
    type: string
    frequency: string
    start: string
    end: string
    created: string
}

export enum ReadingType {
    ABSOLUTE = 'absolute',
    CONSUMPTION = 'consumption'
}
