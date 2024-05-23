
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import { HoverBorderGradient } from "./hover-border-gradient";



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
   const name=localStorage.getItem('username');
    return <nav className="fixed border-b border-slate-900 z-20 top-0 left-0 right-0 backdrop-blur-sm  flex justify-between py-3 px-16">
     
       <div><Link to={'/dashboard'} >
       <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black text-white  dark:text-white flex items-center "
      >
      
 

       
        
        <span className="text-xl font-bold">WriteIt</span>
      </HoverBorderGradient>

              
        </Link>
        </div> 
        <div>
            <Link to={`/publish`}>
            <button className="p-[3px] relative mr-4">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-gray-500 rounded-lg" />
        <div className="px-6 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Write
        </div>
      </button>
            </Link> 
           
          

            <button type="button" onClick={onClickHandler} className=" text-sm bg-neutral-900 rounded-full md:me-0" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <div className="w-5 h-5 p-5 text-white md:text-lg text-sm flex justify-center items-center rounder-full">
                    {name?.toUpperCase()[0]}
                </div>
            </button>
            {showDropDown ?
                <div className="z-50 absolute top-10 right-5 my-4 text-base list-none divide-y rounded-lg shadow bg-neutral-900 divide-gray-600" id="user-dropdown">
                   <Link to={"/profile"}> <div className="px-4 py-3 ">
                    
                        <span className="block text-sm truncate text-gray-400">{name}</span>
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