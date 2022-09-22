import { useEventAction } from './use-event-action'

export function useMenuEventHandler() {
    const [onConnectWallet, setConnectWalletAction] = useEventAction()
    const [onMint, setMintAction] = useEventAction()
    const [onOpenSppAdminPanel, setOpenSppAdminPanelAction] = useEventAction()
    const [onToggleMenu, setToggleMenuAction] = useEventAction()

    return {
        onConnectWallet,
        setConnectWalletAction,
        onMint,
        setMintAction,
        onOpenSppAdminPanel,
        setOpenSppAdminPanelAction,
        onToggleMenu,
        setToggleMenuAction
    }
}
