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
  const [balance, setBalance] = useState({})
  const { backend, stdlib } = useContext(ReachContext)
  const { walletAccount } = useContext(UserContext)

  async function onCreateClicked() {
    const fmt = (x) => stdlib.formatCurrency(x, 4)
    const updateBalance = async (token) => {
      const balance = fmt(await stdlib.balanceOf(walletAccount, token))
      setBalance(b => ({ ...b, amount: balance }))
    }

    const contract = walletAccount.contract(backend)

    await contract.p.Creator({
      showContract: async (contract) => {
        setContractState({ info: JSON.stringify(contract, null, 2) })
      },
      getParams: () => ({
        name: 'Terracell', symbol: 'TRCL',
        url: 'https://terragrids.org',
        metadata: 'A basic Terragrids token',
        supply: stdlib.parseCurrency(10),
        amt: stdlib.parseCurrency(1)
      }),
      showTokenAndOptIn: async (token) => {
        const onChainPayload = await walletAccount.tokenMetadata(token)
        setBalance(b => ({ ...b, symbol: onChainPayload.symbol.toString() }))
        await updateBalance(token)
        await walletAccount.tokenAccept(token)
        await updateBalance(token)
      },
      didTransfer: async (token) => {
        await updateBalance(token)
      },
      didPayback: async (token) => {
        await updateBalance(token)
      },
      notifyContractClosure: () => {
        setContractState({ info: null })
      }
    })
  }

  return (
    <Layout
      onConnectWalletClicked={() => setWalletPickerVisible(true)}
      onCreateClicked={onCreateClicked}>
      <Head>
        <title>{strings.siteTitle}</title>
      </Head>

      <Content contractInfo={contractState.info} balance={balance} />

      <WalletPicker visible={walletPickerVisible} onClose={() => setWalletPickerVisible(false)} />
    </Layout>
  )
}
