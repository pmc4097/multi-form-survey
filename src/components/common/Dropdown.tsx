import { createContext, ReactNode, RefObject, useCallback, useContext, useRef, useState } from "react";
import ArrowIcon from "../../assets/icons/arrow_drop_down.svg?react";
import useOutsideClick from "../../hooks/common/useOutsideClick";
import cn from "classnames";
interface DropdownProps<T> {
    defaultValue?:T;
    placeholder?: string;
    options: DropdownOption<T>[];
    onChange: (value: T) => void
}

export default function Dropdown<T>({ defaultValue, placeholder, options, onChange }: DropdownProps<T>) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(
        defaultValue 
            ? options.findIndex(option => option.value === defaultValue) 
            : -1
    );
    

    const open = useCallback(() => setOpened(true), []);
    const close = useCallback(() => setOpened(false), []);
    const toggle = useCallback(() => setOpened(prv => !prv), []);

    const wrapperRef = useOutsideClick(close);

    const handleChange = useCallback((index: number) => {
        setSelected(index);
        onChange?.(options[index].value);
        close();
    }, [close, options, onChange]);

    return (
        <DropdownContext.Provider value={{
            opened,
            open,
            close,
            toggle,
            options,
            selected,
            onChange: handleChange
        }}>
            <div ref={wrapperRef as RefObject<HTMLDivElement>} className="text-left inline-block relative">
                <DropdownButton placeholder={placeholder} />
                <DropdownMenu />
            </div>
        </DropdownContext.Provider>
    )
}

type DropdownOption<T> = {
    label: ReactNode
    value: T
}

interface DropdownContextType<T = unknown> {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    options: DropdownOption<T>[];
    selected: number;
    onChange: (index: number) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownButton({ placeholder = "select" }: { placeholder?: string }) {
    const { opened ,toggle, options, selected } = useContext(DropdownContext)!;

    return (
        <button 
            onClick={toggle}
            className="border border-gray-300 rounded-10 min-w-197 p-14 pr-36 relative text-left">
                {selected >= 0 ? options[selected].label : placeholder ?? ""}
            <span className={cn(
                    "absolute right-12 top-1/2 transform -translate-y-1/2 transition-transform duration-200",
                    { "rotate-180": opened, "rotate-0": !opened }
                )}>
                <ArrowIcon />
            </span>
        </button>
    )
}

export function DropdownMenu() {
    const {  opened, options, onChange } = useContext(DropdownContext)!;
    return opened ? (
            <div className="absolute let-0 top-62 border border-gray-300 rounded-10 flex flex-col min-w-197 bg-white z-10">
                {options.map((option, index) => (
                    <DropdownMenuItem 
                        key={`${option.value}`} 
                        label={option.label} 
                        onSelect={() => onChange(index)} />
                ))}
            </div>
        ) : null
}

function DropdownMenuItem({ label, onSelect}: { label: ReactNode; onSelect: () => void }) {
    return <button 
            className="text-left p-14 border-b-1 border-gray-300 last:border-0" 
            onClick={onSelect}>
                {label}
            </button>;
    }