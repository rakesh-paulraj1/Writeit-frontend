import { Appbar } from "../components/Appbar";
import { cn } from "../utils/cn";
import { Profileblog } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";

export const Profile=()=>{
    const id=localStorage.getItem('user');
 
    
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
    return <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
        <Appbar />
        <div className={cn('h-screen grid grid-cols-1 py-10 flex justify-center')}>
            <div className="my-20 w-[40%] md:w-[50%] mt-16 mb-16">
           
            {pblog.user.posts.map(post => 
                        <BlogCard
                            id={post.id}
                            authorName={""} 
                            title={post.title}
                            content={post.content}
                            publishedDate={"2nd Feb 2024"} 
                        />
                        
                        
                    )}
            </div>
            <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                    
                </div>
        </div>
     

    </div>
}