import Canvas from 'components/canvas'
import React, { useEffect, useRef, useState } from 'react'
import variables from './index.module.scss'
import { endpoints } from 'utils/api-config'
import { convertToMapPlot, getSppPlot, GRID_SIZE } from './map-helper'
import Plot from './plots/plot'

export type MapProps = {
    width: number | undefined
    height: number | undefined
    headerHeight: number | undefined
    onSelectPlot: (plotInfo: MapPlotType) => void
}

// TO LOCK THE SIZE OF THE MAP TO 1x
// const DEFAULT_MAP_SCALE = 1
// const ZOOM_SENSITIVITY = 0.0001
// const MAX_SCALE = 2
// const MIN_SCALE = 0.8

// Set temporarily (Should be changed once the requirements for UI/UX are all determined)
const DEFAULT_DELTA_X = 1
const HORIZONTAL_SCROLL_SENSITIVITY = 0.05

// TODO: FIGURE OUT HOW THIS IS DETERMINED
const MAGIC_NUMBER_TO_ADJUST = 80

const Map = ({ width, height, headerHeight, onSelectPlot }: MapProps) => {
    const mouseRef = useRef({ x: -1, y: -1 })
    const startPositionRef = useRef({ x: -1, y: -1 })
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

        const { e: xPos, f: yPos } = ctx.getTransform()

        const mouse_x = mouseRef.current.x - x - xPos
        const mouse_y = mouseRef.current.y - y - yPos

        const hoverPlotX = Math.floor(mouse_y / Plot.PLOT_HEIGHT + mouse_x / Plot.PLOT_WIDTH) - 1
        const hoverPlotY = Math.floor(-mouse_x / Plot.PLOT_WIDTH + mouse_y / Plot.PLOT_HEIGHT)

        if (hoverPlotX >= 0 && hoverPlotY >= 0 && hoverPlotX < GRID_SIZE && hoverPlotY < GRID_SIZE) {
            const renderX = x + (hoverPlotX - hoverPlotY) * Plot.PLOT_HALF_WIDTH
            const renderY = y + (hoverPlotX + hoverPlotY) * Plot.PLOT_HALF_HEIGHT

            renderPlotHover(ctx)(renderX, renderY + Plot.PLOT_HEIGHT)
        }
    }

    const render = (ctx: CanvasRenderingContext2D) => {
        if (!width || !height) return

        const offsetX = Plot.PLOT_WIDTH / 2
        const offsetY = Plot.PLOT_HEIGHT

        const remainingHeight = height - Plot.PLOT_HEIGHT * GRID_SIZE

        const plotStartX = width / 2 - offsetX
        // MAGIC_NUMBER_TO_ADJUST is to adjust position when calling plot.drawplot()
        const plotStartY = remainingHeight / 2 + offsetY - MAGIC_NUMBER_TO_ADJUST

        startPositionRef.current = { x: plotStartX, y: plotStartY }

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        renderPlots(ctx)(plotStartX, plotStartY)
    }

    // TO LOCK THE SIZE OF THE MAP TO 1x
    // const onScrollY = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
    //     const currentScale = ctx.getTransform().a
    //     const zoomAmount = e.deltaY * ZOOM_SENSITIVITY

    //     // When reaching MAX_SCALE, it only allows zoom OUT (= negative zoomAmount)
    //     // When reaching MIN_SCALE, it only allows zoom IN (= positive zoomAmount)
    //     if (currentScale >= MAX_SCALE && zoomAmount > 0) return
    //     if (currentScale <= MIN_SCALE && zoomAmount < 0) return

    //     const scale = DEFAULT_MAP_SCALE + zoomAmount

    //     ctx.translate(e.offsetX, e.offsetY)
    //     ctx.scale(scale, scale)
    //     ctx.translate(-e.offsetX, -e.offsetY)
    // }

    const onScrollX = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
        const moveAmount = DEFAULT_DELTA_X * e.deltaX * HORIZONTAL_SCROLL_SENSITIVITY

        // Only allows x axis move
        ctx.translate(moveAmount, 0)
    }

    const onWheel = (ctx: CanvasRenderingContext2D, e: WheelEvent) => {
        // TO LOCK THE SIZE OF THE MAP TO 1x
        // onScrollY(ctx, e)
        onScrollX(ctx, e)
    }

    const onMouseMove = (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        const rect = ctx.canvas.getBoundingClientRect()

        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }

    const onClick = (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        if (headerHeight === undefined) return

        const { e: xPos, f: yPos } = ctx.getTransform()

        const mouse_x = e.clientX - startPositionRef.current.x - xPos
        const mouse_y = e.clientY - startPositionRef.current.y - yPos - headerHeight

        const hoverPlotX = Math.floor(mouse_y / Plot.PLOT_HEIGHT + mouse_x / Plot.PLOT_WIDTH) - 1
        const hoverPlotY = Math.floor(-mouse_x / Plot.PLOT_WIDTH + mouse_y / Plot.PLOT_HEIGHT)

        if (hoverPlotX >= 0 && hoverPlotY >= 0 && hoverPlotX < GRID_SIZE && hoverPlotY < GRID_SIZE) {
            const index = hoverPlotY * GRID_SIZE + hoverPlotX
            const target = mapPlots.find(el => el.index === index)

            if (!target) return

            if (index === 0) {
                // TODO onSelectSolarPowerPlant()
            }
            else if (index < GRID_SIZE * GRID_SIZE) {
                onSelectPlot(target)
            }
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

    return (
        <Canvas
            drawOnCanvas={render}
            onWheel={onWheel}
            onMouseMove={onMouseMove}
            onClick={onClick}
            attributes={{ width, height }}
        />
    )
}

export default Map
