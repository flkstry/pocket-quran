import type { ReactNode, HTMLAttributes } from "react";
import { forwardRef } from "react";

export interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    description: string;
    cx?: string;
}

const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
    (props, ref) => {
        const { children, description, cx, ...rest } = props;
        return (
            <button
                {...rest}
                ref={ref}
                type="button"
                className={`${cx} disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-gray-100 hover:bg-purple-200 justify-center hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm text-center inline-flex items-center`}
            >
                {children}
                <span className="sr-only">{description}</span>
            </button>
        );
    }
);

ButtonIcon.displayName = "button-icon";
export default ButtonIcon;
