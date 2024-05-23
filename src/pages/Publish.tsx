import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {  useRef, useState,useEffect} from "react";
import JoditEditor from 'jodit-react';
import { Jodit } from "jodit-react";
export const Publish :React.FC= () => {
    const [title, setTitle] = useState("");
    const [content,setContent] = useState("");
    const JoditRef = useRef(null);
  const navigate = useNavigate();
    const Publish= async()=>{
        console.log(content);
        const response = await axios.post(`${BACKEND_URL}/api/v1/blogs`, {
            title,
            content,
        }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        
        navigate(`/blog/${response.data.id}`);
    }
    useEffect(() => {
        const joditInstance = Jodit.make("#editor", {
          uploader: {
            insertImageAsBase64URI: true,
          },
          toolbarButtonSize: "small",
          showCharsCounter: false,
          showWordsCounter: false,
          showXPathInStatusbar: false,
        });
    console.log(content);
        JoditRef.current = joditInstance;
        joditInstance.events.on("change", (newContent) => {
            setContent(newContent);
          });
       
        return () => {
          if (JoditRef.current) {
            JoditRef.current.events.off("change"); 
          }
        };
      }, []);

    
    return <div className="w-full bg-dot-white/[0.2] relative  items-center  bg-black/[0.98]  justify-center overflow-auto">
        <Appbar />
        <div className=" h-screen flex  justify-center w-full pt-8 mt-16"> 
            <div className="max-w-screen-lg w-full">
            <input
  onChange={(e) => setTitle(e.target.value)}
  type="text"
  className={`w-full bg-white-300 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-black-900`}
  placeholder="Title"
/>


    <div id="editor"></div>

                <div className="pt-4">
      <button className="p-[3px] relative" onClick={Publish}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-gray-500 rounded-lg" />
        <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Post the blog 
        </div>
      </button></div>
            </div>
        </div>
    </div>
}

