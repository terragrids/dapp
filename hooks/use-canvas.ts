import { DEFAULT_MAP_SCALE, getOptimalScale, ORIGINAL_MAP_WIDTH } from 'components/map/map-helper'
import { useCallback, useEffect, useRef } from 'react'

export const useCanvas = (
    draw: (ctx: CanvasRenderingContext2D) => void,
    width: number | undefined,
    height: number | undefined
) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const initialScaleRef = useRef(DEFAULT_MAP_SCALE)

    const predraw = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (width === undefined || height === undefined) return

            if (ORIGINAL_MAP_WIDTH * initialScaleRef.current > width || initialScaleRef.current < DEFAULT_MAP_SCALE) {
                // If map width is bigger than canvas width
                //  or map scale is set smaller than DEFAULT_MAP_SCALE,
                // increase the range to be cleared.
                // Otherwise the area initially not rendered on screen or full screen will not be cleared
                //  when scrolling horizontally
                context.clearRect(-width, 0, (width / initialScaleRef.current) * 2, height * 2)
            } else {
                context.clearRect(0, 0, width, height)
            }
        },
        [width, height]
    )

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        let animationFrameId: number
        const render = () => {
            predraw(context)
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        // focus canvas so that scroll zoom(keydown/up listeners) works by default
        canvasRef.current.focus()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, predraw])

    useEffect(() => {
        if (width === undefined) return

        const optimalScale = getOptimalScale(width)
        initialScaleRef.current = optimalScale
    }, [width])

    return canvasRef
}
