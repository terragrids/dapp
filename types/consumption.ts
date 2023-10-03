import { strings } from 'strings/en.js'
export type Consumption = {
    consumption: number
    start: number
    end: number
    imported: boolean
}

export class ConsumptionPeriod {
    static readonly DAILY = new ConsumptionPeriod('day', strings.daily)
    static readonly WEEKLY = new ConsumptionPeriod('week', strings.weekly)
    static readonly MONTHLY = new ConsumptionPeriod('month', strings.monthly)

    private constructor(public readonly key: string, public readonly name: string) {}

    static list() {
        return [ConsumptionPeriod.DAILY, ConsumptionPeriod.WEEKLY, ConsumptionPeriod.MONTHLY]
    }
}
