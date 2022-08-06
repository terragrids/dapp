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

        canvas.addEventListener('wheel', (e) => onWheel(context, e))
        canvas.addEventListener('mousemove', (e) => onMouseMove(context, e))
        canvas.addEventListener('click', (e) => onClick(context, e))

        // let animationFrameId: number
        const render = () => {
            drawOnCanvas(context)
            requestAnimationFrame(render)
            // animationFrameId = requestAnimationFrame(render)
        }
        render()

        return () => {
            canvas.removeEventListener('wheel', (e) => onWheel(context, e))
            canvas.removeEventListener('mousemove', (e) =>
                onMouseMove(context, e)
            )
            canvas.removeEventListener('click', (e) => onClick(context, e))

            // TODO: Fix flickering when calling cancelAnimationFrame
            // This might help: https://stackoverflow.com/questions/40265707/flickering-images-in-canvas-animation
            // cancelAnimationFrame(animationFrameId)
        }
    }, [drawOnCanvas, onWheel, onMouseMove, onClick])

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas
