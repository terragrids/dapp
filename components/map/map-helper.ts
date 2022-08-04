import { Position2D } from './tiles/tile'

export const GRID_SIZE = 10 // Math.sqrt of tileMap length (=100)

export const positionToIndex = (position: Position2D) => {
    return position.y * GRID_SIZE + position.x
}

export const convertToTileMap = ({ offchainUrl, positionX, positionY, ...rest }: PlotType): MapTileType => {
    const image = new Image()
    image.src = offchainUrl
    return {
        ...rest,
        offchainUrl,
        positionX,
        positionY,
        index: positionToIndex({ x: positionX, y: positionY }),
        image
    }
}
