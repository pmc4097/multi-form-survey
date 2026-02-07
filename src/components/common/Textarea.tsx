import { forwardRef, HTMLAttributes, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import { useWatch } from "react-hook-form";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Input({
    className,
    ...props
}, ref) {
    return <textarea
        ref={ref}
        className={cn(
            "border-b-1 border-b-gray-200 pb-16 outline-none resize-none",
            "focus:border-b-gray600 rounded-t-6 ",
            className
        )}
        {...props}
    />
})

export default Textarea;

export function AutoGrow({ value, forTextarea, className, ...props }: HTMLAttributes<HTMLDivElement> & { value?: string; forTextarea?: string }) {

    const valueFromWatch = useWatch({
        name: forTextarea!,
    });

    return (
        <div className={
            cn(
                "grid",
                "after:content=[attr(data-replicated-value)] after:whitespace-pre-wrap after:invisible after:pb-16 after:auto-grow",
                "[&>textarea]:auto-grow",
                className
            )
        }
            {...props}
            data-replicated-value={value || valueFromWatch}
        />
    )
}