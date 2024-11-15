import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog {
    content: string;
    title: string;
    id: number
    author: {
        name: string
        id:number
    }
}
interface User {
    user: any;
    id: number;
    email: string;
    name: string;
    bio: string | null;
    password: string;
    posts: Blog[];
    
}

export const Profileblog= ({id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [pblog, setPblog] = useState<User>();

    
useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/user/${id}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    }).then(response => {
        setPblog(response.data);
        
        setLoading(false);
    }).catch(error => {
        console.error("Error fetching user data:", error);
        
    });
},[])
return {
    loading,
    pblog
}}

export const 
useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogs/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
       axios.get(`${BACKEND_URL}/api/v1/blogs/bulk`,{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then(response => {
            console.log(response); 
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
            setLoading(false);
        });
    }, []);
  

    return {
        loading,
        blogs
    }
}