import { FC, ReactNode } from "react";

import classNames from "classnames";

export interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    variant?: "primary" | "secondary" | "dark" | "neutral";
    disabled?: boolean;
    className?: string;
    icon?: ReactNode;
    loading?: boolean;
}

const CustomButton: FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    size = "medium",
    variant = "primary",
    disabled = false,
    className,
    icon,
    loading = false,
}) => {
    const baseClasses =
        "rounded-xl text-sm transition-all font-semibold duration-300 inline-flex items-center justify-center ease-in-out";
    const sizeClasses = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-md",
        large: "px-8 py-4 text-lg",
    };
    const variantClasses: { secondary: string; primary: string; dark: string; neutral: string } = {
        primary:
            "bg-primary text-white hover:bg-white border-primary hover:border hover:border-primary hover:text-primary",
        secondary: "text-primary border hover:text-white text-sm border-primary hover:bg-primary",
        dark: "text-white border bg-dark text-sm border-dark hover:bg-primary hover:border-primary",
        neutral:
            "text-gray-700 border bg-white text-sm border-gray-300 hover:bg-gray-700 hover:text-white",
    };

    const spinnerClasses = classNames(
        "animate-spin -ml-1 mr-3",
        {
            "h-4 w-4": size === "small",
            "h-5 w-5": size === "medium",
            "h-6 w-6": size === "large",
        },
        variant === "primary" ? "text-white" : "text-primary"
    );

    const classes = classNames(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg",
        className
    );

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
            {loading ? (
                <>
                    <svg
                        className={spinnerClasses}
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                    >
                        <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                        ></circle>
                        <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                    </svg>
                    {children}
                </>
            ) : (
                <>
                    {icon && <span className='mr-2'>{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default CustomButton;
