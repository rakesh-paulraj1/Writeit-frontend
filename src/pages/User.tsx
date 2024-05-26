import { Appbar } from "../components/Appbar";
import { Profileblog } from "../hooks";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { cn } from "../utils/cn";
import { BlogCard } from "../components/BlogCard";

export const User = () => {
    const { id } = useParams();
    console.log(id);

    const { loading, pblog } = Profileblog({ id: id || "" });
    console.log(pblog);

    if (loading || !pblog) {
        return (
            <div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">
            <Appbar />
            <div className={cn('h-screen grid grid-cols-1 md:grid-cols-4 py-10')}>
                <div className="col-span-1 md:col-span-3 my-20 w-[90%] md:w-[80%] mx-auto">
                    {pblog.user.posts.map(post => 
                        <BlogCard
                            key={post.id} // added key prop to avoid warnings in console
                            id={post.id}
                            authorName={""} 
                            title={post.title}
                            content={post.content}
                        />
                    )}
                </div>
                <div className="col-span-1 my-20 w-[90%] md:w-[80%] mx-auto">
                    <div className="text-white bg-neutral-900 p-5 rounded-lg shadow-xl flex flex-col items-center">
                        <div className="w-5 h-5 p-4 text-black text-lg md:text-xl flex justify-center items-center bg-white rounded-full">
                            {pblog.user.name.toUpperCase()[0]}
                        </div>
                        <div className="text-2xl md:text-4xl mt-4">
                            {pblog.user.name}
                        </div>
                        <div className="flex mt-4 space-x-2">
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
