import styles from './index.module.scss'
import Canvas from 'components/canvas'
import LoadingSpinner from 'components/loading-spinner.js'
import { useCanvas } from 'hooks/use-canvas'
import { useCanvasController } from 'hooks/use-canvas-controller'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { endpoints } from 'utils/api-config'
import {
    convertToMapPlot,
    drawGrid,
    getPlotPosition,
    getStartPosition,
    getTransformedPoint,
    GRID_SIZE,
    isInsideMap,
    renderHoveredPlot
} from './map-helper'
import Plot, { Position2D } from './plots/plot'
import { strings } from 'strings/en.js'
import { ParagraphMaker } from 'components/paragraph-maker/paragraph-maker'
import { getSppPlots, isSppPosition, SPP_SIZE } from 'components/solar-power-plant/spp-helper'

export type MapProps = {
    width: number | undefined
    height: number | undefined
    onSelectPlot: (plotInfo: MapPlotType) => void
    onSelectEmptyPlot: (position: Position2D) => void
    onSelectSolarPowerPlant: () => void
}

const Map = ({ width, height, onSelectPlot, onSelectEmptyPlot, onSelectSolarPowerPlant }: MapProps) => {
    const [canvasRef, initialScale, renderCanvas] = useCanvas(render, width, height)
    const startPositionRef = useRef({ x: -1, y: -1 })
    const [mapPlots, setMapPlots] = useState<MapPlotType[]>([])
    const [imageLoadingStarted, setImageLoadingStarted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [clickable, setClickable] = useState(false)

    const { mouseRef, onClick, onTouchEnd, onMouseMove, ...rest } = useCanvasController(
        canvasRef.current,
        startPositionRef.current,
        initialScale
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
                plot.draw()
            }
        }

        const { x: mouseX, y: mouseY } = getTransformedPoint(ctx, mouseRef.current.x, mouseRef.current.y)

        if (!isInsideMap(startPositionRef.current, mouseX, mouseY)) return

        const { positionX, positionY } = getPlotPosition(startPositionRef.current, mouseX, mouseY)
        const isSpp = isSppPosition({ x: positionX, y: positionY })

        let renderX, renderY, width, height
        if (isSpp) {
            const offset = SPP_SIZE - 1
            renderX = x - offset * Plot.PLOT_HALF_WIDTH
            renderY = y + offset * Plot.PLOT_HALF_HEIGHT
            width = Plot.PLOT_WIDTH * SPP_SIZE
            height = Plot.PLOT_HEIGHT * SPP_SIZE
        } else {
            renderX = x + (positionX - positionY) * Plot.PLOT_HALF_WIDTH
            renderY = y + (positionX + positionY) * Plot.PLOT_HALF_HEIGHT
            width = Plot.PLOT_WIDTH
            height = Plot.PLOT_HEIGHT
        }

        renderHoveredPlot(ctx, renderX, renderY + Plot.PLOT_HEIGHT, width, height)
    }

    const loadPlotImages = useCallback(
        async (plots: MapPlotType[]) => {
            if (plots.length === 0 || imageLoadingStarted) return
            let loadCount = 0

            plots.forEach(plot => {
                const image = new Image()
                image.addEventListener('load', () => {
                    loadCount++
                    if (loadCount === plots.length) {
                        // All plot images have been loaded, render them on canvas
                        renderCanvas()
                        setLoading(false)
                    }
                })
                image.src = plot.image.src
            })

            setImageLoadingStarted(true)
        },
        [renderCanvas, imageLoadingStarted]
    )

    function render(ctx: CanvasRenderingContext2D) {
        drawGrid(ctx, startPositionRef.current)
        renderPlots(ctx, startPositionRef.current)
    }

    const handleClickOrTouch = (positionX: number, positionY: number) => {
        const index = positionY * GRID_SIZE + positionX
        const target = mapPlots.find(el => el.index === index)

        if (!target) {
            onSelectEmptyPlot({ x: positionX, y: positionY } as Position2D)
            return
        }

        if (isSppPosition({ x: positionX, y: positionY })) {
            onSelectSolarPowerPlant()
        } else if (index < GRID_SIZE * GRID_SIZE) {
            onSelectPlot(target)
        }
    }
    const handleMouseMove = (positionX: number, positionY: number) => {
        const index = positionY * GRID_SIZE + positionX
        const target = mapPlots.find(el => el.index === index)

        if (target) {
            if (!clickable) setClickable(true)
        } else {
            if (clickable) setClickable(false)
        }
    }

    useEffect(() => {
        const load = async () => {
            const res = await fetch(endpoints.terralands())
            if (!res.ok) {
                setError(strings.errorFetchingMap)
                setLoading(false)
                return
            }

            const { assets } = await res.json()

            const plots = assets.map((asset: PlotType) => convertToMapPlot(asset))

            const spp = getSppPlots()
            // const bigs = getBigs([...plots]) // TODO: remove if no need to render not larger image plots

            const allPlots = [...spp, ...plots]
            setMapPlots(allPlots)
            loadPlotImages(allPlots)
        }
        mapPlots.length === 0 && load()
    }, [loadPlotImages, mapPlots.length])

    useEffect(() => {
        if (width === undefined || height === undefined) return

        const { x, y } = getStartPosition(width, height)
        startPositionRef.current = { x, y }
    }, [width, height])

    return (
        <>
            {loading && (
                <div className={styles.loading}>
                    <LoadingSpinner />
                </div>
            )}
            {error && (
                <div className={styles.error}>
                    <ParagraphMaker text={error} />
                </div>
            )}
            {!loading && !error && (
                <Canvas
                    canvasRef={canvasRef}
                    onClick={onClick(handleClickOrTouch)}
                    onTouchEnd={onTouchEnd(handleClickOrTouch)}
                    onMouseMove={onMouseMove(handleMouseMove)}
                    attributes={{ width, height }}
                    clickable={clickable}
                    {...rest}
                />
            )}
        </>
    )
}

export default Map
