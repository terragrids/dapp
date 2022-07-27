import React, { useRef, useEffect } from 'react'

export type CanvasProps = {
    drawOnCanvas: (ctx: CanvasRenderingContext2D) => void
    onWheel: (ctx: CanvasRenderingContext2D, e: WheelEvent) => void
    attributes?: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({ drawOnCanvas, onWheel, attributes }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        canvas.addEventListener('wheel', (e) => onWheel(context, e))

        drawOnCanvas(context)

        return () => {
            canvas.removeEventListener('wheel', (e) => onWheel(context, e))
        }
    }, [drawOnCanvas, onWheel])

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas
