import { useEffect } from "react"
import useSWR from "swr"

export const handler = (web3, provider) => () => {
    const adminAddresses = {
        '0x0222cffd0b577cadf3f77883f5733dba8a9aa52258e335bda4ed9be716527cb7': true
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

        console.log(provider)

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