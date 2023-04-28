import ActiveLink from "@components/ui/common/link";

function Breadcrumbs({items}) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
                {
                    items.map((item, i) => 
                        <li key={item.href} className={`${i == 0 ? "pr-4" : "px-5"} font-medium text-gray-500 hover:text-gray-900`}>
                            <ActiveLink href={item.href} legacyBehavior>
                                <a>{item.value}</a>
                            </ActiveLink>
                            
                        </li>
                    )
                }
            </ol>
        </nav>
    );
}

export default Breadcrumbs;