import { Link } from "react-router-dom";
import { cn } from "../utils/cn"

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}


export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    function parseHtmlToText(htmlContent:string) {
        return htmlContent.replace(/<[^>]*>|&nbsp;/g, ''); 
      }
    return (
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
    );
};


export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}