import Head from 'next/head'
import { useState, useContext, useEffect, useCallback } from 'react'
import { strings } from '../strings/en'
import Content from '../components/content'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'
import { MenuEventContext } from '../context/menu-event-context'
import LoadingDialog from '../components/loading-dialog'
import { NftMintDialog } from 'components/nft-mint-dialog.tsx'

export default function Home() {
  const [walletPickerVisible, setWalletPickerVisible] = useState(false)
  const [nftMintVisible, setNftMintVisible] = useState(false)
  const [loading, setLoading] = useState({ visible: false, message: null })
  const { stdlib } = useContext(ReachContext)
  const { walletAccount } = useContext(UserContext)
  const { setConnectWalletAction, setMintAction } = useContext(MenuEventContext)

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
    } catch (e) { }
    setLoading({ visible: false })
  }, [stdlib, walletAccount])

  useEffect(() => {
    setConnectWalletAction(() => setWalletPickerVisible(true))
  }, [setConnectWalletAction])

  useEffect(() => {
    setMintAction(() => setNftMintVisible(true))
  }, [setMintAction, mint])


  return (
    <Layout>
      <Head>
        <title>{strings.siteTitle}</title>
      </Head>

      <Content />

      <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
      <LoadingDialog visible={loading.visible} message={loading.message} />
      <NftMintDialog visible={nftMintVisible} onClose={() => setNftMintVisible(false)} />
    </Layout>
  )
}
