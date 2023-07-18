export type Reading = {
    id: string
    value: number
    unit: string
    type: string
    created: string
}

export enum ReadingType {
    ABSOLUTE = 'absolute',
    CONSUMPTION = 'consumption'
}
