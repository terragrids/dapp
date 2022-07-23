import React, { useRef, useEffect } from 'react'

export type CanvasProps = {
    drawOnCanvas: (ctx: CanvasRenderingContext2D) => void
    attributes?: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({ drawOnCanvas, attributes }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const context = canvasRef.current.getContext('2d')

        if (!context) return

        drawOnCanvas(context)
    }, [canvasRef.current, drawOnCanvas])

    return <canvas ref={canvasRef} {...attributes} />
}

export default Canvas
