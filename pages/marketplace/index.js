import { CourseCard, CourseList } from "@/components/ui/course"
import { BaseLayout } from "@/components/ui/layout"
import { getAllCourses } from "@/content/courses/fetcher"
import { useWalletInfo } from "@/components/hooks/web3"
import { Button } from "@/components/ui/common"
import { OrderModal } from "@/components/ui/order"
import { useState } from "react"
import { MarketHeader } from "@/components/ui/marketplace"

export default function Marketplace({courses}) {
	const [ selectedCourse, setSelectedCourse ] = useState(null)
    const { canPurchaseCourse } = useWalletInfo()

	// console.log('Network:')
	// console.log({network})
	return (
		<>
            {/* {network.data} */}
			{/* { isLoading ? "Loading Web3..." : web3 ?  "Web 3 Ready" : "Please install MetaMask" } */}
            <div className="py-4">
                
				<MarketHeader />

                <CourseList 
                    courses={courses} >
				
				{ course => 
					<CourseCard 
						key={course.id} 
						course={course}
						disable={!canPurchaseCourse}
						Footer={() => 
							<div className="mt-4">
								<Button 
									onClick={() => setSelectedCourse(course)}
									disable={!canPurchaseCourse}
									variant="lightPurple"
								>
									Purchase
								</Button>
							</div>
						}
					/> 
				}

				</CourseList>
				
				{ selectedCourse &&
					<OrderModal 
						course={selectedCourse}
						onClose={() => setSelectedCourse(null)}
				/>}
            </div>
			
		</>
	)
}

export function getStaticProps() {
	const { data } = getAllCourses()
	
	return {
		props: {
			courses: data
		}
	}
}

Marketplace.Layout = BaseLayout