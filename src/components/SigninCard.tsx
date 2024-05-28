import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@rakeshpaulraj/medium-clone-types";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast, { Toaster } from "react-hot-toast"



export const  SigninCard = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });


    async function signinhandler() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.jwt;
            const id = response.data.id;
            const name = response.data.name;
            localStorage.setItem("token", jwt);
            localStorage.setItem("user", id);
            localStorage.setItem("username", name);
            navigate("/dashboard ");

            toast.success('Successfully logged in', {

                style: {
                    minWidth: '250px',
                    backgroundColor: '#18181b',
                    color: '#d4d4d8',
                },
            });
        }


        catch (error: any) {

            console.log(error.response.data.message[0].message || error.response.data.message);

            toast.error(
                (error.response.data.message[0].message || error.response.data.message),
                {
                    style: {
                        minWidth: '250px',
                        backgroundColor: '#18181b',
                        color: '#d4d4d8',
                    },
                }
            );
        }
    }
    
    return <div className="h-screen flex justify-center items-center">
        <div  className="h-[390px] w-[360px] bg-neutral-950 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
            <div>
                <div className="px-10">
                    <div className="font-bold text-4xl p-4 text-neutral-400">
                        SignIn
                    </div>
                    <div className="text-slate-400">
                         Don't have an account ? 
                        <Link className=" flex underline " to="/signup">
                        Sign Up
                        </Link>
                    </div>
                    
                </div>
                <LabelledInput label={"Email"} type={"text"} placeholder={"Your Email"} onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        })
                    }} />
                
                    <LabelledInput label={"Password"}  type={"password"} placeholder="Minimum 6 Characters" onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }} />
                    <button onClick={signinhandler} type="button" className="mt-8 h-9 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 my-8 ">SignIn</button>
                    <Toaster/>
                </div>
                
            </div>
            
        </div>
    
}

interface LabelledInputType {

    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

function LabelledInput({label , placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-white font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}


