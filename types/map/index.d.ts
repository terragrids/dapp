type PlotType = {
    id: string
    name: string
    symbol: string
    url: string
    offChainImageUrl: string
    positionX: number
    positionY: number
    holders: { address: string; amount: number }[]
}

type MapPlotType = PlotType & {
    index: number
    image: HTMLImageElement
}
