import { convertToMapPlot } from 'components/map/map-helper'
import { Position2D } from 'components/map/plots/plot'
import { terragridsImageUrl } from 'utils/api-config.js'

export const SPP_SIZE = 3
const SPP_PLOT_COUNT = SPP_SIZE * SPP_SIZE

export const getSppPlots = () => {
    const sppPlots = []
    for (let i = 1; i <= SPP_PLOT_COUNT; i++) {
        const coords = []
        let imgSrc = ''

        switch (i) {
            case 1:
                coords[0] = 0
                coords[1] = 0
                imgSrc = terragridsImageUrl('spp09.png')
                break
            case 2:
                coords[0] = 1
                coords[1] = 0
                imgSrc = terragridsImageUrl('spp06.png')
                break
            case 3:
                coords[0] = 2
                coords[1] = 0
                imgSrc = terragridsImageUrl('spp01.png')
                break
            case 4:
                coords[0] = 0
                coords[1] = 1
                imgSrc = terragridsImageUrl('spp08.png')
                break
            case 5:
                coords[0] = 1
                coords[1] = 1
                imgSrc = terragridsImageUrl('spp05.png')
                break
            case 6:
                coords[0] = 2
                coords[1] = 1
                imgSrc = terragridsImageUrl('spp01.png')
                break
            case 7:
                coords[0] = 0
                coords[1] = 2
                imgSrc = terragridsImageUrl('spp07.png')
                break
            case 8:
                coords[0] = 1
                coords[1] = 2
                imgSrc = terragridsImageUrl('spp04.png')
                break
            case 9:
                coords[0] = 2
                coords[1] = 2
                imgSrc = terragridsImageUrl('spp01.png')
                break
        }

        const sppPlot: PlotType = {
            id: `SOLAR_POWER_PLANT_${i}`,
            name: 'SOLAR POWER PLANT',
            symbol: 'SPP',
            url: '',
            offchainUrl: imgSrc,
            positionX: coords[0],
            positionY: coords[1],
            holders: []
        }

        sppPlots.push(convertToMapPlot(sppPlot))
    }

    return sppPlots
}

export const isSppPosition = (position: Position2D) => {
    return position.x >= 0 && position.x < SPP_SIZE && position.y >= 0 && position.y < SPP_SIZE
}
