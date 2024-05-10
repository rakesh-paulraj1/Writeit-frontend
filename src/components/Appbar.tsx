import { Avatar } from "./BlogCard"
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const [showDropDown,setShowDropDown] = useState(false);
    function onClickHandler() {
        setShowDropDown(!showDropDown)
    }
   function signoutHandler(){
    localStorage.removeItem('token')
        localStorage.removeItem('user')
        setShowDropDown(false)
    
        navigate('/')
        navigate(0)
   }
    return <nav className="fixed border-b border-slate-900 z-20 top-0 left-0 right-0 backdrop-blur-sm  flex justify-between py-3 px-16">
     
       <div><Link to={'/dashboard'} className="font-bold bg-green-700 bg-clip-text text-transparent text-xl md:text-4xl mr-5">
                Writeit
        </Link>
        </div> 
        <div>
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">Write</button>
            </Link>

            <button type="button" onClick={onClickHandler} className=" text-sm bg-neutral-900 rounded-full md:me-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <div className="w-5 h-5 p-5 text-white md:text-lg text-sm flex justify-center items-center rounder-full">
                    {"U"}
                </div>
            </button>
            {showDropDown ?
                <div className="z-50 absolute top-10 right-5 my-4 text-base list-none divide-y rounded-lg shadow bg-neutral-900 divide-gray-600" id="user-dropdown">
                   <Link to={"/profile"}> <div className="px-4 py-3">
                        <span className="block text-sm truncate text-gray-400">{"User"}</span>
                    </div></Link>
                    <ul className="py-2" aria-labelledby="user-menu-button" onClick={signoutHandler}>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white">Sign out</a>
                        </li>
                    </ul>
                </div>
            : null }
        </div>
    
    </nav>
}