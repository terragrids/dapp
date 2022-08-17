import Canvas from 'components/canvas'
import { useCanvas } from 'hooks/use-canvas'
import { useCanvasController } from 'hooks/use-canvas-controller'
import React, { useEffect, useRef, useState } from 'react'
import { endpoints } from 'utils/api-config'
import {
    convertToMapPlot,
    drawGrid,
    getPlotPosition,
    getSppPlot,
    getStartPosition,
    getTransformedPoint,
    GRID_SIZE,
    isInsideMap,
    MAGIC_NUMBER_TO_ADJUST,
    renderHoveredPlot
} from './map-helper'
import Plot, { Position2D } from './plots/plot'

export type MapProps = {
    width: number | undefined
    height: number | undefined
    onSelectPlot: (plotInfo: MapPlotType) => void
    onSelectSolarPowerPlant: () => void
}

const Map = ({ width, height, onSelectPlot, onSelectSolarPowerPlant }: MapProps) => {
    const canvasRef = useCanvas(render, width, height)
    const startPositionRef = useRef({ x: -1, y: -1 })
    const [mapPlots, setMapPlots] = useState<MapPlotType[]>([])

    const { mouseRef, onWheel, onMouseMove, onClick, onTouch, onKeyDown, onKeyUp } = useCanvasController(
        canvasRef.current,
        startPositionRef.current
    )

    const renderPlots = (ctx: CanvasRenderingContext2D, { x, y }: Position2D) => {
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

        renderHoveredPlot(ctx, renderX, renderY + Plot.PLOT_HEIGHT)
    }

    function render(ctx: CanvasRenderingContext2D) {
        drawGrid(ctx, startPositionRef.current)
        renderPlots(ctx, startPositionRef.current)
    }

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
            // const bigs = getBigs([...plots]) // TODO: remove if no need to render not larger image plots
            setMapPlots([spp, ...plots])
        }
        load()
    }, [])

    useEffect(() => {
        if (width === undefined || height === undefined) return

        const { x, y } = getStartPosition(width, height)
        startPositionRef.current = { x, y }
    }, [width, height])

    return (
        <Canvas
            canvasRef={canvasRef}
            onMouseMove={onMouseMove}
            onWheel={onWheel}
            onClick={onClick(handleClickOrTouch)}
            onTouch={onTouch(handleClickOrTouch)}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            attributes={{ width, height }}
        />
    )
}

export default Map
