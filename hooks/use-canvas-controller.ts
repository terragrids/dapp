import { DEFAULT_MAP_SCALE, getPlotPosition, getTransformedPoint, isInsideMap } from 'components/map/map-helper'
import { Position2D } from 'components/map/plots/plot'
import { useCallback, useEffect, useRef, useState } from 'react'

const ZOOM_SENSITIVITY = 0.0001
const MAX_SCALE = 2
const MIN_SCALE = 0.8

// Set temporarily (Should be changed once the requirements for UI/UX are all determined)
const DEFAULT_DELTA_X = 1
const HORIZONTAL_SCROLL_SENSITIVITY = 0.05

export const useCanvasController = (
    canvas: HTMLCanvasElement | null,
    startPosition: Position2D,
    headerHeight: number | undefined
) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const mouseRef = useRef({ x: -1, y: -1 })

    useEffect(() => {
        if (!canvas) return

        const context = canvas.getContext('2d')

        setContext(context)

        return () => {
            setContext(null)
        }
    }, [canvas])

    const onScrollX = useCallback(
        (e: WheelEvent) => {
            if (!context) return

            const moveAmount = DEFAULT_DELTA_X * e.deltaX * HORIZONTAL_SCROLL_SENSITIVITY

            // Only allows x axis move
            context.translate(moveAmount, 0)
        },
        [context]
    )

    const onScrollY = useCallback(
        (e: WheelEvent) => {
            if (!context) return

            const currentScale = context.getTransform().a
            const zoomAmount = e.deltaY * ZOOM_SENSITIVITY

            // When reaching MAX_SCALE, it only allows zoom OUT (= negative zoomAmount)
            // When reaching MIN_SCALE, it only allows zoom IN (= positive zoomAmount)
            if (currentScale >= MAX_SCALE && zoomAmount > 0) return
            if (currentScale <= MIN_SCALE && zoomAmount < 0) return

            const scale = DEFAULT_MAP_SCALE + zoomAmount

            context.translate(e.offsetX, e.offsetY)
            context.scale(scale, scale)
            context.translate(-e.offsetX, -e.offsetY)
        },
        [context]
    )

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!context) return

            const rect = context.canvas.getBoundingClientRect()

            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }
        },
        [context]
    )

    const onWheel = useCallback(
        (e: WheelEvent) => {
            onScrollX(e)
            onScrollY(e)
        },
        [onScrollX, onScrollY]
    )

    const onClick = useCallback(
        (func: (positionX: number, positionY: number) => void) => (e: MouseEvent) => {
            if (!context) return
            if (headerHeight === undefined) return

            const { x: mouseX, y: mouseY } = getTransformedPoint(context, e.clientX, e.clientY - headerHeight)

            if (!isInsideMap(startPosition, mouseX, mouseY)) return

            const { positionX, positionY } = getPlotPosition(startPosition, mouseX, mouseY)

            return func(positionX, positionY)
        },
        [context, startPosition, headerHeight]
    )

    const onTouch = useCallback(
        (func: (positionX: number, positionY: number) => void) => (e: TouchEvent) => {
            if (!context) return
            if (headerHeight === undefined) return

            const touch = e.touches[0] || e.changedTouches[0]

            const { x: touchX, y: touchY } = getTransformedPoint(context, touch.clientX, touch.clientY - headerHeight)

            if (!isInsideMap(startPosition, touchX, touchY)) return

            const { positionX, positionY } = getPlotPosition(startPosition, touchX, touchY)

            return func(positionX, positionY)
        },
        [context, startPosition, headerHeight]
    )

    return {
        mouseRef,
        onScrollX,
        onScrollY,
        onWheel,
        onMouseMove,
        onClick,
        onTouch
    }
}
