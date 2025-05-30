import React, { useEffect, useState } from "react";

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";

export type AlertType = "success" | "error" | "info" | "warning";

export interface AlertProps {
    message: string;
    description?: string;
    type?: AlertType;
    duration?: number;
    onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
    message,
    description,
    type = "info",
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    // Configure colors based on type
    const config = {
        success: {
            icon: <CheckCircle className='h-5 w-5' />,
            bgColor: "bg-primary-50",
            borderColor: "border-primary-300",
            textColor: "text-primary-800",
            iconColor: "text-primary-500",
            progressColor: "bg-primary-500",
        },
        error: {
            icon: <AlertCircle className='h-5 w-5' />,
            bgColor: "bg-rose-50",
            borderColor: "border-rose-300",
            textColor: "text-rose-800",
            iconColor: "text-rose-500",
            progressColor: "bg-rose-500",
        },
        info: {
            icon: <Info className='h-5 w-5' />,
            bgColor: "bg-sky-50",
            borderColor: "border-sky-300 ",
            textColor: "text-sky-800 ",
            iconColor: "text-sky-500",
            progressColor: "bg-sky-500",
        },
        warning: {
            icon: <AlertTriangle className='h-5 w-5' />,
            bgColor: "bg-amber-50 ",
            borderColor: "border-amber-300 ",
            textColor: "text-amber-800",
            iconColor: "text-amber-500",
            progressColor: "bg-amber-500",
        },
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose?.();
            }, 300);
        }, duration);

        // Progress bar animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - 100 / (duration / 100);
                return newProgress <= 0 ? 0 : newProgress;
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const { icon, bgColor, borderColor, textColor, iconColor, progressColor } = config[type];

    return (
        <div
            className={`fixed right-4 top-4 z-50 transform transition-all duration-300 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            }`}
        >
            <div
                className={`flex w-72 rounded-lg border shadow-lg md:w-96 ${borderColor} ${bgColor} p-4`}
            >
                <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
                <div className='ml-3 w-full'>
                    <div className='flex items-start justify-between'>
                        <p className={`text-md font-semibold ${textColor}`}>{message}</p>
                        <button
                            onClick={handleClose}
                            className='text-gray-600 hover:text-gray-600 focus:outline-none'
                        >
                            <X className='h-4 w-4' />
                        </button>
                    </div>
                    {description && (
                        <p className={`mt-1 text-sm ${textColor} opacity-80`}>{description}</p>
                    )}
                    <div className='mt-2 h-1 w-full rounded-full bg-gray-200'>
                        <div
                            className={`${progressColor} h-1 rounded-full transition-all duration-100 ease-linear`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alert;
