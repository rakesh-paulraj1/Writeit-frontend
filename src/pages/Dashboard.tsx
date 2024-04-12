import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Dashboard = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="h-full w-full bg-dot-white/[0.2] relative  bg-black/[0.98]  justify-center overflow-auto">
            <Appbar /> 
            <div  className="flex justify-center">
                <div className="mt-16">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div className="h-full w-full bg-dot-white/[0.2] relative  bg-black/[0.98] flex flex-col items-center justify-center overflow-auto">
        <Appbar />
        <div className="flex justify-center">
            <div className="mt-16">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}