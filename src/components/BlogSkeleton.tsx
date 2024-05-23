import { cn } from "../utils/cn";

export const 
BlogSkeleton = () => {
    return (
        <div className="block mb-4">
          <div className="h-full w-full px-4 py-2 overflow-hidden bg-black border border-white/[0.2] rounded relative z-20 animate-pulse">
            <div className={cn("text-gray-400 font-bold tracking-wide text-xl mt-2")}>

              
            </div>
            <div className="pt-2 flex items-center">
              
              <div className="pl-2 animate-pulse">
                <div className="h-2 bg-gray-300 rounded-full mb-1" />
                <div className="h-2 bg-gray-300 rounded-full mb-1" />
              </div>
              <div className="pl-2 flex-grow animate-pulse">
                <div className="h-2 bg-gray-300 rounded-full mb-1" />
              </div>
            </div>
            <div className={cn("mt-4 text-gray-400 tracking-wide leading-relaxed text-sm")}>
              <div className="h-4 bg-gray-300 rounded-full animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 rounded-full animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 rounded-full animate-pulse" />
            </div>
            <div className="text-slate-500 text-sm font-thin pt-2">
              <span className="h-2 bg-gray-300 rounded-full animate-pulse" />
            </div>
          </div>
          </div>
        
      );
}