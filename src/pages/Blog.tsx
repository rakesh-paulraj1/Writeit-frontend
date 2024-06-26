import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";

import { useBlog } from "../hooks";
import {useParams} from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });
    

    if (loading || !blog) {
        return <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
            <Appbar />
        
            <div className=" h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                <ProgressSpinner  />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}