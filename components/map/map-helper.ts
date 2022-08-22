import Plot, { Position2D } from './plots/plot'
import SPP from 'public/images/sc_terragrids_iso_solar_plant_03_1200px.png'
// TODO: should remove when larger images are fetched from api
import BIG from 'public/images/Selma_Cardoso_Terragrids_illo_square_A_02.png'
import GRASS from 'public/images/grasstile.png'

import variables from './index.module.scss'

export const MINIMUM_MAP_SCALE = 1 / 2 // half of the original size
export const BASE_SCREEN_SIZE = Number(variables.screenMedium.replace('px', ''))

export const GRID_SIZE = 10 // Math.sqrt of plotMap length (=100)
export const ORIGINAL_MAP_WIDTH = Plot.PLOT_WIDTH * GRID_SIZE
export const DEFAULT_MAP_SCALE = 1

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

// TODO: remove below `BIG_PLOT`, `GRASS_PLOT`, `POSITION_ALL`, `getBigs` and `getGrassPlots` when all plots are fetched from API
export const BIG_PLOT: PlotType = {
    id: 'BIG',
    name: 'BIG POWER PLANT',
    symbol: 'TRCL',
    url: '',
    offchainUrl: BIG.src,
    positionX: 3,
    positionY: 2,
    holders: []
}
export const GRASS_PLOT: PlotType = {
    id: 'GRASS',
    name: 'GRASS PLOT',
    symbol: 'TRCL',
    url: '',
    offchainUrl: GRASS.src,
    positionX: 3,
    positionY: 2,
    holders: []
}
const POSITION_ALL: Position2D[][] = [...Array(GRID_SIZE).keys()].map(x => {
    return [...Array(GRID_SIZE).keys()].map(y => ({
        x: x,
        y: y
    }))
})
export const getBigs = (plots: MapPlotType[]): MapPlotType[] => {
    const targets = plots.map(plot => ({ x: plot.positionX, y: plot.positionY }))

    const bigs: PlotType[] = POSITION_ALL.flat()
        .filter(pos => targets.findIndex(t => t.x === pos.x && t.y === pos.y) === -1)
        .map(el => ({
            ...BIG_PLOT,
            positionX: el.x,
            positionY: el.y
        }))
    return bigs.map(big => convertToMapPlot(big))
}
export const getGrassPlots = (): MapPlotType[] => {
    const grassPlots: PlotType[] = POSITION_ALL.flat().map(el => ({
        ...GRASS_PLOT,
        id: `${el.x}${el.y}`,
        positionX: el.x,
        positionY: el.y
    }))
    return grassPlots.map(big => convertToMapPlot(big))
}
// TODO: remove above `BIG_PLOT`, `GRASS_PLOT`, `POSITION_ALL`, `getBigs` and `getGrassPlots` when all plots are fetched from API

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
 * @param startPosition map render reference point
 * @param inputX mouse/touch input position x (ie. clientX)
 * @param inputY mouse/touch input position x (ie. clientY)
 * @returns positionX, positionY: plot position x, y axis
 */
export const getPlotPosition = (
    startPosition: Position2D,
    inputX: number,
    inputY: number
): { positionX: number; positionY: number } => {
    const positionX =
        Math.floor((inputY - startPosition.y) / Plot.PLOT_HEIGHT + (inputX - startPosition.x) / Plot.PLOT_WIDTH) - 1
    const positionY = Math.floor(
        (inputY - startPosition.y) / Plot.PLOT_HEIGHT - (inputX - startPosition.x) / Plot.PLOT_WIDTH
    )

    return { positionX, positionY }
}

/**
 * @dev ref: https://roblouie.com/article/617/transforming-mouse-coordinates-to-canvas-coordinates/
 * @param context canvas context 2d
 * @param inputX mouse/touch input position x (ie. clientX)
 * @param inputY mouse/touch input position y (ie. clientY)
 * @returns {x, y} x and y position of inputX/Y which map scale and position are taken into account
 */
export const getTransformedPoint = (context: CanvasRenderingContext2D, inputX: number, inputY: number) => {
    const transform = context.getTransform()
    const invertedScaleX = DEFAULT_MAP_SCALE / transform.a
    const invertedScaleY = DEFAULT_MAP_SCALE / transform.d

    const transformedX = invertedScaleX * inputX - invertedScaleX * transform.e
    const transformedY = invertedScaleY * inputY - invertedScaleY * transform.f

    return { x: transformedX, y: transformedY }
}

/**
 *
 * @param startPosition map render reference point
 * @param inputX mouse/touch input position x (ie. clientX)
 * @param inputY mouse/touch input position y (ie. clientY)
 * @returns if inputs are inside the map or not
 */
export const isInsideMap = (startPosition: Position2D, inputX: number, inputY: number) => {
    const { positionX, positionY } = getPlotPosition(startPosition, inputX, inputY)

    return positionX >= 0 && positionY >= 0 && positionX < GRID_SIZE && positionY < GRID_SIZE
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

export const renderHoveredPlot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.setLineDash([])
    ctx.strokeStyle = 'rgba(192, 57, 43, 0.8)'
    ctx.fillStyle = 'rgba(192, 57, 43, 0.4)'
    ctx.lineWidth = 2
    ctx.moveTo(x, y)
    ctx.lineTo(x + Plot.PLOT_HALF_WIDTH, y - Plot.PLOT_HALF_HEIGHT)
    ctx.lineTo(x + Plot.PLOT_WIDTH, y)
    ctx.lineTo(x + Plot.PLOT_HALF_WIDTH, y + Plot.PLOT_HALF_HEIGHT)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.fill()
}
