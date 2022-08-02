import React, { useEffect, useState } from 'react'
import Map, { TileInfo } from 'components/map'
import TileInfoDialog from 'components/map/tiles/tile-info-dialog'

// This component is for development purpose (to see if the map works)
// Should be replaced by another component once the map function is confirmed
const MapPage = () => {
    const [mapSize, setMapSize] = useState<{
        width: number | undefined
        height: number | undefined
    }>({
        width: undefined,
        height: undefined
    })

    const [visible, setVisible] = useState(false)
    const [selectedTile, setSelectedTile] = useState<TileInfo>()

    useEffect(() => {
        const handleResize = () => {
            setMapSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        setMapSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const openTileInfoDialog = () => {
        setVisible(true)
    }
    const closeTileInfoDialog = () => {
        setVisible(false)
    }

    const onSelectTile = (tile: TileInfo) => {
        setSelectedTile(tile)
        openTileInfoDialog()
    }

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <TileInfoDialog
                visible={visible}
                onClose={closeTileInfoDialog}
                tileInfo={selectedTile}
            />
            <Map
                onSelectTile={onSelectTile}
                width={mapSize.width}
                height={mapSize.height}
            />
        </div>
    )
}

export default MapPage
