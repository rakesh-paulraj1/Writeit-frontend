import React from 'react';
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Link } from "react-router-dom";

interface BlogProps {
    blog: Blog;
}

export const FullBlog: React.FC<BlogProps> = ({ blog }) => {
    console.log(blog.author.id);
    return (
        <div className="h-screen w-full bg-dot-white/[0.2] relative bg-black/[0.98] overflow-auto">
            <Appbar />
            <div className="pt-16 flex justify-center overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 px-4 md:px-10 w-full max-w-screen-xl pt-12 gap-4 ">
                    <div className=" col-span-1 md:col-span-8 text-white prose prose-invert bg-neutral-900 p-6 pb-10 rounded-lg">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            {blog.author.name}
                        </div>
                        <div className="pt-4">
                            {blog.content && (
                                <div className="pt-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
                            )}
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <Link to={`/user/${blog.author.id}`}>
                            <div className="text-white bg-neutral-900 p-5 rounded-lg shadow-xl">
                                <div className="text-2xl md:text-4xl pb-5">
                                    Author
                                </div>
                                <div className="flex items-center">
                                    <div className="w-5 h-5 p-4 mr-4 text-black text-lg md:text-xl flex justify-center items-center bg-white rounded-full">
                                        {blog.author.name.toUpperCase()[0]}
                                    </div>
                                    <div className="text-lg md:text-xl mr-2">
                                        {blog.author.name}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
