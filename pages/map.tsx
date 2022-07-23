import React, { useEffect, useState } from 'react'
import Map, { MapProps } from 'components/map'

// This component is for development purpose (to see if the map works)
// Should be replaced by another component once the map function is confirmed
const MapPage = () => {
    const [mapSize, setMapsize] = useState<MapProps>({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setMapsize({
                width: window.innerWidth,
                height: (window.innerHeight / 100) * 70
            })
        }
        setMapsize({
            width: window.innerWidth,
            height: (window.innerHeight / 100) * 70
        })
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div style={{ width: '100vw', height: '70vh' }}>
                <Map {...mapSize} />
            </div>
            <div style={{ width: '100vw', height: '30vh' }}>This is rest</div>
        </div>
    )
}

export default MapPage
