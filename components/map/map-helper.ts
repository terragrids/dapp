import Plot, { Position2D } from './plots/plot'
// TODO: should change image once design for SPP is ready
import SPP from 'public/images/map-tile-strip-lake.png'

export const GRID_SIZE = 10 // Math.sqrt of plotMap length (=100)
// TODO: FIGURE OUT HOW THIS IS DETERMINED
export const MAGIC_NUMBER_TO_ADJUST = 80

export const SOLAR_POWER_PLANT: PlotType = {
    id: 'SOLAR_POWER_PLANT',
    name: 'SOLAR POWER PLANT',
    symbol: 'TRCL',
    url: '',
    offchainUrl: SPP.src,
    positionX: 0,
    positionY: 0,
    holders: []
}

export const getSppPlot = () => {
    return convertToMapPlot(SOLAR_POWER_PLANT)
}
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

export const getStartPosition = (canvasWidth: number, canvasHeight: number) => {
    const offsetX = Plot.PLOT_WIDTH / 2
    const offsetY = Plot.PLOT_HEIGHT

    const remainingHeight = canvasHeight - Plot.PLOT_HEIGHT * GRID_SIZE

    const x = canvasWidth / 2 - offsetX
    // MAGIC_NUMBER_TO_ADJUST is to adjust position when calling plot.drawplot()
    const y = remainingHeight / 2 + offsetY - MAGIC_NUMBER_TO_ADJUST

    return { x, y }
}
