export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)
    return date.toLocaleString()
}

export function getTimeDaysAgo(days: number) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    return date
}
