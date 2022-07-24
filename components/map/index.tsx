import Canvas from 'components/canvas'
import React from 'react'
import { getTileImages } from './tiles/get-tile-images'
import Tile from './tiles/tile'

export type MapProps = {
    width: number | undefined
    height: number | undefined
}

const Map = ({ width, height }: MapProps) => {
    // This shows which tile image should be displayed(index of TILE_TEXTURES fetched by getTileImages())
    const tileMap = [
        14, 23, 23, 23, 23, 23, 23, 23, 23, 13, 21, 32, 33, 33, 28, 33, 33, 33,
        31, 20, 21, 34, 9, 9, 34, 1, 1, 1, 34, 20, 21, 34, 4, 4, 34, 1, 1, 10,
        34, 20, 21, 25, 33, 33, 24, 33, 33, 33, 27, 20, 21, 34, 4, 7, 34, 18,
        17, 10, 34, 20, 21, 34, 6, 8, 34, 16, 19, 10, 34, 20, 21, 34, 1, 1, 34,
        10, 10, 10, 34, 20, 21, 29, 33, 33, 26, 33, 33, 33, 30, 20, 11, 22, 22,
        22, 22, 22, 22, 22, 22, 12
    ]

    const renderTiles =
        (ctx: CanvasRenderingContext2D) => (x: number, y: number) => {
            const gridSize = Math.sqrt(tileMap.length)

            const images = getTileImages()
            for (let tileX = 0; tileX < gridSize; ++tileX) {
                for (let tileY = 0; tileY < gridSize; ++tileY) {
                    const imageIndex = tileMap[tileY * gridSize + tileX]

                    const tile: Tile = new Tile({
                        tileImage: images[imageIndex],
                        mapStartPosition: { ...{ x, y } },
                        tileIndex: { x: tileX, y: tileY },
                        ctx
                    })
                    tile.drawTile(100)
                }
            }
        }

    const render = (ctx: CanvasRenderingContext2D) => {
        if (!width || !height) return

        const tileStartX = width / 2 - 50
        const tileStartY = height / 2 - 250
        // Can remove below ctx method calls
        ctx.fillStyle = '#151d26'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

        renderTiles(ctx)(tileStartX, tileStartY)
    }

    return <Canvas drawOnCanvas={render} attributes={{ width, height }} />
}

export default Map
