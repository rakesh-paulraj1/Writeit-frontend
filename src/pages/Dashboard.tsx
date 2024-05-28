import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { cn } from "../utils/cn";
const appbarHeight = '4rem';
export const Dashboard = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className=" w-full bg-dot-white/[0.2] relative  bg-black/[0.98]  justify-center overflow-auto">
            <Appbar /> 
            <div className={cn('h-screen grid grid-cols-1 py-10 flex justify-center')}>
            <div className="my-20 w-[40%] md:w-[50%] mt-16 mb-16">
               
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                
            </div>
            </div>
            </div>
       
    }

    return <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
      <div style={{ height: appbarHeight, zIndex: 20 }} className="fixed top-0 left-0 right-0">
                    <Appbar />
                </div>
                
        <div className={cn('h-screen grid grid-cols-1 py-10 flex justify-center')}>
            <div className="col-span-1 md:col-span-3 my-20 w-[90%] md:w-[80%] mx-auto">
            <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                    {"All Blogs"}
                </div>
               <div className={cn("")}> {blogs.map(blog => 
                <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={""}
                />)}
                </div>
            </div>
        </div>
    </div>
}