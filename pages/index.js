import Head from 'next/head'
import { useState, useContext, useEffect, useCallback, useRef } from 'react'
import { strings } from '../strings/en'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { MenuEventContext } from '../context/menu-event-context'
import LoadingDialog from '../components/loading-dialog'
import { NftMintDialog } from 'components/nft-mint-dialog.tsx'
import PlotInfoDialog from 'components/map/plots/plot-info-dialog'
import Map from 'components/map'
import SolarPowerPlantDialog from 'components/solar-power-plant/solar-power-plant-dialog'

export default function Home() {
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [loading, setLoading] = useState({ visible: false, message: null })
    const { stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const { setConnectWalletAction, setMintAction } = useContext(MenuEventContext)

    const headerRef = useRef()
    const [plotInfoVisible, setPlotInfoVisible] = useState(false)
    const [sppVisible, setSppVisible] = useState(false)
    const [selectedPlot, setSelectedPlot] = useState()
    const [mapSize, setMapSize] = useState({
        width: undefined,
        height: undefined
    })

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

    /**
     * Mints an NFT on Algorand and pins assets to Pinata IPFS.
     */
    const mint = useCallback(async () => {
        const now = new Date().getTime()
        const amount = 1
        setLoading({ visible: true, message: strings.mintingTerracell })
        try {
            await stdlib.launchToken(walletAccount, `Terracell #${now}`, 'TRCL', {
                supply: amount,
                decimals: 0,
                url: `https://terragrids.org#${now}`
            })
        } catch (e) {}
        setLoading({ visible: false })
    }, [stdlib, walletAccount])

    const onSelectPlot = plot => {
        setSelectedPlot(plot)
        setPlotInfoVisible(true)
    }

    const onSelectSolarPowerPlant = () => {
        setSppVisible(true)
    }

    useEffect(() => {
        setConnectWalletAction(() => setWalletPickerVisible(true))
    }, [setConnectWalletAction])

    useEffect(() => {
        setMintAction(() => setNftMintVisible(true))
    }, [setMintAction, mint])

    return (
        <Layout headerRef={headerRef}>
            <Head>
                <title>{strings.siteTitle}</title>
            </Head>

            <Map
                width={mapSize.width}
                height={mapSize.height}
                onSelectPlot={onSelectPlot}
                onSelectSolarPowerPlant={onSelectSolarPowerPlant}
            />

            <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
            <LoadingDialog visible={loading.visible} message={loading.message} />
            <NftMintDialog visible={nftMintVisible} onClose={() => setNftMintVisible(false)} />
            <PlotInfoDialog
                visible={plotInfoVisible}
                onClose={() => setPlotInfoVisible(false)}
                nftId={selectedPlot ? selectedPlot.id : null}
            />
            <SolarPowerPlantDialog visible={sppVisible} onClose={() => setSppVisible(false)} />
        </Layout>
    )
}
