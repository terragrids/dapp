type PlotType = {
    id: string
    name: string
    symbol: string
    url: string
    offchainUrl: string
    position: string
    holders: { address: string; amount: number }[]
}

type TileMapType = PlotType & { coord: Position2D; index: number; image: HTMLImageElement }