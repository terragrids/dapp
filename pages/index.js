import Head from 'next/head'
import { useState } from 'react'
import { strings } from '../strings/en'
import Content from '../components/content'
import Layout from '../components/layout'
import WalletPicker from '../components/wallet-picker'

export default function Home() {
  const [walletPickerVisible, setWalletPickerVisible] = useState(false)

  return (
    <Layout onConnectWalletClicked={() => setWalletPickerVisible(true)}>
      <Head>
        <title>{strings.siteTitle}</title>
      </Head>
      <Content />
      <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
    </Layout>
  )
}
