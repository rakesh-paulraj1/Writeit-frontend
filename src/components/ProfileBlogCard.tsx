import { Link } from "react-router-dom";
import { cn } from "../utils/cn";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
   
}

export const ProfileBlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    
}: BlogCardProps) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate=useNavigate();
    const onDelete=async()=>{
        try{

            await axios.delete(`${BACKEND_URL}/api/v1/blogs/deleteblog/${id}`,
            {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            navigate("/profile")
        }catch(e) {
            console.error(e+"error on deleting")

        }

    }
    function parseHtmlToText(htmlContent: string) {
        return htmlContent.replace(/<[^>]*>|&nbsp;/g, '');
    }

    return (
        <div className="block mb-4">
             <Link to={`/blog/${id}`} className="block mb-4">
            <div className=" h-full w-full px-4 py-2 overflow-hidden bg-black border border-white/[0.2] rounded relative z-20">
                <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                    {title}
                </div>
                <div className="pt-2 flex items-center">
                   
                    <div className="pl-2 text-zinc-600 tracking-wide leading-relaxed text-sm">
                        {authorName}
                    </div>
                    <div className="pl-2 text-slate-500 font-thin text-sm">
                        {publishedDate}
                    </div>
                </div>
                <div className={cn("mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm")}>
                    {parseHtmlToText(content.slice(0, 100) + "...")}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-2">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
           
        </Link>
            <div className="flex justify-end mt-2 space-x-2">
            <Link to={`/editblog/${id}`}>
                <button  className="text-blue-500 hover:text-blue-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg>
                </button>
                </Link>
                <button onClick={() => setShowConfirm(true)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                </button>
            </div>
            {showConfirm && (
                <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow">
                    <div className="bg-black p-4 rounded shadow-lg">
                        <p className="text-white">Are you sure you want to delete this blog?</p>
                        <div className="flex justify-end space-x-2 mt-4">
                        <button onClick={onDelete } className="px-4 py-2 bg-red-500 text-white rounded">
                                Delete
                            </button>
                           
                            <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-200 rounded">
                                Cancel
                            </button>
                            
                           
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
}
