import { useEventAction } from './use-event-action'

export function useMenuEventHandler() {
    const [onConnectWallet, setConnectWalletAction] = useEventAction()
    const [onMint, setMintAction] = useEventAction()
    const [onToggleMenu, setToggleMenuAction] = useEventAction()

    return {
        onConnectWallet,
        setConnectWalletAction,
        onMint,
        setMintAction,
        onToggleMenu,
        setToggleMenuAction
    }
}