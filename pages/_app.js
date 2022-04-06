import '../styles/global.scss'
import { UserContext } from '../context/user-context'
import { ReachContext } from '../context/reach-context'
import { useUser } from '../hooks/use-user'
import { useReach } from '../hooks/use-reach'
import { MenuEventContext } from '../context/menu-event-context'
import { useMenuEventHandler } from '../hooks/use-menu-event-handler'

export default function App({ Component, pageProps }) {
    const reach = useReach()
    const user = useUser()
    const menuEventHandler = useMenuEventHandler()

    return (
        <ReachContext.Provider value={reach}>
            <UserContext.Provider value={user}>
                <MenuEventContext.Provider value={menuEventHandler}>
                    <Component {...pageProps} />
                </MenuEventContext.Provider>
            </UserContext.Provider>
        </ReachContext.Provider>
    )
}
