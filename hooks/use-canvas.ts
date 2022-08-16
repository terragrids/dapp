import { useEffect, useRef } from 'react'

export const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return

        let animationFrameId: number
        const render = () => {
            draw(context)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return canvasRef
}
