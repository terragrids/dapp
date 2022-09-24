import { DEFAULT_MAP_SCALE, getPlotPosition, getTransformedPoint, isInsideMap } from 'components/map/map-helper'
import { Position2D } from 'components/map/plots/plot'
import { useCallback, useEffect, useRef, useState } from 'react'
import usePan from './use-pan'
import useTouch from './use-touch'

const ZOOM_SENSITIVITY = 0.0001
const PINCH_ZOOM_SENSITIVITY = 0.2
const MAX_SCALE = 4
const MIN_SCALE = 0.8

export const useCanvasController = (
    canvas: HTMLCanvasElement | null,
    startPosition: Position2D,
    initialScale: number
) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
    const mouseRef = useRef({ x: -1, y: -1 })
    const zoomEnabled = useRef(false)
    const [panOffset, onPanStart, isPanned] = usePan()
    const { offset: touchOffset, isPannedOrZoomed, zoomPosition, zoomAmount, onTouchStart } = useTouch()
    const [deltaZoom, setDeltaZoom] = useState(0)

    useEffect(() => {
        if (!canvas) return

        const context = canvas.getContext('2d')

        setContext(context)

        return () => {
            setContext(null)
        }
    }, [canvas])

    useEffect(() => {
        if (!context) return

        const zoom = context.getTransform().a
        context.translate(panOffset.x / zoom, panOffset.y / zoom)
        context.translate(touchOffset.x, touchOffset.y)
    }, [context, panOffset, touchOffset])

    useEffect(() => {
        if (!context || !zoomAmount || !isPannedOrZoomed) return

        const newDeltaZoom = zoomAmount > 1 ? zoomAmount * PINCH_ZOOM_SENSITIVITY : -zoomAmount * PINCH_ZOOM_SENSITIVITY

        if (deltaZoom === 0) {
            setDeltaZoom(newDeltaZoom)
            return
        }

        const currentScale = context.getTransform().a

        // When reaching MAX_SCALE, it only allows zoom OUT (= negative zoomAmount)
        // When reaching MIN_SCALE or initialScale or initialScale, it only allows zoom IN (= positive zoomAmount)
        if (currentScale >= MAX_SCALE && newDeltaZoom > 0) return
        if (currentScale <= Math.min(MIN_SCALE, initialScale) && newDeltaZoom < 0) return

        const scale = DEFAULT_MAP_SCALE + Math.abs(newDeltaZoom) - Math.abs(deltaZoom)

        setDeltaZoom(newDeltaZoom)

        const rect = context.canvas.getBoundingClientRect()

        const offset = {
            x: zoomPosition.x - rect.left,
            y: zoomPosition.y - rect.top
        }
        const transformedPosition = getTransformedPoint(context, offset.x, offset.y)

        context.translate(transformedPosition.x, transformedPosition.y)
        context.scale(scale, scale)
        context.translate(-transformedPosition.x, -transformedPosition.y)
    }, [zoomPosition, zoomAmount, context, initialScale, deltaZoom, isPannedOrZoomed])

    const onMouseMove = useCallback(
        (func: (positionX: number, positionY: number, withinMap: boolean) => void) => (e: MouseEvent) => {
            if (!context) return

            const rect = context.canvas.getBoundingClientRect()

            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            }

            const { x: mouseX, y: mouseY } = getTransformedPoint(context, e.clientX, e.clientY - rect.top)
            const withinMap = isInsideMap(startPosition, mouseX, mouseY)
            const { positionX, positionY } = getPlotPosition(startPosition, mouseX, mouseY)
            return func(positionX, positionY, withinMap)
        },
        [context, startPosition]
    )

    const onWheelZoom = useCallback(
        (e: WheelEvent) => {
            if (!context) return

            const currentScale = context.getTransform().a
            const zoomAmount = -(e.deltaY * ZOOM_SENSITIVITY)

            // When reaching MAX_SCALE, it only allows zoom OUT (= negative zoomAmount)
            // When reaching MIN_SCALE or initialScale or initialScale, it only allows zoom IN (= positive zoomAmount)
            if (currentScale >= MAX_SCALE && zoomAmount > 0) return
            if (currentScale <= Math.min(MIN_SCALE, initialScale) && zoomAmount < 0) return

            const scale = DEFAULT_MAP_SCALE + zoomAmount

            context.translate(e.offsetX, e.offsetY)
            context.scale(scale, scale)
            context.translate(-e.offsetX, -e.offsetY)
        },
        [context, initialScale]
    )

    const onWheel = useCallback(
        (e: WheelEvent) => {
            if (!context) return
            if (zoomEnabled.current) {
                onWheelZoom(e)
            }
        },
        [context, onWheelZoom]
    )

    const onClick = useCallback(
        (func: (positionX: number, positionY: number) => void) => (e: MouseEvent) => {
            if (!context || isPanned) return

            const rect = context.canvas.getBoundingClientRect()

            const { x: mouseX, y: mouseY } = getTransformedPoint(context, e.clientX, e.clientY - rect.top)

            if (!isInsideMap(startPosition, mouseX, mouseY)) return

            const { positionX, positionY } = getPlotPosition(startPosition, mouseX, mouseY)

            return func(positionX, positionY)
        },
        [context, isPanned, startPosition]
    )

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            setDeltaZoom(0)
            onTouchStart(e)
        },
        [onTouchStart]
    )

    const handleTouchEnd = useCallback(
        (func: (positionX: number, positionY: number) => void) => (e: TouchEvent) => {
            if (!context || isPannedOrZoomed) return

            const rect = context.canvas.getBoundingClientRect()

            const touch = e.touches[0] || e.changedTouches[0]

            const { x: touchX, y: touchY } = getTransformedPoint(context, touch.clientX, touch.clientY - rect.top)

            if (!isInsideMap(startPosition, touchX, touchY)) return

            const { positionX, positionY } = getPlotPosition(startPosition, touchX, touchY)

            return func(positionX, positionY)
        },
        [context, isPannedOrZoomed, startPosition]
    )

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            zoomEnabled.current = true
        }
    }, [])

    const onKeyUp = useCallback(() => {
        zoomEnabled.current = false
    }, [])

    return {
        mouseRef,
        onWheel,
        onMouseMove,
        onClick,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onKeyDown,
        onKeyUp,
        onPanStart
    }
}
