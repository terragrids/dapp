import Head from 'next/head'
import { useState, useContext, useEffect, useCallback, useRef } from 'react'
import { strings } from '../strings/en'
// import Content from '../components/content'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { MenuEventContext } from '../context/menu-event-context'
import LoadingDialog from '../components/loading-dialog'
import { NftMintDialog } from 'components/nft-mint-dialog.tsx'
import TileInfoDialog from 'components/map/tiles/tile-info-dialog'
import Map from 'components/map'

export default function Home() {
    const [walletPickerVisible, setWalletPickerVisible] = useState(false)
    const [nftMintVisible, setNftMintVisible] = useState(false)
    const [loading, setLoading] = useState({ visible: false, message: null })
    const { stdlib } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)
    const { setConnectWalletAction, setMintAction } =
        useContext(MenuEventContext)

    const headerRef = useRef()
    const [tileInfoVisible, setTileInfoVisible] = useState(false)
    const [selectedTile, setSelectedTile] = useState()
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
            await stdlib.launchToken(
                walletAccount,
                `Terracell #${now}`,
                'TRCL',
                {
                    supply: amount,
                    decimals: 0,
                    url: `https://terragrids.org#${now}`
                }
            )
        } catch (e) {}
        setLoading({ visible: false })
    }, [stdlib, walletAccount])

    const onSelectTile = (tile) => {
        setSelectedTile(tile)
        setTileInfoVisible(true)
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

            {/* <Content /> */}
            <Map
                onSelectTile={onSelectTile}
                width={mapSize.width}
                height={mapSize.height}
                headerHeight={headerRef.current?.clientHeight}
            />

            <WalletPicker
                visible={walletPickerVisible}
                onClose={() => setWalletPickerVisible(false)}
            />
            <LoadingDialog
                visible={loading.visible}
                message={loading.message}
            />
            <NftMintDialog
                visible={nftMintVisible}
                onClose={() => setNftMintVisible(false)}
            />
            <TileInfoDialog
                visible={tileInfoVisible}
                onClose={() => setTileInfoVisible(false)}
                tileInfo={selectedTile}
            />
        </Layout>
    )
}
