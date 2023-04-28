import { useEffect } from "react"
import useSWR from "swr"

export const handler = (web3, provider) => () => {
    const adminAddresses = {
        '0x0222cffd0b577cadf3f77883f5733dba8a9aa52258e335bda4ed9be716527cb7': true
    }

    const { data, mutate, ...swrResponse } = useSWR(() => 
        web3 ? 'web/accounts' : null ,
        async () => {
            const accounts = await web3.eth.getAccounts()
            return accounts[0]
        }
    )

    useEffect(() => {
        provider &&
        provider.on('accountsChanged', 
            account => mutate(account[0] ?? null)
        )
    }, [provider])

return {
        data,
        isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
        mutate, 
        ...swrResponse 
    }
}