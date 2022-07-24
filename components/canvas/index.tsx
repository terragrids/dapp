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

        const context = canvasRef.current.getContext('2d')

        if (!context) return

        canvasRef.current.addEventListener('wheel', (e) => onWheel(context, e))
        drawOnCanvas(context)

        return () => {
            canvasRef.current?.removeEventListener('wheel', (e) =>
                onWheel(context, e)
            )
        }
    }, [drawOnCanvas])

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas
