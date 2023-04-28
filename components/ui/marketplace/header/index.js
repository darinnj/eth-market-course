import { Breadcrumbs } from "../../common";
import { EthRates, WalletBar } from "../../web3";

const LINKS = [
    {
        href: "/marketplace",
        value: "Buy"
    },
    {
        href: "/marketplace/courses/owned",
        value: "My Courses"
    },
    {
        href: "/marketplace/courses/manage",
        value: "Manage Course"
    }
]

export default function Header() {
    
    return (
        <div>
            <WalletBar />
            <EthRates />
            <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs items={LINKS}/>
            </div>
        </div>
    )
}