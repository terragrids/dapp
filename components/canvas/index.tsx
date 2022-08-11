import { BASE_SCREEN_SIZE, getOptimalScale } from 'components/map/map-helper'
import React, { useRef, useEffect } from 'react'

export type CanvasProps = {
    drawOnCanvas: (ctx: CanvasRenderingContext2D) => void
    onWheel: (ctx: CanvasRenderingContext2D, e: WheelEvent) => void
    onMouseMove: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    onClick: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    attributes: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({ drawOnCanvas, onWheel, onMouseMove, onClick, attributes: { width, height } }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current || !width) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        let animationFrameId: number

        const currentScale = context.getTransform().a
        const scale = getOptimalScale(Number(width))

        if (BASE_SCREEN_SIZE >= width && currentScale > scale) {
            context.scale(scale, scale)
        }

        const render = () => {
            drawOnCanvas(context)
            animationFrameId = requestAnimationFrame(render)
        }
        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [drawOnCanvas, width])

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        const onWheelListener = (e: WheelEvent) => onWheel(context, e)
        const onMouseMoveListener = (e: MouseEvent) => onMouseMove(context, e)
        const onClickListener = (e: MouseEvent) => onClick(context, e)

        canvas.addEventListener('wheel', onWheelListener)
        canvas.addEventListener('mousemove', onMouseMoveListener)
        canvas.addEventListener('click', onClickListener)

        return () => {
            canvas.removeEventListener('wheel', onWheelListener)
            canvas.removeEventListener('mousemove', onMouseMoveListener)
            canvas.removeEventListener('click', onClickListener)
        }
    }, [onClick, onMouseMove, onWheel])

    return <canvas ref={canvasRef} {...{ width, height }} />
}

export default Canvas
