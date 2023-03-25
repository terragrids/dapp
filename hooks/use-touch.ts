import { Position2D } from 'components/map/plot'
import { useState, useRef, useCallback, useEffect } from 'react'
import { addPoints, diffPoints } from './use-pan'

type ZoomState = { position: Position2D; amount: number }

const ORIGIN = Object.freeze({ x: 0, y: 0 })

export default function useTouch(): {
    offset: Position2D
    isPannedOrZoomed: boolean
    zoomPosition: Position2D
    zoomAmount: number
    onTouchStart: (e: TouchEvent) => void
} {
    const [offset, setOffset] = useState<Position2D>(ORIGIN)
    const [isPannedOrZoomed, setIsPannedOrZoomed] = useState(false)
    const lastPointRef = useRef<Position2D>(ORIGIN)
    const lastOffsetRef = useRef<Position2D>(ORIGIN)

    const [zoom, setZoom] = useState<ZoomState>({ position: ORIGIN, amount: 0 })
    const startTouchRef = useRef<Position2D[]>([ORIGIN])
    const isZooming = useRef(false)

    const pan = useCallback((e: TouchEvent) => {
        const lastPoint = lastPointRef.current
        const currentPoint = { x: e.touches[0].pageX, y: e.touches[0].pageY }
        lastPointRef.current = currentPoint

        const mouseDiff = diffPoints(currentPoint, lastPoint)

        setOffset(prev => {
            const offset = addPoints(prev, mouseDiff)
            const offsetDiff = diffPoints(offset, lastOffsetRef.current)

            return offsetDiff
        })
    }, [])

    const onZoom = useCallback((e: TouchEvent) => {
        const zoomAmount = calculateScale(startTouchRef.current, getPageCoordinatesByTouches(e.touches))
        const center = midpoint(touchPosition(e.touches[0]), touchPosition(e.touches[1]))

        setZoom({ position: center, amount: zoomAmount })
        setIsPannedOrZoomed(true)
    }, [])

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (isZooming.current) {
                onZoom(e)
            }

            if (e.touches.length === 1) {
                pan(e)
            }
        },
        [pan, onZoom]
    )

    useEffect(() => {
        setIsPannedOrZoomed(true)
        lastOffsetRef.current = offset
    }, [offset])

    const onTouchEnd = useCallback(() => {
        isZooming.current = false
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', onTouchEnd)
        setIsPannedOrZoomed(false)
    }, [handleTouchMove])

    const onTouchStart = useCallback(
        (e: TouchEvent) => {
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', onTouchEnd)
            // setIsPannedOrZoomed(false)

            lastPointRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY }

            if (e.targetTouches.length === 2) {
                isZooming.current = true
                startTouchRef.current = getPageCoordinatesByTouches(e.targetTouches)
            }
        },
        [handleTouchMove, onTouchEnd]
    )

    return { offset, isPannedOrZoomed, zoomPosition: zoom.position, zoomAmount: zoom.amount, onTouchStart }
}

function distance(p1: Position2D, p2: Position2D) {
    const dx = p1.x - p2.x
    const dy = p1.y - p2.y
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

function midpoint(p1: Position2D, p2: Position2D) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
}

const touchPosition = (touch: Touch) => ({ x: touch.pageX, y: touch.pageY })

const calculateScale = (startTouches: Array<Position2D>, endTouches: Array<Position2D>): number => {
    const startDistance = distance(startTouches[0], startTouches[1])
    const endDistance = distance(endTouches[0], endTouches[1])

    return endDistance / startDistance
}

const getPointByPageCoordinates = (touch: Touch): Position2D => ({
    x: touch.pageX,
    y: touch.pageY
})

const getPageCoordinatesByTouches = (touches: TouchList): Array<Position2D> =>
    Array.from(touches).map(getPointByPageCoordinates)
