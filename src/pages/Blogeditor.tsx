import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {Jodit} from "jodit";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import toast, { Toaster } from 'react-hot-toast';
import { cn } from "../utils/cn";
export const Blogeditor: React.FC = () => {
 
  const [content, setContent] = useState("");
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const JoditRef = useRef<any>();
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });
  const [title, setTitle] = useState(blog ? blog.title : '');


  const publish = async () => {
    try {
       await axios.put(`${BACKEND_URL}/api/v1/blogs/${id}`, {
        title,
        content,
      }, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      navigate(`/blog/${id}`);
      toast.success('Blog published successfully');
    } catch (error) {
      toast.error('Failed to publish blog. Please try again.');
      console.error('Error publishing blog:', error);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const joditInstance = Jodit.make(editorRef.current, {
        uploader: {
          insertImageAsBase64URI: true,
        },
        toolbarButtonSize: "small",
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
      });
      if (blog) {
        joditInstance.value = blog.content;
      }

      JoditRef.current = joditInstance;
      joditInstance.events.on("change", (newContent) => {
        setContent(newContent);
      });

      return () => {
        if (JoditRef.current) {
          JoditRef.current.destruct();
          JoditRef.current = null;
        }
      };
    }
  }, [blog]);

  if (loading || !blog) {
    return (
      <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
        <Appbar />
        <div className=" h-screen flex flex-col justify-center">
          <div className="flex justify-center">
          <ProgressSpinner  />
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="w-full bg-dot-white/[0.2] relative items-center bg-black/[0.98] justify-center overflow-auto">
      <Appbar />
      
      <div className="h-screen flex justify-center w-full pt-8 mt-16">
        <div className="max-w-screen-lg w-full">
        <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                    {"Title"}
                </div>
                <input
      onChange={(e) => setTitle(e.target.value)}
      type="text"
      className={`w-full bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder:text-gray-900`}
      placeholder="Update the title !!"
      
      
    />
          <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                    {"Blog content"}
                </div>
          <div className="pt-4" ref={editorRef} id="editor"></div>
          <div className={cn("text-zinc-100 font-bold tracking-wide text-xl mt-2")}>
                  
                </div>
          <div className="pt-4">
            
            <button className="p-[3px] relative" onClick={publish}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-gray-500 rounded-lg" />
              <div className="px-6 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Update the blog
              </div>
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
