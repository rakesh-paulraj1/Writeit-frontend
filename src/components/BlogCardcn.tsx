
import { cn } from "../utils/cn"


export const Card= ({
    className,
    children
}:{
   className?:string,
   children: React.ReactNode
})=>{
    return (<div className={cn(" h-full w-full px-4 overflow-hidden bg-black border border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
    );
};