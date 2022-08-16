import Canvas from 'components/canvas'
import { useCanvas } from 'hooks/use-canvas'
import { useCanvasController } from 'hooks/use-canvas-controller'
import React, { useEffect, useRef, useState } from 'react'
import { endpoints } from 'utils/api-config'
import {
    convertToMapPlot,
    DEFAULT_MAP_SCALE,
    drawGrid,
    getOptimalScale,
    getPlotPosition,
    getSppPlot,
    getStartPosition,
    getTransformedPoint,
    GRID_SIZE,
    isInsideMap,
    MAGIC_NUMBER_TO_ADJUST,
    ORIGINAL_MAP_WIDTH,
    renderPlotHover
} from './map-helper'
import Plot from './plots/plot'

export type MapProps = {
    width: number | undefined
    height: number | undefined
    headerHeight: number | undefined
    onSelectPlot: (plotInfo: MapPlotType) => void
    onSelectSolarPowerPlant: () => void
}

const Map = ({ width, height, headerHeight, onSelectPlot, onSelectSolarPowerPlant }: MapProps) => {
    const canvasRef = useCanvas(render)
    const startPositionRef = useRef({ x: -1, y: -1 })
    const initialScaleRef = useRef(DEFAULT_MAP_SCALE)

    const { mouseRef, onClick, onMouseMove, onTouch, onWheel } = useCanvasController(
        canvasRef.current,
        startPositionRef.current,
        headerHeight
    )

    const [mapPlots, setMapPlots] = useState<MapPlotType[]>([])

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

    function render(ctx: CanvasRenderingContext2D) {
        if (!width || !height) return

        const { x, y } = startPositionRef.current

        if (ORIGINAL_MAP_WIDTH * initialScaleRef.current > width) {
            // if map width is bigger than canvas width, increase the range to be cleared
            // otherwise the area initially not rendered on screen will not be cleared
            // when scrolling horizontally
            ctx.clearRect(-width, -height, (width / initialScaleRef.current) * 2, height * 2)
        } else {
            ctx.clearRect(0, 0, width, height)
        }

        drawGrid(ctx, { x, y })
        renderPlots(ctx)(x, y)
    }
    // TO LOCK THE SIZE OF THE MAP TO 1x
    // const onScrollY = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
    //     const currentScale = ctx.getTransform().a
    //     const zoomAmount = e.deltaY * ZOOM_SENSITIVITY

    const handleClickOrTouch = (positionX: number, positionY: number) => {
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
            setMapPlots([spp, ...plots])
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
            canvasRef={canvasRef}
            onMouseMove={onMouseMove}
            onWheel={onWheel}
            onClick={onClick(handleClickOrTouch)}
            onTouch={onTouch(handleClickOrTouch)}
            attributes={{ width, height }}
        />
    )
}

export default Map
