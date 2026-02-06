import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: 'primary' | 'secondary' | 'tertiary'
}

export default function Button({ variants = 'primary', className, ...props }: Props) {
    return <button className={classNames('py-14 px-28 text-16 font-medium rounded-10 border', classes[variants], className)} {...props} />
}

const classes: Record<NonNullable<Props['variants']>, string> = {
    'primary': 'bg-main border-main text-white',
    'secondary': 'bg-white border-main text-main',
    'tertiary': 'bg-transparent border-transparent text-gray-700'
}