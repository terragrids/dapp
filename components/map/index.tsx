import Canvas from 'components/canvas'
import React, { useEffect, useRef, useState } from 'react'
import Tile from './tiles/tile'
import variables from './index.module.scss'
import { endpoints } from 'utils/api-config'
import { convertToTileMap, GRID_SIZE } from './map-helper'

export type TileInfo = {
    xCoord: number
    yCoord: number
    index: number
    imageUrl: string
}

export type MapProps = {
    width: number | undefined
    height: number | undefined
    headerHeight: number | undefined
    onSelectTile: (tileInfo: TileMapType) => void
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

const Map = ({ width, height, headerHeight, onSelectTile }: MapProps) => {
    const mouseRef = useRef({ x: -1, y: -1 })
    const startPositionRef = useRef({ x: -1, y: -1 })
    const [tileMaps, setTileMaps] = useState<TileMapType[]>([])

    const renderTileHover = (ctx: CanvasRenderingContext2D) => (x: number, y: number) => {
        ctx.beginPath()
        ctx.setLineDash([])
        ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)'
        ctx.fillStyle = 'rgba(192, 57, 43, 0.4)'
        ctx.lineWidth = 2
        ctx.moveTo(x, y)
        ctx.lineTo(x + Tile.TILE_WIDTH / 2, y - Tile.TILE_HEIGHT / 2)
        ctx.lineTo(x + Tile.TILE_WIDTH, y)
        ctx.lineTo(x + Tile.TILE_WIDTH / 2, y + Tile.TILE_HEIGHT / 2)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fill()
    }

    const renderTiles = (ctx: CanvasRenderingContext2D) => (x: number, y: number) => {
        if (tileMaps.length === 0) return

        for (let tileX = 0; tileX < GRID_SIZE; ++tileX) {
            for (let tileY = 0; tileY < GRID_SIZE; ++tileY) {
                const index = (tileY * GRID_SIZE + tileX) % 14
                const target = tileMaps.find(el => el.index === index)
                if (!target) continue

                const tile: Tile = new Tile({
                    tileImage: target.image,
                    mapStartPosition: { ...{ x, y } },
                    tileIndex: { x: tileX, y: tileY },
                    ctx
                })
                tile.drawTile(MAGIC_NUMBER_TO_ADJUST)
            }
        }

        const { e: xPos, f: yPos } = ctx.getTransform()

        const mouse_x = mouseRef.current.x - x - xPos
        const mouse_y = mouseRef.current.y - y - yPos

        const hoverTileX = Math.floor(mouse_y / Tile.TILE_HEIGHT + mouse_x / Tile.TILE_WIDTH) - 1
        const hoverTileY = Math.floor(-mouse_x / Tile.TILE_WIDTH + mouse_y / Tile.TILE_HEIGHT)

        if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < GRID_SIZE && hoverTileY < GRID_SIZE) {
            const renderX = x + (hoverTileX - hoverTileY) * Tile.TILE_HALF_WIDTH
            const renderY = y + (hoverTileX + hoverTileY) * Tile.TILE_HALF_HEIGHT

            renderTileHover(ctx)(renderX, renderY + Tile.TILE_HEIGHT)
        }
    }

    const renderBackground = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = variables.backgroundColor
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    const render = (ctx: CanvasRenderingContext2D) => {
        if (!width || !height) return

        const offsetX = Tile.TILE_WIDTH / 2
        const offsetY = Tile.TILE_HEIGHT

        const remainingHeight = height - Tile.TILE_HEIGHT * GRID_SIZE

        const tileStartX = width / 2 - offsetX
        // MAGIC_NUMBER_TO_ADJUST is to adjust position when calling Tile.drawTile()
        const tileStartY = remainingHeight / 2 + offsetY - MAGIC_NUMBER_TO_ADJUST

        startPositionRef.current = { x: tileStartX, y: tileStartY }

        renderBackground(ctx)

        renderTiles(ctx)(tileStartX, tileStartY)
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

        const hoverTileX = Math.floor(mouse_y / Tile.TILE_HEIGHT + mouse_x / Tile.TILE_WIDTH) - 1
        const hoverTileY = Math.floor(-mouse_x / Tile.TILE_WIDTH + mouse_y / Tile.TILE_HEIGHT)

        if (hoverTileX >= 0 && hoverTileY >= 0 && hoverTileX < GRID_SIZE && hoverTileY < GRID_SIZE) {
            const tileIndex = hoverTileY * GRID_SIZE + hoverTileX
            const target = tileMaps.find(el => el.index === tileIndex)

            if (!target) return

            if (tileIndex < tileMaps.length) {
                onSelectTile(target)
            }
        }
    }

    useEffect(() => {
        const load = async () => {
            // 'trld' shoule be changed dynamically?
            const res = await fetch(endpoints.plots('trld'))
            if (!res.ok) return

            const { assets } = await res.json()

            const maps = assets.map((asset: PlotType) => convertToTileMap(asset))
            setTileMaps(maps)
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
