import '../styles/global.scss'
import { UserContext } from '../context/user-context'
import { ReachContext } from '../context/reach-context.ts'
import { useUser } from '../hooks/use-user'
import { useReach } from '../hooks/use-reach'

export default function App({ Component, pageProps }) {
    const reach = useReach()
    const user = useUser()

    return (
        <ReachContext.Provider value={reach}>
            <UserContext.Provider value={user}>
                <Component {...pageProps} />
            </UserContext.Provider>
        </ReachContext.Provider>
    )
}
