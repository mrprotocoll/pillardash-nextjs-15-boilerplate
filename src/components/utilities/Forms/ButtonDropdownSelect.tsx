import React, { useState } from "react";

import { ChevronDown } from "lucide-react";

export type SelectOption = {
    value: string;
    label?: string;
};

type SelectProps = {
    options: SelectOption[];
    placeholder?: string;
    onChange: (value: string) => void;
    value?: string;
    size?: "sm" | "md";
    className?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
};

export default function ButtonDropdownSelect({
    options,
    placeholder = "Select an option",
    onChange,
    value,
    size = "md",
    className = "",
    name,
    id,
    disabled = false,
    label,
    required,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        value ? options.find((option) => option.value === value) || null : null
    );

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    // Size classes for the button
    const sizeClasses = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
    };

    return (
        <div className={`relative inline-block ${className}`}>
            {label && (
                <label htmlFor={id} className='mb-1 block text-sm font-medium text-gray-700'>
                    {label}
                    {required && <span className='ml-1 text-red-500'>*</span>}
                </label>
            )}

            <button
                type='button'
                className={`flex w-full items-center justify-between rounded-md border border-gray-200 bg-white shadow-sm ${
                    sizeClasses[size]
                } text-gray-700 hover:bg-gray-50 focus:outline-none ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                id={id}
            >
                <span className='truncate'>
                    {selectedOption ? selectedOption?.label || selectedOption.value : placeholder}
                </span>
                <ChevronDown className={`ml-2 h-4 w-4 ${isOpen ? "rotate-180 transform" : ""}`} />
            </button>

            {isOpen && (
                <div className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg'>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                selectedOption?.value === option.value
                                    ? "bg-gray-50 text-black"
                                    : "text-gray-900"
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option.label || option.value}
                        </div>
                    ))}
                </div>
            )}

            {name && <input type='hidden' name={name} value={selectedOption?.value || ""} />}
        </div>
    );
}
