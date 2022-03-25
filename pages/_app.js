import '../styles/global.scss'
import { UserContext } from '../context/user-context'
import { useUser } from '../hooks/use-user'

export default function App({ Component, pageProps }) {
    const user = useUser()
    return (
        <UserContext.Provider value={user}>
            <Component {...pageProps} />
        </UserContext.Provider>
    )
}
