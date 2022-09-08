import { DEFAULT_MAP_SCALE, getOptimalScale, ORIGINAL_MAP_WIDTH } from 'components/map/map-helper'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useCanvas = (
    draw: (ctx: CanvasRenderingContext2D) => void,
    width: number | undefined,
    height: number | undefined
): [RefObject<HTMLCanvasElement>, number, () => void] => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const initialScaleRef = useRef(DEFAULT_MAP_SCALE)
    const [shouldRender, setShouldRender] = useState(true)

    const predraw = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (width === undefined || height === undefined) return

            if (ORIGINAL_MAP_WIDTH * initialScaleRef.current > width || initialScaleRef.current < DEFAULT_MAP_SCALE) {
                // If map width is bigger than canvas width
                //  or map scale is set smaller than DEFAULT_MAP_SCALE,
                // increase the range to be cleared.
                // Otherwise the area initially not rendered on screen or full screen will not be cleared
                //  when scrolling horizontally
                context.clearRect(-width, -height, (width / initialScaleRef.current) * 2, height * 3)
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
            if (shouldRender) {
                predraw(context)
                draw(context)
                animationFrameId = window.requestAnimationFrame(render)
                setShouldRender(false)
            }
        }
        render()

        // focus canvas so that scroll zoom(keydown/up listeners) works by default
        canvasRef.current.focus()

        const onCanvasEvent = () => {
            setShouldRender(true)
        }

        ;[
            'mousemove',
            'mousedown',
            'click',
            'wheel',
            'touchmove',
            'touchstart',
            'touchend',
            'keydown',
            'keyup'
        ].forEach(event => {
            canvas.addEventListener(event, onCanvasEvent)
        })

        return () => {
            ;[
                'mousemove',
                'mousedown',
                'click',
                'wheel',
                'touchmove',
                'touchstart',
                'touchend',
                'keydown',
                'keyup'
            ].forEach(event => {
                canvas.removeEventListener(event, onCanvasEvent)
            })

            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw, predraw, shouldRender])

    useEffect(() => {
        if (width === undefined) return

        const optimalScale = getOptimalScale(width)
        initialScaleRef.current = optimalScale
    }, [width])

    const renderCanvas = useCallback(() => {
        setShouldRender(true)
    }, [])

    return [canvasRef, initialScaleRef.current, renderCanvas]
}
