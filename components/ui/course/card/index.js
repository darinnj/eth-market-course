import Image from "next/legacy/image";
import Link from "next/link";

function Card({course, disable, Footer}) {
    return ( 
        <div 
            className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="flex h-full">
                <div className="flex-1 h-full next-image-wrapper">
                    <Image 
                    className={`object-cover ${disable ? JSON.parse(disable) && "filter grayscale" : ""}`}
                              
                    src={course.coverImage} 
                    layout="responsive"
                    alt={course.title}
                    width="200"
                    height="230"
                        />
                </div>
                <div className="p-8 pb-4 flex-2">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {course.type}
                    </div>
                    <Link 
                        href={`courses/${course.slug}`} 
                        className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                        {course.title}    
                    </Link>
                    <p className="mt-2 text-gray-500">
                        {course.description.substring(0, 70)}...    
                    </p>
                    {Footer &&
                        <Footer/>
                    }
                </div>
            </div>
        </div>
     )
}

export default Card;