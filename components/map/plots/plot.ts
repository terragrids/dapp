export type Position2D = {
    x: number
    y: number
}

export type PlotPropsType = {
    mapStartPosition: Position2D
    coord: Position2D
    image: HTMLImageElement
    ctx: CanvasRenderingContext2D
}

export default class Plot {
    static readonly MAX_PLOT_HEIGHT = 114 // 1370px / 12 scaleX (= forest image)
    static readonly PLOT_WIDTH = 96
    static readonly PLOT_HEIGHT = 48

    static readonly PLOT_HALF_WIDTH = this.PLOT_WIDTH / 2
    static readonly PLOT_HALF_HEIGHT = this.PLOT_HEIGHT / 2

    static readonly PLOT_TYPE_EMPTY = 0

    static readonly PLOT_THICKNESS = 5
    static readonly PLOT_HALF_THICKNESS = this.PLOT_THICKNESS / 2

    mapStartPosition: Position2D
    coord: Position2D
    image: HTMLImageElement
    ctx: CanvasRenderingContext2D

    renderPosition: Position2D

    constructor(props: PlotPropsType) {
        this.image = props.image
        this.mapStartPosition = props.mapStartPosition
        this.coord = props.coord
        this.renderPosition = this.calculateRenderPosition(props.coord)
        this.ctx = props.ctx
    }

    private calculateRenderPosition(plotCoord: Position2D): Position2D {
        const renderX =
            this.mapStartPosition.x + (plotCoord.x - plotCoord.y) * Plot.PLOT_HALF_WIDTH - Plot.PLOT_HALF_THICKNESS
        const renderY = this.mapStartPosition.y + (plotCoord.x + plotCoord.y) * Plot.PLOT_HALF_HEIGHT

        return { x: renderX, y: renderY }
    }

    private isLargeImage(): boolean {
        const { scaleX, scaleY } = this.getImageScale()
        return scaleX > 1 && scaleY > 1
    }

    private getImageScale(): { scaleX: number; scaleY: number } {
        const scaleX = Math.floor(this.image.width / Plot.PLOT_WIDTH)
        const scaleY = Math.floor(this.image.height / Plot.PLOT_HEIGHT)
        return { scaleX, scaleY }
    }

    draw(): void {
        const { scaleX } = this.getImageScale()
        // add z axis offset depending on image height
        const offsetZ = Plot.MAX_PLOT_HEIGHT - Math.floor(this.image.height / scaleX) - Plot.PLOT_HALF_HEIGHT

        if (this.isLargeImage()) {
            this.ctx.drawImage(
                this.image,
                this.renderPosition.x,
                this.renderPosition.y + offsetZ,
                this.image.width / scaleX,
                this.image.height / scaleX
            )
        } else {
            this.ctx.drawImage(this.image, this.renderPosition.x, this.renderPosition.y + offsetZ)
        }
    }
}
