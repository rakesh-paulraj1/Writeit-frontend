import { Appbar } from "../components/Appbar";
import { cn } from "../utils/cn";
import { Profileblog } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

export const Profile = () => {
    const id = localStorage.getItem('user');
    const { loading, pblog } = Profileblog({ id: id || "" });
   const user =localStorage.getItem('username');
    const handleEditBio = () => {
        // Handle the edit bio action, e.g., open a modal or navigate to an edit page
        console.log("Edit bio button clicked");
    }

    const handleDeleteBio = () => {
        // Handle the delete bio action
        console.log("Delete bio button clicked");
    }

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
                            publishedDate={"2nd Feb 2024"} 
                        />
                    )}
                </div>
                <div className="col-span-1 my-20 w-[90%] md:w-[80%] mx-auto">
                    <div className="text-white bg-neutral-900 p-5 rounded-lg shadow-xl flex flex-col items-center">
                        <div className="w-5 h-5 p-4 text-black text-lg md:text-xl flex justify-center items-center bg-white rounded-full">
                            {user.toUpperCase()[0]}
                        </div>
                        <div className="text-2xl md:text-4xl mt-4">
                            {user}
                        </div>
                        <div className="flex mt-4 space-x-2">
                            <button 
                                onClick={handleEditBio} 
                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                            >
                                Edit Bio
                            </button>
                            <button 
                                onClick={handleDeleteBio} 
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Delete Bio
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
