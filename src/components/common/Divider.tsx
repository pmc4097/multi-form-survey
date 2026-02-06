import classNames from "classnames";

interface Props {
    direction?: 'horizontal' | 'vertical';
}

export default function Divider({ className, direction = 'horizontal' }: Cn & Props) {
    if (direction === 'horizontal') {
        return <hr className={classNames('border-t-1 border-gray-100 w-full', className)} />
    } else {
        return <hr className={classNames('border-l-1 border-gray-100 h-full', className)} />
    }
}