import { strings } from 'strings/en.js'
export type Consumption = {
    consumption: number
    start: number
    end: number
    imported: boolean
}

export class ConsumptionPeriod {
    static readonly DAILY = new ConsumptionPeriod('daily', strings.daily)
    static readonly WEEKLY = new ConsumptionPeriod('weekly', strings.weekly)
    static readonly MONTHLY = new ConsumptionPeriod('monthly', strings.monthly)

    private constructor(public readonly key: string, public readonly name: string) {}

    static list() {
        return [ConsumptionPeriod.DAILY, ConsumptionPeriod.WEEKLY, ConsumptionPeriod.MONTHLY]
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
