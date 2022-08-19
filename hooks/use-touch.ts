import { Position2D } from 'components/map/plots/plot'
import { useState, useRef, useCallback, useEffect } from 'react'
import { addPoints, diffPoints } from './use-pan'

const ORIGIN = Object.freeze({ x: 0, y: 0 })

export default function useTouch(): [Position2D, boolean, (e: TouchEvent) => void] {
    const [offset, setOffset] = useState<Position2D>(ORIGIN)
    const [isPanned, setIsPanned] = useState(false)

    // const [scale, setScale] = useState(DEFAULT_MAP_SCALE)

    const lastPointRef = useRef<Position2D>(ORIGIN)
    const lastOffsetRef = useRef<Position2D>(ORIGIN)

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

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (e.touches.length > 1) {
                // Do something to zoom?
            } else {
                pan(e)
            }
        },
        [pan]
    )

    useEffect(() => {
        setIsPanned(true)

        lastOffsetRef.current = offset
    }, [offset])

    const endTouch = useCallback(() => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', endTouch)
    }, [handleTouchMove])

    const startTouch = useCallback(
        (e: TouchEvent) => {
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', endTouch)
            setIsPanned(false)

            lastPointRef.current = { x: e.touches[0].pageX, y: e.touches[0].pageY }
        },
        [handleTouchMove, endTouch]
    )

    return [offset, isPanned, startTouch]
}
