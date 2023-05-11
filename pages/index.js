import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { strings } from '../strings/en'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { NftMintDialog } from 'components/nft-mint-dialog'
import Map from 'components/map'
import { UserContext } from 'context/user-context'
import CreatePlaceDialog from 'components/place/create-place-dialog'
import PlacesDialog from 'components/place/places-dialog'
import NftListDialog from 'components/nft/nft-list-dialog'
import PlaceDetailsDialog from 'components/place/place-details-dialog'

export default function Home() {
    const user = useContext(UserContext)
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [assetsVisible, setAssetsVisible] = useState(false)
    const [placeDetailsVisible, setPlaceDetailsVisible] = useState(false)
    const [placesDialog, setPlacesDialog] = useState({ visible: false, filterByUser: false })
    const [newPlacePosition, setNewPlacePosition] = useState(null)
    const [selectedPlot, setSelectedPlot] = useState()
    const [mapSize, setMapSize] = useState({
        width: undefined,
        height: undefined
    })
    const [mapRefreshCounter, setMapRefreshCounter] = useState(0)
    const headerRef = useRef()

    useEffect(() => {
        const handleResize = () => {
            setMapSize({
                width: window.innerWidth,
                height: window.innerHeight - headerRef.current.clientHeight
            })
        }
        setMapSize({
            width: window.innerWidth,
            height: window.innerHeight - headerRef.current.clientHeight
        })
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const onSelectPlot = plot => {
        setSelectedPlot(plot)
        setPlaceDetailsVisible(true)
    }

    const onSelectEmptyPlot = plot => {
        setNewPlacePosition({ x: plot.x, y: plot.y })
    }

    function onMint() {
        setNftMintVisible(true)
    }

    function onOpenAssets() {
        setAssetsVisible(true)
    }

    function onOpenAllPlaces() {
        setPlacesDialog({ visible: true })
    }

    function onOpenMyPlaces() {
        setPlacesDialog({ visible: true, filterByUser: true })
    }

    function onConnectWallet() {
        setWalletPickerVisible(true)
    }

    async function onDisconnectWallet() {
        try {
            if (window.algorand && window.algorand.disconnect) await window.algorand.disconnect()
            if (user.authenticated) user.disconnect()
        } catch (e) {}
    }

    function onCreateNewPlaceDone() {
        setNewPlacePosition(null)
        setMapRefreshCounter(mapRefreshCounter + 1)
    }

    function onUpdatePlaceDone() {
        setMapRefreshCounter(mapRefreshCounter + 1)
    }

    return (
        <Layout
            headerRef={headerRef}
            onConnectWallet={onConnectWallet}
            onDisconnectWallet={onDisconnectWallet}
            onMint={onMint}
            onOpenAssets={onOpenAssets}
            onOpenAllPlaces={onOpenAllPlaces}
            onOpenMyPlaces={onOpenMyPlaces}>
            <Head>
                <title>{strings.siteTitle}</title>
            </Head>

            <Map
                width={mapSize.width}
                height={mapSize.height}
                refreshCounter={mapRefreshCounter}
                onSelectPlot={onSelectPlot}
                onSelectEmptyPlot={onSelectEmptyPlot}
            />

            <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
            <NftMintDialog visible={nftMintVisible} onClose={() => setNftMintVisible(false)} />
            <PlacesDialog
                visible={placesDialog.visible}
                filterByUser={placesDialog.filterByUser}
                onUpdate={onUpdatePlaceDone}
                onClose={() => setPlacesDialog({ visible: false })}
            />
            <PlaceDetailsDialog
                visible={placeDetailsVisible}
                id={selectedPlot ? selectedPlot.id : null}
                name={selectedPlot ? selectedPlot.name : null}
                onUpdate={onUpdatePlaceDone}
                onClose={() => setPlaceDetailsVisible(false)}
            />
            <CreatePlaceDialog
                visible={!!newPlacePosition}
                position={newPlacePosition}
                onCreate={onCreateNewPlaceDone}
                onClose={() => setNewPlacePosition(null)}
            />
            <NftListDialog visible={assetsVisible} onClose={() => setAssetsVisible(false)} />
        </Layout>
    )
}
