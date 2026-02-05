import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({
     className,
     ...props
}, ref) {
    return <input ref={ref}
                className={cn(
                    "border-b-1 border-b-gray-200 py-17 pl-9 pr-21",
                    "focus:border-b-gray600 rounded-t-6 ",
                    className
                )}
                {...props} 
            />
    })


export default  Input;