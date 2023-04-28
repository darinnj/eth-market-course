import { useWeb3 } from "@components/providers"
import Link from "next/link"
import { ActiveLink, Button } from "@components/ui/common"
import { useAccount } from "@/components/hooks/web3"
import { useRouter } from "next/router"

function Navbar() {
    const { connect, isLoading, requireInstall } = useWeb3()
    const { account } = useAccount()//returns a web3 function
    const { pathname } = useRouter()

    return (
        <section>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav className="relative" aria-label="Global">
                    <div className="flex justify-between items-center">
                        <div>
                            <ActiveLink href="/" legacyBehavior>
                                <a className="font-medium mr-8 hover:text-gray-900">
                                    Home
                                </a>
                            </ActiveLink>
                            <ActiveLink href="/marketplace" legacyBehavior>
                                <a className="font-medium mr-8 hover:text-gray-900">
                                    Marketplace
                                </a>
                            </ActiveLink>
                            <ActiveLink href="/blogs" legacyBehavior>
                                <a className="font-medium mr-8 hover:text-gray-900">
                                    Blog
                                </a>
                            </ActiveLink>
                        </div>
                        <div className="mb-4 flex justify-end">
                            <div>
                                <Link href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Wishlist</Link>

                                { isLoading ? 
                                    <Button
                                        disabled={true}
                                        onClick={connect}>Loading...
                                    </Button> : 
                                    account.data ?
                                    <Button 
                                        className="cursor-default"
                                        hoverable={false}>
                                            Hi There {account.isAdmin && "Admin"} 
                                    </Button>:
                                    requireInstall ?
                                    <Button
                                        onClick={() => { window.open('https://www.metamask.io/download.html', '_blank')}}>
                                                Install MetaMask
                                    </Button> :
                                    <Button
                                        onClick={connect}>Connect
                                    </Button>
                                }
                            </div>
  
                        </div>
                    </div>
                </nav>
            </div>
            
            { account.data &&
                !pathname.includes("/marketplace") &&
                <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
                    <div className="text-white bg-indigo-600 rounded-md p-2">
                        {account.data}
                    </div>
                </div>
            }
           
        </section>
    );
}

export default Navbar;