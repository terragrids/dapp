import { strings } from 'strings/en.js'
export type Consumption = {
    consumption: number
    start: number
    end: number
    imported: boolean
}

export class ConsumptionCycle {
    static readonly DAILY = new ConsumptionCycle('daily', strings.daily)
    static readonly WEEKLY = new ConsumptionCycle('weekly', strings.weekly)
    static readonly MONTHLY = new ConsumptionCycle('monthly', strings.monthly)

    private constructor(public readonly key: string, public readonly name: string) {}

    static list() {
        return [ConsumptionCycle.DAILY, ConsumptionCycle.WEEKLY, ConsumptionCycle.MONTHLY]
    }

    static toShort(period: string) {
        switch (period) {
            case this.DAILY.key:
                return 'day'
            case this.WEEKLY.key:
                return 'week'
            case this.MONTHLY.key:
                return 'month'
            default:
                return ''
        }
    }
}
