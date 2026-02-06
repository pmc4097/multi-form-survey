import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
    opened: boolean;

}

export default function Modal({ children, opened }: PropsWithChildren<Props>) {
    return opened ? createPortal(
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black/30 flex justify-center items-center">
            <div className="z-10 bg-white rounded-10 max-w-[655px] w-full">
                {children}
            </div>
        </div>, document.body) : null
}