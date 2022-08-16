import { BASE_SCREEN_SIZE, getOptimalScale } from 'components/map/map-helper'
import React, { useEffect } from 'react'

export type CanvasProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    onMouseMove: (e: MouseEvent) => void
    onWheel: (e: WheelEvent) => void
    onClick: (e: MouseEvent) => void
    onTouch: (e: TouchEvent) => void
    attributes: React.CanvasHTMLAttributes<HTMLCanvasElement>
}

const Canvas = ({ canvasRef, onMouseMove, onWheel, onClick, onTouch, attributes: { width, height } }: CanvasProps) => {
    useEffect(() => {
        if (!canvasRef.current || !width) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        const currentScale = context.getTransform().a
        const scale = getOptimalScale(Number(width))

        if (BASE_SCREEN_SIZE >= width && currentScale > scale) {
            context.scale(scale, scale)
        }
    }, [width, canvasRef])

    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        if (!context) return

        const onWheelListener = (e: WheelEvent) => onWheel(e)
        const onMouseMoveListener = (e: MouseEvent) => onMouseMove(e)
        const onClickListener = (e: MouseEvent) => onClick(e)
        const onTouchListener = (e: TouchEvent) => onTouch(e)

        canvas.addEventListener('wheel', onWheelListener)
        canvas.addEventListener('mousemove', onMouseMoveListener)
        canvas.addEventListener('click', onClickListener)
        canvas.addEventListener('touchend', onTouchListener)

        return () => {
            canvas.removeEventListener('wheel', onWheelListener)
            canvas.removeEventListener('mousemove', onMouseMoveListener)
            canvas.removeEventListener('click', onClickListener)
            canvas.removeEventListener('touchend', onTouchListener)
        }
    }, [onClick, onMouseMove, onWheel, onTouch, canvasRef])

    return <canvas ref={canvasRef} {...{ width, height }} />
}

export default Canvas
