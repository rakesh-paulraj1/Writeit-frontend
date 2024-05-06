import { Appbar } from "../components/Appbar"
import { Profileblog } from "../hooks"
import {useParams} from "react-router-dom";
import {Spinner} from "../components/Spinner";
import { cn } from "../utils/cn"
import { BlogCard } from "../components/BlogCard"
export const User=()=>{
    const {id}=useParams();
    console.log(id);
    const {loading ,pblog }=Profileblog({id:id || ""})
    if (loading || !pblog){
        return <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
            <Appbar />
        
            <div className=" h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className={cn('h-screen grid grid-cols-1 py-10 flex justify-center')}>
            <div className="my-20 w-[40%] md:w-[50%] mt-16 mb-16">
                {pblog.map(pblog => 
                <BlogCard
                    id={pblog.id}
                    authorName={pblog.author.name || "Anonymous"}
                    title={pblog.title}
                    content={pblog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
     

    </div>
}