import Canvas from 'components/canvas'
import React, { useEffect, useRef, useState } from 'react'
import { endpoints } from 'utils/api-config'
import {
    convertToMapPlot,
    DEFAULT_MAP_SCALE,
    drawGrid,
    getBigs,
    getOptimalScale,
    getPlotPosition,
    getSppPlot,
    getStartPosition,
    getTransformedPoint,
    GRID_SIZE,
    isInsideMap,
    MAGIC_NUMBER_TO_ADJUST,
    ORIGINAL_MAP_WIDTH
} from './map-helper'
import Plot from './plots/plot'

export type MapProps = {
    width: number | undefined
    height: number | undefined
    onSelectPlot: (plotInfo: MapPlotType) => void
    onSelectSolarPowerPlant: () => void
}

const ZOOM_SENSITIVITY = 0.0001
const MAX_SCALE = 2
const MIN_SCALE = 0.8

// Set temporarily (Should be changed once the requirements for UI/UX are all determined)
const DEFAULT_DELTA = 1
const SCROLL_SENSITIVITY = 0.05

const Map = ({ width, height, onSelectPlot, onSelectSolarPowerPlant }: MapProps) => {
    const mouseRef = useRef({ x: -1, y: -1 })
    const startPositionRef = useRef({ x: -1, y: -1 })
    const initialScaleRef = useRef(DEFAULT_MAP_SCALE)
    const zoomEnabled = useRef(false)
    const [mapPlots, setMapPlots] = useState<MapPlotType[]>([])

    const renderPlotHover = (ctx: CanvasRenderingContext2D) => (x: number, y: number) => {
        ctx.beginPath()
        ctx.setLineDash([])
        ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)'
        ctx.fillStyle = 'rgba(192, 57, 43, 0.4)'
        ctx.lineWidth = 2
        ctx.moveTo(x, y)
        ctx.lineTo(x + Plot.PLOT_WIDTH / 2, y - Plot.PLOT_HEIGHT / 2)
        ctx.lineTo(x + Plot.PLOT_WIDTH, y)
        ctx.lineTo(x + Plot.PLOT_WIDTH / 2, y + Plot.PLOT_HEIGHT / 2)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fill()
    }

    const renderPlots = (ctx: CanvasRenderingContext2D) => (x: number, y: number) => {
        if (mapPlots.length === 0) return

        for (let plotX = 0; plotX < GRID_SIZE; ++plotX) {
            for (let plotY = 0; plotY < GRID_SIZE; ++plotY) {
                const index = plotY * GRID_SIZE + plotX
                const target = mapPlots.find(el => el.index === index)
                if (!target) continue

                const plot: Plot = new Plot({
                    image: target.image,
                    mapStartPosition: { ...{ x, y } },
                    coord: { x: plotX, y: plotY },
                    ctx
                })
                plot.draw(MAGIC_NUMBER_TO_ADJUST)
            }
        }

        const { x: mouseX, y: mouseY } = getTransformedPoint(ctx, mouseRef.current.x, mouseRef.current.y)

        if (!isInsideMap(startPositionRef.current, mouseX, mouseY)) return

        const { positionX, positionY } = getPlotPosition(startPositionRef.current, mouseX, mouseY)

        const renderX = x + (positionX - positionY) * Plot.PLOT_HALF_WIDTH
        const renderY = y + (positionX + positionY) * Plot.PLOT_HALF_HEIGHT

        renderPlotHover(ctx)(renderX, renderY + Plot.PLOT_HEIGHT)
    }

    const render = (ctx: CanvasRenderingContext2D) => {
        if (!width || !height) return

        const { x, y } = startPositionRef.current

        if (ORIGINAL_MAP_WIDTH * initialScaleRef.current > width || initialScaleRef.current < DEFAULT_MAP_SCALE) {
            // If map width is bigger than canvas width
            //  or map scale is set smaller than DEFAULT_MAP_SCALE,
            // increase the range to be cleared.
            // Otherwise the area initially not rendered on screen or full screen will not be cleared
            //  when scrolling horizontally
            ctx.clearRect(-width, 0, (width / initialScaleRef.current) * 2, height * 2)
        } else {
            ctx.clearRect(0, 0, width, height)
        }

        drawGrid(ctx, { x, y })
        renderPlots(ctx)(x, y)
    }

    const onWheelZoom = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
        const currentScale = ctx.getTransform().a
        const zoomAmount = e.deltaY * ZOOM_SENSITIVITY

        // When reaching MAX_SCALE, it only allows zoom OUT (= negative zoomAmount)
        // When reaching MIN_SCALE, it only allows zoom IN (= positive zoomAmount)
        if (currentScale >= MAX_SCALE && zoomAmount > 0) return
        if (currentScale <= MIN_SCALE && zoomAmount < 0) return

        const scale = DEFAULT_MAP_SCALE + zoomAmount

        ctx.translate(e.offsetX, e.offsetY)
        ctx.scale(scale, scale)
        ctx.translate(-e.offsetX, -e.offsetY)
    }

    const onWheel = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
        if (zoomEnabled.current) {
            onWheelZoom(ctx, e)
        } else {
            const moveAmountY = DEFAULT_DELTA * e.deltaY * SCROLL_SENSITIVITY
            const moveAmountX = DEFAULT_DELTA * e.deltaX * SCROLL_SENSITIVITY

            ctx.translate(moveAmountX, moveAmountY)
        }
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey || e.metaKey) {
            zoomEnabled.current = true
        }
    }

    const onKeyUp = () => {
        zoomEnabled.current = false
    }

    const onMouseMove = (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        const rect = ctx.canvas.getBoundingClientRect()

        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const onClick = (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        const rect = ctx.canvas.getBoundingClientRect()

        const { x: mouseX, y: mouseY } = getTransformedPoint(ctx, e.clientX - rect.left, e.clientY - rect.top)

        if (!isInsideMap(startPositionRef.current, mouseX, mouseY)) return

        const { positionX, positionY } = getPlotPosition(startPositionRef.current, mouseX, mouseY)

        const index = positionY * GRID_SIZE + positionX

        const target = mapPlots.find(el => el.index === index)

        if (!target) return

        if (index === 0) {
            onSelectSolarPowerPlant()
        } else if (index < GRID_SIZE * GRID_SIZE) {
            onSelectPlot(target)
        }
    }

    const onTouch = (ctx: CanvasRenderingContext2D, e: TouchEvent) => {
        const rect = ctx.canvas.getBoundingClientRect()

        const touch = e.touches[0] || e.changedTouches[0]

        const { x: touchX, y: touchY } = getTransformedPoint(ctx, touch.clientX, touch.clientY - rect.top)

        if (!isInsideMap(startPositionRef.current, touchX, touchY)) return

        const { positionX, positionY } = getPlotPosition(startPositionRef.current, touchX, touchY)

        const index = positionY * GRID_SIZE + positionX
        const target = mapPlots.find(el => el.index === index)

        if (!target) return

        if (index === 0) {
            onSelectSolarPowerPlant()
        } else if (index < GRID_SIZE * GRID_SIZE) {
            onSelectPlot(target)
        }
    }

    useEffect(() => {
        const load = async () => {
            const res = await fetch(endpoints.terralands())
            if (!res.ok) return

            const { assets } = await res.json()

            const plots = assets.map((asset: PlotType) => convertToMapPlot(asset))

            const spp = getSppPlot()
            const bigs = getBigs([...plots]) // TODO: remove if no need to render not larger image plots
            setMapPlots([spp, ...plots, ...bigs])
        }
        load()
    }, [])

    useEffect(() => {
        if (width === undefined || height === undefined) return

        const { x, y } = getStartPosition(width, height)
        startPositionRef.current = { x, y }

        const optimalScale = getOptimalScale(width)
        initialScaleRef.current = optimalScale
    }, [width, height])

    return (
        <Canvas
            drawOnCanvas={render}
            onWheel={onWheel}
            onMouseMove={onMouseMove}
            onClick={onClick}
            onTouch={onTouch}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            attributes={{ width, height }}
        />
    )
}

export default Map
