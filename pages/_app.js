import '../styles/global.scss'
import { UserContext } from '../context/user-context'
import { ReachContext } from '../context/reach-context.ts'
import { useUser } from '../hooks/use-user'
import { useReach } from '../hooks/use-reach'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
    const reach = useReach()
    const user = useUser()

    return (
        <ReachContext.Provider value={reach}>
            <UserProvider>
                <UserContext.Provider value={user}>
                    <Component {...pageProps} />
                </UserContext.Provider>
            </UserProvider>
        </ReachContext.Provider>
    )
}
