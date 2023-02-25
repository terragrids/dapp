import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { strings } from '../strings/en'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { NftMintDialog } from 'components/nft-mint-dialog'
import PlotInfoDialog from 'components/map/plots/plot-info-dialog'
import Map from 'components/map'
import SolarPowerPlantDialog from 'components/solar-power-plant/solar-power-plant-dialog'
import SolarPowerPlantAdminPanel from 'components/solar-power-plant/solar-power-plant-admin-panel'
import { UserContext } from 'context/user-context.js'
import CreateProjectDialog from 'components/projects/create-project-dialog'
import ProjectsDialog from 'components/projects/projects-dialog'
import NftListDialog from 'components/nft/nft-list-dialog'
import ProjectFundraiser from 'components/projects/project-fundraiser'

export default function Home() {
    const user = useContext(UserContext)
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [assetsVisible, setAssetsVisible] = useState(false)
    const [plotInfoVisible, setPlotInfoVisible] = useState(false)
    const [sppVisible, setSppVisible] = useState(false)
    const [sppAdminPanelVisible, setSppAdminPanelVisible] = useState(false)
    const [projectsDialog, setProjectsDialog] = useState({ visible: false, ownerWalletAddress: null })
    const [projectFundraiser, setProjectFundraiser] = useState({ visible: false, project: null, nft: null, plot: null })
    const [createProjectVisible, setCreateProjectVisible] = useState(false)
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
        setProjectFundraiser(fr => ({ ...fr, plot }))
    }

    const onSelectSolarPowerPlant = () => {
        setSppVisible(true)
    }

    function onMint() {
        setNftMintVisible(true)
    }

    function onOpenAssets() {
        setAssetsVisible(true)
    }

    function onOpenSppAdminPanel() {
        setSppAdminPanelVisible(true)
    }

    function onOpenProjects() {
        setProjectsDialog({ visible: true })
    }

    function onOpenMyProjects() {
        setProjectsDialog({ visible: true, ownerWalletAddress: user.walletAddress })
    }

    function onCreateProject() {
        setCreateProjectVisible(true)
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

    function onSupportingProject(project, nft) {
        setProjectsDialog({ visible: false })
        setProjectFundraiser({ visible: true, project, nft })
    }

    return (
        <Layout
            headerRef={headerRef}
            onConnectWallet={onConnectWallet}
            onDisconnectWallet={onDisconnectWallet}
            onMint={onMint}
            onOpenAssets={onOpenAssets}
            onOpenSppAdminPanel={onOpenSppAdminPanel}
            onOpenProjects={onOpenProjects}
            onOpenMyProjects={onOpenMyProjects}
            onCreateProject={onCreateProject}>
            <Head>
                <title>{strings.siteTitle}</title>
            </Head>

            <Map
                width={mapSize.width}
                height={mapSize.height}
                onSelectPlot={onSelectPlot}
                onSelectEmptyPlot={onSelectEmptyPlot}
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
            <ProjectsDialog
                visible={projectsDialog.visible}
                ownerWalletAddress={projectsDialog.ownerWalletAddress}
                onClose={() => setProjectsDialog({ visible: false })}
                onSupportingProject={onSupportingProject}
            />
            <CreateProjectDialog visible={createProjectVisible} onClose={() => setCreateProjectVisible(false)} />
            <NftListDialog visible={assetsVisible} onClose={() => setAssetsVisible(false)} />
            <ProjectFundraiser
                visible={projectFundraiser.visible}
                project={projectFundraiser.project}
                asset={projectFundraiser.nft}
                selectedPlot={projectFundraiser.plot}
                onClose={() => setProjectFundraiser({ visible: false })}
            />
        </Layout>
    )
}
