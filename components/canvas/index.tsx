import React, { useRef, useEffect } from 'react'

export type CanvasProps = {
    drawOnCanvas: (ctx: CanvasRenderingContext2D) => void
    onWheel: (ctx: CanvasRenderingContext2D, e: WheelEvent) => void
    onMouseMove: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    onClick: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    attributes?: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({
    drawOnCanvas,
    onWheel,
    onMouseMove,
    onClick,
    attributes
}: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        // let animationFrameId: number
        const render = () => {
            drawOnCanvas(context)
            requestAnimationFrame(render)
            // animationFrameId = requestAnimationFrame(render)
        }
        render()
    }, [drawOnCanvas])

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

            // TODO: Fix flickering when calling cancelAnimationFrame
            // This might help: https://stackoverflow.com/questions/40265707/flickering-images-in-canvas-animation
            // cancelAnimationFrame(animationFrameId)
        }
    }, [onClick, onMouseMove, onWheel])

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas
