import { useEventAction } from './use-event-action'

export function useMenuEventHandler() {
    const [onConnectWallet, setConnectWalletAction] = useEventAction()
    const [onMint, setMintAction] = useEventAction()
    const [onPlay, setPlayAction] = useEventAction()

    return {
        onConnectWallet,
        setConnectWalletAction,
        onMint,
        setMintAction,
        onPlay,
        setPlayAction
    }
}