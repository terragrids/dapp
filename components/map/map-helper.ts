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

// ref: https://github.com/rtatol/isometric-map/blob/master/js/isomap.js
export const drawGrid = (context: CanvasRenderingContext2D, startPosition: Position2D) => {
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            // calculate coordinates (same as Plot class 'calculateRenderPosition' method)
            const coordX = startPosition.x + (i - j) * Plot.PLOT_HALF_WIDTH + Plot.PLOT_WIDTH
            const coordY = startPosition.y + (i + j) * Plot.PLOT_HALF_HEIGHT + Plot.PLOT_HALF_HEIGHT
            // draw single plot
            drawLine(context, coordX, coordY)
        }
    }
}

export const drawLine = (context: CanvasRenderingContext2D, x: number, y: number) => {
    context.beginPath()
    context.setLineDash([1, 1])

    // move to start point
    context.moveTo(x - Plot.PLOT_WIDTH / 2, y)

    /**
     * create four lines
     * --------------------------------------------
     *    step 1  |  step 2  |  step 3  |  step 4
     * --------------------------------------------
     *    /       |  /       |  /       |  /\
     *            |  \       |  \/      |  \/
     * --------------------------------------------
     */
    context.lineTo(x - Plot.PLOT_WIDTH, y + Plot.PLOT_HEIGHT / 2)
    context.lineTo(x - Plot.PLOT_WIDTH / 2, y + Plot.PLOT_HEIGHT)
    context.lineTo(x, y + Plot.PLOT_HEIGHT / 2)
    context.lineTo(x - Plot.PLOT_WIDTH / 2, y)

    // draw path
    context.strokeStyle = 'gray'
    context.stroke()
}
