import { useEffect } from "react"
import useSWR from "swr"

export const handler = (web3, provider) => () => {
    const adminAddresses = {
        '0x788b7fc766d18f6f7e3620f7896be87ac9f9f3fb4776a61e66138f7eae3d8622': true
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