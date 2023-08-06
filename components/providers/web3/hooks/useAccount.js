import { useEffect } from "react"
import useSWR from "swr"

export const handler = (web3, provider) => () => {
    const adminAddresses = {
        '0x596b84ea91292366ff45d83cc0a323eb11cc622485067410c0a341f36c362e33': true
    }

    const { data, mutate, ...swrRes } = useSWR(() => 
        web3 ? 'web/accounts' : null ,
        async () => {
            const accounts = await web3.eth.getAccounts()
            const account = accounts[0]

            if (!account) {
                throw new Error('Cannot retrieve account. Please refresh the browser.')
            }

            return account
        }
    )

    useEffect(() => {
        
        const mutator = accounts => mutate(accounts[0] ?? null)
        provider?.on('accountsChanged', mutator)

        // console.log(provider)

        return () => {
            provider?.removeListener('accountChanged', mutator)
        }
    }, [provider])

return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate, 
        ...swrRes 
    }
}