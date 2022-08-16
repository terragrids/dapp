import { BASE_SCREEN_SIZE, getOptimalScale } from 'components/map/map-helper'
import React, { useRef, useEffect } from 'react'
import styles from './index.module.scss'

export type CanvasProps = {
    drawOnCanvas: (ctx: CanvasRenderingContext2D) => void
    onWheel: (ctx: CanvasRenderingContext2D, e: WheelEvent) => void
    onMouseMove: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    onClick: (ctx: CanvasRenderingContext2D, e: MouseEvent) => void
    onTouch: (ctx: CanvasRenderingContext2D, e: TouchEvent) => void
    onKeyDown: (e: KeyboardEvent) => void
    onKeyUp: (e: KeyboardEvent) => void
    attributes: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({
    drawOnCanvas,
    onWheel,
    onMouseMove,
    onClick,
    onTouch,
    onKeyDown,
    onKeyUp,
    attributes: { width, height }
}: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        let animationFrameId: number

        const render = () => {
            drawOnCanvas(context)
            animationFrameId = requestAnimationFrame(render)
        }
        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [drawOnCanvas])

    useEffect(() => {
        if (!canvasRef.current || !width) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        const currentScale = context.getTransform().a
        const optimalScale = getOptimalScale(Number(width))

        if (BASE_SCREEN_SIZE >= width && currentScale > optimalScale) {
            context.scale(optimalScale, optimalScale)
        }
        canvasRef.current.focus()
    }, [width])

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        const onWheelListener = (e: WheelEvent) => onWheel(context, e)
        const onMouseMoveListener = (e: MouseEvent) => onMouseMove(context, e)
        const onClickListener = (e: MouseEvent) => onClick(context, e)
        const onTouchListener = (e: TouchEvent) => onTouch(context, e)

        canvas.addEventListener('wheel', onWheelListener)
        canvas.addEventListener('mousemove', onMouseMoveListener)
        canvas.addEventListener('click', onClickListener)
        canvas.addEventListener('touchend', onTouchListener)
        canvas.addEventListener('keydown', onKeyDown)
        canvas.addEventListener('keyup', onKeyUp)

        return () => {
            canvas.removeEventListener('wheel', onWheelListener)
            canvas.removeEventListener('mousemove', onMouseMoveListener)
            canvas.removeEventListener('click', onClickListener)
            canvas.removeEventListener('touchend', onTouchListener)
            canvas.removeEventListener('keydown', onKeyDown)
            canvas.removeEventListener('keyup', onKeyUp)
        }
    }, [onClick, onMouseMove, onWheel, onTouch, onKeyDown, onKeyUp])

    return <canvas ref={canvasRef} {...{ width, height }} tabIndex={0} className={styles.canvas} />
}

export default Canvas
