import { useContext, useCallback } from 'react'
import { endpoints } from 'utils/api-config.js'
import { createPromise } from 'utils/promise'
import { ReachContext } from '../context/reach-context'
import { UserContext } from '../context/user-context'

export function useSppDeployer() {
    const { sppBackend } = useContext(ReachContext)
    const { walletAccount } = useContext(UserContext)

    const deploySpp = useCallback(async () => {
        const { promise, succeed, fail } = createPromise()

        try {
            const sppContract = walletAccount.contract(sppBackend)
            sppContract.p.Admin({
                log: () => {
                    /* add logs */
                },
                onReady: async contract => {
                    try {
                        const response = await fetch(endpoints.solarPowerPlant, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            referrerPolicy: 'no-referrer',
                            body: JSON.stringify({
                                contractInfo: Buffer.from(JSON.stringify(contract)).toString('base64')
                            })
                        })
                        if (response.ok) {
                            succeed()
                        } else {
                            fail(new Error(`${response.status} ${response.statusText}`))
                        }
                    } catch (e) {
                        fail(e)
                    }
                }
            })
        } catch (e) {
            fail(e)
        }
        return promise
    }, [sppBackend, walletAccount])

    return { deploySpp }
}
