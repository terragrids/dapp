import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { strings } from '../strings/en'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { NftMintDialog } from 'components/nft-mint-dialog.tsx'
import PlotInfoDialog from 'components/map/plots/plot-info-dialog'
import Map from 'components/map'
import SolarPowerPlantDialog from 'components/solar-power-plant/solar-power-plant-dialog'
import SolarPowerPlantAdminPanel from 'components/solar-power-plant/solar-power-plant-admin-panel'
import { UserContext } from 'context/user-context.js'
import MyProjectsDialog from 'components/projects/my-projects-dialog'

export default function Home() {
    const user = useContext(UserContext)
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [plotInfoVisible, setPlotInfoVisible] = useState(false)
    const [sppVisible, setSppVisible] = useState(false)
    const [sppAdminPanelVisible, setSppAdminPanelVisible] = useState(false)
    const [myProjectsVisible, setMyProjectsVisible] = useState(false)
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

    const onSelectSolarPowerPlant = () => {
        setSppVisible(true)
    }

    function onMint() {
        setNftMintVisible(true)
    }

    function onOpenSppAdminPanel() {
        setSppAdminPanelVisible(true)
    }

    function onOpenMyProjects() {
        setMyProjectsVisible(true)
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
            onOpenSppAdminPanel={onOpenSppAdminPanel}
            onOpenMyProjects={onOpenMyProjects}>
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
            <NftMintDialog visible={nftMintVisible} onClose={() => setNftMintVisible(false)} />
            <PlotInfoDialog
                visible={plotInfoVisible}
                onClose={() => setPlotInfoVisible(false)}
                nftId={selectedPlot ? selectedPlot.id : null}
            />
            <SolarPowerPlantDialog
                visible={sppVisible}
                onClose={openSppAdminPanel => {
                    setSppVisible(false)
                    if (openSppAdminPanel) setSppAdminPanelVisible(true)
                }}
            />
            <SolarPowerPlantAdminPanel visible={sppAdminPanelVisible} onClose={() => setSppAdminPanelVisible(false)} />
            <MyProjectsDialog visible={myProjectsVisible} onClose={() => setMyProjectsVisible(false)} />
        </Layout>
    )
}
