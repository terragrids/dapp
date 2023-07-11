import { ONE_MINUTE } from './constants'

export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)
    return date.toLocaleString()
}

export function getStartOfDay(timestamp: number) {
    const date = new Date(timestamp)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(1)
    return date
}

export function getTimeDaysAgo(days: number) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date
}

export function getUTCFromLocal(timestamp: number) {
    const date = new Date(timestamp)
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - offset * ONE_MINUTE)
}
