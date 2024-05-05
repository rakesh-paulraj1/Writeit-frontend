import { Blog } from "../hooks"
import { Appbar } from "./Appbar"


export const FullBlog = ({ blog }: {blog: Blog}) => {
    return <div className=" h-screen w-full bg-dot-white/[0.2] relative   bg-black/[0.98]  ">
        <Appbar />
        <div className=" pt-16 flex justify-center overflow-auto">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8 text-white prose prose-invert bg-neutral-900 p-5 pb-10 rounded-lg ">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                <div className="text-white bg-neutral-900 p-5 rounded-lg shadow-xl">
            <div className="text-2xl md:text-4xl pb-5">
                Author
            </div>
            <div className="flex items-center">
                <div className="w-5 h-5 p-4 mr-4 text-black text-lg md:text-xl flex justify-center items-center bg-white rounded-full ">{blog.author.name.toUpperCase()[0]}</div>
                <div className="tex-lg md:text-xl mr-2">{blog.author.name}</div>
                
            </div>

        </div>
        </div>
                
            </div>
        </div>
    </div>
}