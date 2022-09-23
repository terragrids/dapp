import { BASE_SCREEN_SIZE, getOptimalScale } from 'components/map/map-helper'
import React, { useEffect } from 'react'
import styles from './index.module.scss'

export type CanvasProps = {
    canvasRef: React.RefObject<HTMLCanvasElement>
    onMouseMove: (e: MouseEvent) => void
    onWheel: (e: WheelEvent) => void
    onClick: (e: MouseEvent) => void
    onTouchStart: (e: TouchEvent) => void
    onTouchEnd: (e: TouchEvent) => void
    onKeyDown: (e: KeyboardEvent) => void
    onKeyUp: (e: KeyboardEvent) => void
    onPanStart: (e: MouseEvent) => void
    attributes: React.CanvasHTMLAttributes<HTMLCanvasElement>
    clickable: boolean
}

const Canvas = ({
    canvasRef,
    onWheel,
    onMouseMove,
    onClick,
    onTouchStart,
    onTouchEnd,
    onKeyDown,
    onKeyUp,
    onPanStart,
    attributes: { width, height },
    clickable
}: CanvasProps) => {
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
        const onMouseDownListener = (e: MouseEvent) => onPanStart(e)
        const onClickListener = (e: MouseEvent) => onClick(e)
        const onTouchStartListener = (e: TouchEvent) => onTouchStart(e)
        const onTouchEndListener = (e: TouchEvent) => onTouchEnd(e)

        canvas.addEventListener('wheel', onWheelListener)
        canvas.addEventListener('mousemove', onMouseMoveListener)
        canvas.addEventListener('mousedown', onMouseDownListener)
        canvas.addEventListener('click', onClickListener)
        canvas.addEventListener('touchstart', onTouchStartListener)
        canvas.addEventListener('touchend', onTouchEndListener)
        canvas.addEventListener('keydown', onKeyDown)
        canvas.addEventListener('keyup', onKeyUp)

        return () => {
            canvas.removeEventListener('wheel', onWheelListener)
            canvas.removeEventListener('mousemove', onMouseMoveListener)
            canvas.removeEventListener('mousedown', onMouseDownListener)
            canvas.removeEventListener('click', onClickListener)
            canvas.removeEventListener('touchstart', onTouchStartListener)
            canvas.removeEventListener('touchend', onTouchEndListener)
            canvas.removeEventListener('keydown', onKeyDown)
            canvas.removeEventListener('keyup', onKeyUp)
        }
    }, [canvasRef, onClick, onKeyDown, onKeyUp, onMouseMove, onPanStart, onTouchEnd, onTouchStart, onWheel])

    return (
        <canvas
            ref={canvasRef}
            {...{ width, height }}
            tabIndex={0}
            className={`${styles.canvas} ${clickable ? styles.clickable : ''}`}
        />
    )
}

export default Canvas
