import { useHooks } from "@/components/providers/web3"

const enhanceHook = (swrResponse) => {
    return {
        ...swrResponse,
        hasInitialized: swrResponse.data || swrResponse.error
    }
}

export const useNetwork = () => {
    const swrResponse = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network: swrResponse
    }
}

export const useAccount = () => {
    const swrResponse = enhanceHook(useHooks(hooks => hooks.useAccount)())
    return {
        account: swrResponse
    }
}

export const useOwnedCourses = (...args) => {
    const swrRes = enhanceHook(useHooks(hooks => hooks.useOwnedCourses)(...args))

    return {
        ownedCourses: swrRes
    }
}

export const useWalletInfo = () => {
    const { account } = useAccount()
    const { network } = useNetwork()

    return {
        account,
        network,
        canPurchaseCourse: !!(account.data && network.isSupported)
    }
}