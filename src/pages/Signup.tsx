import { SignupCard } from "../components/SignupCard"
import { TextGenerateEffect } from "../components/Textgenerator"

export const Signup = () => {
    return <div className="h-full w-full flex md:items-center md:justify-center bg-black/[0.98] antialiased bg-grid-white/[0.05] relative overflow-hidden">
        <div className="p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 grid grid-cols-1 md:grid-cols-2">
        <div className=" p-5 flex justify-center items-center">
            <div>
            <div className="text-6xl lg:text-8xl animate-gradient to-65% bg-gradient-to-br bg-clip-text bg-right-bottom font-extrabold text-transparent from-white from-35% via-[#3178c6] to-[#3178c6] bg-[length:300%_300%]">
                    Writeit
                </div>
                <div>
                    <TextGenerateEffect words="Created by Rakesh.P" />
                </div>
            </div>
        </div>
        <SignupCard />
    </div>
        
    </div>}