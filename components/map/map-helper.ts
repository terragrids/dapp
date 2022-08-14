import Plot, { Position2D } from './plots/plot'
// TODO: should change image once design for SPP is ready
import SPP from 'public/images/map-tile-strip-lake.png'
import variables from './index.module.scss'

export const MINIMUM_MAP_SCALE = 1 / 2 // half of the original size
export const BASE_SCREEN_SIZE = Number(variables.screenMedium.replace('px', ''))

export const GRID_SIZE = 10 // Math.sqrt of plotMap length (=100)
export const ORIGINAL_MAP_WIDTH = Plot.PLOT_WIDTH * GRID_SIZE

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

export const getOptimalScale = (canvasWidth: number) => {
    return Math.max(Math.min(canvasWidth / BASE_SCREEN_SIZE, 1), MINIMUM_MAP_SCALE)
}

export const getStartPosition = (canvasWidth: number, canvasHeight: number) => {
    const halfCanvasWidth = canvasWidth / 2

    const offsetX = Plot.PLOT_WIDTH / 2
    const offsetY = Plot.PLOT_HEIGHT

    const remainingHeight = canvasHeight - Plot.PLOT_HEIGHT * GRID_SIZE

    const scale = getOptimalScale(canvasWidth)
    const x = halfCanvasWidth / scale - offsetX
    // MAGIC_NUMBER_TO_ADJUST is to adjust position when calling plot.drawplot()
    const y = remainingHeight / 2 + offsetY - MAGIC_NUMBER_TO_ADJUST

    return { x, y }
}

/**
 *
 * @param inputX mouse/touch input position x (ie. clientX)
 * @param inputY mouse/touch input position x (ie. clientY)
 * @returns positionX, positionY: plot position x, y axis
 */
export const getPlotPosition = (inputX: number, inputY: number): { positionX: number; positionY: number } => {
    const positionX = Math.floor(inputY / Plot.PLOT_HEIGHT + inputX / Plot.PLOT_WIDTH) - 1
    const positionY = Math.floor(-inputX / Plot.PLOT_WIDTH + inputY / Plot.PLOT_HEIGHT)

    return { positionX, positionY }
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
    context.strokeStyle = '#3a3a3a'
    context.stroke()
}
