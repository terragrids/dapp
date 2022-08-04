import { Position2D } from './tiles/tile'

export const GRID_SIZE = 10 // Math.sqrt of tileMap length (=100)

export const positionToIndex = (position: Position2D) => {
    return position.y * GRID_SIZE + position.x
}

export const convertToTileMap = ({ position, offchainUrl, ...rest }: PlotType): MapTileType => {
    const [x, y] = position.split(',')
    const image = new Image()
    image.src = offchainUrl
    return {
        ...rest,
        position,
        offchainUrl,
        coord: {
            x: Number(x),
            y: Number(y)
        },
        index: positionToIndex({ x: Number(x), y: Number(y) }),
        image
    }
}
