import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  SignupInput } from "@rakeshpaulraj/medium-clone-types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast, { Toaster } from "react-hot-toast"


export const  SignupCard = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        name:"",
        password: ""

    });



    async function signuphandler() {
        try {
            toast.promise(
            
                axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs,{
                    withCredentials: true,
                }).then((response) => {
                    const jwt = response.data.jwt;
                    const id = response.data.body.id;
                    const name = response.data.body.username;
    
                    localStorage.setItem("token", jwt);
                    localStorage.setItem("user", id);
                    localStorage.setItem("username", name);
                    navigate("/dashboard");
                }),
                {
                    loading: "Signing up...",
                    error: (err) => {
                        const errorMessage = err?.response?.data?.message || "An unexpected error occurred";
                        return errorMessage;
                    },
                    success: "Successfully Signed Up",
                },
                {
                    style: {
                        minWidth: '250px',
                        backgroundColor: '#18181b',
                        color: '#d4d4d8',
                    },
                }
            );
        } catch {
           
        console.log("error");
        }
    }
    
    return <div className="h-screen flex justify-center items-center">
        <div className="h-[470px] w-[360px] bg-neutral-950 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
            <div>
                <div className="px-10">
                    <div className="font-bold text-4xl p-4 text-neutral-400">
                        SignUp
                    </div>
                    <div className="text-slate-400 ">
                         Already have an account ?
                        <Link className=" flex center underline" to="/">
                           SignIn
                        </Link>
                    </div>
                </div>
                <LabelledInput label="Email" type={"text"} placeholder="Your email" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                      <LabelledInput label="Name" type={"text"} placeholder="Your Name " onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }} />
                
                    <LabelledInput label="Password" type={"password"} placeholder="Minimum 6 characters" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={signuphandler} type="button" className="mt-6 h-9 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 my-8">SignUp</button>
                    <Toaster />
                </div>
            </div>
        </div>
    
}

interface LabelledInputType {

    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-white font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}




