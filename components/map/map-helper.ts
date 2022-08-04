import { Position2D } from './plots/plot'

export const GRID_SIZE = 10 // Math.sqrt of plotMap length (=100)

export const positionToIndex = (position: Position2D) => {
    return position.y * GRID_SIZE + position.x
}

export const convertToMapPlot = ({ offchainUrl, positionX, positionY, ...rest }: PlotType): MapPlotType => {
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
