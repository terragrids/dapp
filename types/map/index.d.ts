type PlotType = {
    id: string
    name: string
    symbol: string
    url: string
    offchainUrl: string
    positionX: number
    positionY: number
    holders: { address: string; amount: number }[]
}

type MapTileType = PlotType & {
    index: number
    image: HTMLImageElement
}
