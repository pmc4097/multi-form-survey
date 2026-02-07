import { forwardRef, InputHTMLAttributes } from 'react';
import CheckIcon from '../../assets/icons/check_box.svg?react';
import UncheckedIcon from '../../assets/icons/check_box_outline_blank.svg?react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(function Radio(
    { label, ...props },
    ref,
) {
    return (
        <label className="relative h-26 flex items-center">
            <input
                className="peer opacity-0 w-26 h-26"
                ref={ref}
                type="checkbox"
                {...props}
            />
            <CheckIcon className="absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transition-opacity" />
            <UncheckedIcon className="absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transition-opacity" />
            <span className="pl-14">{label}</span>
        </label>
    );
});

export default Checkbox;
