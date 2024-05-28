import { Appbar } from "../components/Appbar";
import { cn } from "../utils/cn";
import { Profileblog } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import {  useState } from "react";
import { ConfirmDialog } from 'primereact/confirmdialog';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Profile = () => {
    const id = localStorage.getItem('user') || '';
    console.log(id);
    const [visible, setVisible] = useState(false);
    const { loading, pblog } = Profileblog({ id: id });
    const navigate = useNavigate();
    const handleDeleteAccount = () => {
        try {
            axios.delete(`${BACKEND_URL}/api/v1/user/deleteuser/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            setVisible(false);
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('username')
            navigate('/signup')
        } catch {
            setVisible(false);
        }

    }

    const donthandle = () => {
        console.log("Delete blog button clicked");
        setVisible(false);
    }

    if (loading || !pblog) {
        return (
            <div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">
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
        );
    }

    return (
        <div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">
            <Appbar />
            <div className={cn('h-screen grid grid-cols-1 md:grid-cols-4 py-10')}>
                <div className="col-span-1 md:col-span-3 my-20 w-[90%] md:w-[80%] mx-auto">
                    {pblog.user.posts.map((post: { id: number ; title: string; content: string; name:string; }) =>
                        <BlogCard
                            key={post.id}
                            id={post.id}
                            authorName={post.name}
                            title={post.title}
                            content={post.content} publishedDate={""}                        />
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
                            <button
                                onClick={() => setVisible(true)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to proceed?"
                header="Account deletion"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteAccount}
                reject={donthandle}
            />
        </div>
    );
}
