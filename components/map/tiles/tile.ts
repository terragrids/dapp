export type Position2D = {
    x: number
    y: number
}

export type TilePropsType = {
    mapStartPosition: Position2D
    tileIndex: Position2D
    tileImage: HTMLImageElement
    ctx: CanvasRenderingContext2D
}

export default class Tile {
    // THESE SHOULD BE CHANGED OR SET DYNAMICALLY
    static readonly TILE_WIDTH = 96
    static readonly TILE_HEIGHT = 48

    static readonly TILE_HALF_WIDTH = this.TILE_WIDTH / 2
    static readonly TILE_HALF_HEIGHT = this.TILE_HEIGHT / 2

    static readonly TILE_TYPE_EMPTY = 0

    mapStartPosition: Position2D
    tileIndex: Position2D
    tileImage: HTMLImageElement
    ctx: CanvasRenderingContext2D

    renderPosition: Position2D

    constructor(props: TilePropsType) {
        this.tileImage = props.tileImage
        this.mapStartPosition = props.mapStartPosition
        this.tileIndex = props.tileIndex
        this.renderPosition = this.calculateRenderPosition(props.tileIndex)
        this.ctx = props.ctx
    }

    private calculateRenderPosition(tileIndex: Position2D): Position2D {
        const renderX =
            this.mapStartPosition.x +
            (tileIndex.x - tileIndex.y) * Tile.TILE_HALF_WIDTH
        const renderY =
            this.mapStartPosition.y +
            (tileIndex.x + tileIndex.y) * Tile.TILE_HALF_HEIGHT
        return { x: renderX, y: renderY }
    }

    drawTile(tileHeight: number): void {
        const offsetY = tileHeight - this.tileImage.height
        this.ctx.drawImage(
            this.tileImage,
            this.renderPosition.x,
            this.renderPosition.y + offsetY
        )
        // return this.save()
    }

    save(): void {
        this.ctx.save()
    }
}
