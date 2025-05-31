"use client";

import { useState } from "react";

type CheckboxProps = {
    variant?: "check" | "dot" | "toggle";
    size?: "sm" | "md" | "lg";
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
};

export default function Checkbox({
    variant = "check",
    size = "sm",
    checked = false,
    disabled = false,
    onChange,
    label,
}: CheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleChange = () => {
        if (disabled) return;

        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    // Size classes
    const sizeClasses = {
        sm: {
            container: "h-6 w-6",
            toggle: "w-10 h-6",
            toggleCircle: "h-4 w-4",
        },
        md: {
            container: "h-8 w-8",
            toggle: "w-12 h-7",
            toggleCircle: "h-5 w-5",
        },
        lg: {
            container: "h-10 w-10",
            toggle: "w-14 h-8",
            toggleCircle: "h-6 w-6",
        },
    };

    // Render different variants
    const renderCheckbox = () => {
        if (variant === "toggle") {
            return (
                <div
                    className={`relative rounded-full transition-colors ${sizeClasses[size].toggle} ${
                        isChecked ? "bg-primary" : "bg-gray-200"
                    } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    onClick={handleChange}
                >
                    <div
                        className={`absolute top-1 transform rounded-full bg-white transition-transform ${sizeClasses[size].toggleCircle} ${
                            isChecked ? "right-1/2 translate-x-full" : "left-1"
                        }`}
                    >
                        {isChecked && variant === "toggle" && (
                            <svg
                                className='h-full w-full text-teal-600'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M5 13l4 4L19 7'
                                />
                            </svg>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div
                className={`${sizeClasses[size].container} ${variant === "check" ? "rounded-lg" : "rounded-full"} flex items-center justify-center border-2 transition-colors ${
                    isChecked ? "border-primary bg-primary" : "border-gray-200 bg-gray-50"
                } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                onClick={handleChange}
            >
                {isChecked && variant === "check" && (
                    <svg
                        className='h-3/4 w-3/4 text-white'
                        fill='none'
                        viewBox='0 0 28 28'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                        />
                    </svg>
                )}
                {isChecked && variant === "dot" && (
                    <div className='h-2/4 w-2/4 rounded-full bg-white'></div>
                )}
            </div>
        );
    };

    return (
        <div className='flex items-center gap-2'>
            {renderCheckbox()}
            {label && (
                <label className={`${disabled ? "text-gray-400" : "text-gray-700"}`}>{label}</label>
            )}
        </div>
    );
}

function CheckboxDemo() {
    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            <div className='mx-auto max-w-md rounded-lg bg-white p-6 shadow'>
                <h2 className='mb-6 text-xl font-semibold'>Checkbox Component Demo</h2>

                <div className='space-y-8'>
                    {/* Check variant */}
                    <div className='space-y-4'>
                        <h3 className='font-medium'>Check Variant</h3>
                        <div className='flex flex-wrap items-center gap-4'>
                            <Checkbox variant='check' size='sm' label='Small' />
                            <Checkbox variant='check' size='md' checked label='Medium' />
                            <Checkbox variant='check' size='lg' label='Large' />
                            <Checkbox variant='check' disabled label='Disabled' />
                        </div>
                    </div>

                    {/* Dot variant */}
                    <div className='space-y-4'>
                        <h3 className='font-medium'>Dot Variant</h3>
                        <div className='flex flex-wrap items-center gap-4'>
                            <Checkbox variant='dot' size='sm' label='Small' />
                            <Checkbox variant='dot' size='md' checked label='Medium' />
                            <Checkbox variant='dot' size='lg' label='Large' />
                            <Checkbox variant='dot' disabled label='Disabled' />
                        </div>
                    </div>

                    {/* Toggle variant */}
                    <div className='space-y-4'>
                        <h3 className='font-medium'>Toggle Variant</h3>
                        <div className='flex flex-wrap items-center gap-4'>
                            <Checkbox variant='toggle' size='sm' label='Small' />
                            <Checkbox variant='toggle' size='md' checked label='Medium' />
                            <Checkbox variant='toggle' size='lg' label='Large' />
                            <Checkbox variant='toggle' disabled label='Disabled' />
                        </div>
                    </div>

                    {/* Form sample */}
                    <div className='space-y-4 border-t pt-4'>
                        <h3 className='font-medium'>Sample Form</h3>
                        <div className='space-y-3'>
                            <Checkbox variant='check' checked label='Accept terms and conditions' />
                            <Checkbox variant='toggle' checked label='Subscribe to newsletter' />
                            <Checkbox variant='dot' label='Remember me' />

                            <div className='pt-3'>
                                <button className='rounded bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { CheckboxDemo };
