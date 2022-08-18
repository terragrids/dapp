import { Position2D } from 'components/map/plots/plot'
import { useState, useRef, useCallback, useEffect } from 'react'

const ORIGIN = Object.freeze({ x: 0, y: 0 })

export default function usePan(): [Position2D, (e: MouseEvent) => void, boolean] {
    const [panState, setPanState] = useState<Position2D>(ORIGIN)
    const [isPanned, setIsPanned] = useState(false)

    const lastPointRef = useRef<Position2D>(ORIGIN)
    const lastOffsetRef = useRef<Position2D>(ORIGIN)

    const pan = useCallback((e: MouseEvent) => {
        const lastPoint = lastPointRef.current
        const currentPoint = { x: e.pageX, y: e.pageY }
        lastPointRef.current = currentPoint

        const mouseDiff = diffPoints(currentPoint, lastPoint)

        setPanState(prev => {
            const offset = addPoints(prev, mouseDiff)
            const offsetDiff = diffPoints(offset, lastOffsetRef.current)

            return offsetDiff
        })
    }, [])

    useEffect(() => {
        setIsPanned(true)
        lastOffsetRef.current = panState
    }, [panState])

    const endPan = useCallback(() => {
        document.removeEventListener('mousemove', pan)
        document.removeEventListener('mouseup', endPan)
    }, [pan])

    const startPan = useCallback(
        (e: MouseEvent) => {
            document.addEventListener('mousemove', pan)
            document.addEventListener('mouseup', endPan)

            setIsPanned(false)
            lastPointRef.current = { x: e.pageX, y: e.pageY }
        },
        [pan, endPan]
    )

    return [panState, startPan, isPanned]
}

export function diffPoints(p1: Position2D, p2: Position2D) {
    return { x: p1.x - p2.x, y: p1.y - p2.y }
}
export function addPoints(p1: Position2D, p2: Position2D) {
    return { x: p1.x + p2.x, y: p1.y + p2.y }
}
