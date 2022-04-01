import Head from 'next/head'
import { useState, useContext } from 'react'
import { strings } from '../strings/en'
import Content from '../components/content'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export default function Home() {
  const [walletPickerVisible, setWalletPickerVisible] = useState(false)
  const [contractState, setContractState] = useState({})
  const { backend, stdlib } = useContext(ReachContext)
  const { walletAccount } = useContext(UserContext)

  async function onCreateClicked() {
    const contract = walletAccount.contract(backend)
    const id = stdlib.randomUInt()
    await contract.p.Creator({
      getId: () => id
    })

    const ctcInfoStr = JSON.stringify(await ctc.getInfo(), null, 2)

    setContractState({
      nftId: id,
      info: ctcInfoStr
    })
  }

  return (
    <Layout
      onConnectWalletClicked={() => setWalletPickerVisible(true)}
      onCreateClicked={onCreateClicked}>
      <Head>
        <title>{strings.siteTitle}</title>
      </Head>

      <Content
        nftId={contractState.nftId}
        contractInfo={contractState.info} />

      <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
    </Layout>
  )
}
