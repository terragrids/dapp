import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { strings } from '../strings/en'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { NftMintDialog } from 'components/nft-mint-dialog'
import PlotInfoDialog from 'components/map/plots/plot-info-dialog'
import Map from 'components/map'
import { UserContext } from 'context/user-context.js'
import CreatePlaceDialog from 'components/projects/create-place-dialog'
import PlacesDialog from 'components/projects/places-dialog'
import NftListDialog from 'components/nft/nft-list-dialog'

export default function Home() {
    const user = useContext(UserContext)
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [assetsVisible, setAssetsVisible] = useState(false)
    const [plotInfoVisible, setPlotInfoVisible] = useState(false)
    const [placesDialog, setPlacesDialog] = useState({ visible: false, ownerWalletAddress: null })
    const [newPlacePosition, setNewPlacePosition] = useState(null)
    const [selectedPlot, setSelectedPlot] = useState()
    const [mapSize, setMapSize] = useState({
        width: undefined,
        height: undefined
    })
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
        setPlotInfoVisible(true)
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
        setPlacesDialog({ visible: true, ownerWalletAddress: user.walletAddress })
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
                onSelectPlot={onSelectPlot}
                onSelectEmptyPlot={onSelectEmptyPlot}
            />

            <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
            <NftMintDialog visible={nftMintVisible} onClose={() => setNftMintVisible(false)} />
            <PlotInfoDialog
                visible={plotInfoVisible}
                onClose={() => setPlotInfoVisible(false)}
                nftId={selectedPlot ? selectedPlot.id : null}
            />
            <PlacesDialog
                visible={placesDialog.visible}
                ownerWalletAddress={placesDialog.ownerWalletAddress}
                onClose={() => setPlacesDialog({ visible: false })}
            />
            <CreatePlaceDialog
                visible={!!newPlacePosition}
                position={newPlacePosition}
                onClose={() => setNewPlacePosition(null)}
            />
            <NftListDialog visible={assetsVisible} onClose={() => setAssetsVisible(false)} />
        </Layout>
    )
}
