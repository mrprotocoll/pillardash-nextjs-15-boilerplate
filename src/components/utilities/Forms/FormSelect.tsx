import { useEffect, useRef, useState } from "react";

import { ChevronDown } from "lucide-react";

export type SelectOption = {
    value: string;
    label?: string;
    disabled?: boolean;
};

type SelectProps = {
    options: SelectOption[];
    placeholder?: string;
    onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
    value?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    label?: string;
    required?: boolean;
    error?: string;
    helpText?: string;
    fullWidth?: boolean;
    searchable?: boolean;
};

export default function FormSelect({
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
    error,
    helpText,
    fullWidth = false,
    searchable = false,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        value ? options.find((option) => option.value === value) || null : null
    );
    const selectRef = useRef<HTMLDivElement>(null);

    // Filter options based on search term if searchable
    const filteredOptions = searchable
        ? options.filter((option) =>
              (option.label || option.value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    // const handleSelect = (option: SelectOption) => {
    //     if (option.disabled) return;
    //     setSelectedOption(option);
    //     onChange(option.value);
    //     setIsOpen(false);
    //     setSearchTerm("");
    // };

    const handleSelect = (option: SelectOption) => {
        if (option.disabled) return;
        setSelectedOption(option);

        // Simulate a standard change event
        onChange({
            target: {
                id: id || "",
                value: option.value,
            },
        } as React.ChangeEvent<HTMLSelectElement>);

        setIsOpen(false);
        setSearchTerm("");
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Size classes
    const sizeClasses = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-4 py-3 text-lg",
    };

    return (
        <div ref={selectRef} className={`${fullWidth ? "w-full" : "w-fit"} ${className}`}>
            {label && (
                <label htmlFor={id} className='mb-1 block text-sm font-medium text-gray-700'>
                    {label}
                    {required && <span className='ml-1 text-red-500'>*</span>}
                </label>
            )}

            <div className='relative'>
                <button
                    type='button'
                    className={`flex items-center justify-between rounded-md border ${
                        error ? "border-red-500" : "border-gray-300"
                    } bg-white shadow-sm ${
                        sizeClasses[size]
                    } focus:border-primary-500 focus:ring-primary-500 text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-1 ${
                        disabled ? "cursor-not-allowed bg-gray-100 opacity-50" : ""
                    } ${fullWidth ? "w-full" : ""}`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    id={id}
                    aria-haspopup='listbox'
                    aria-expanded={isOpen}
                >
                    <span className='truncate'>
                        {selectedOption
                            ? selectedOption?.label || selectedOption.value
                            : placeholder}
                    </span>
                    <ChevronDown
                        className={`ml-2 h-4 w-4 text-gray-500 transition-transform ${
                            isOpen ? "rotate-180 transform" : ""
                        }`}
                    />
                </button>

                {isOpen && (
                    <div
                        className='absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg'
                        role='listbox'
                    >
                        {searchable && (
                            <div className='sticky top-0 border-b border-gray-200 bg-white p-2'>
                                <input
                                    type='text'
                                    className='focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1'
                                    placeholder='Search...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        )}

                        <div className='max-h-60 overflow-auto'>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className={`cursor-pointer px-4 py-2 ${
                                            selectedOption?.value === option.value
                                                ? "bg-primary-100 text-primary-900"
                                                : "text-gray-900 hover:bg-gray-100"
                                        } ${
                                            option.disabled
                                                ? "cursor-not-allowed text-gray-400 hover:bg-white"
                                                : ""
                                        }`}
                                        onClick={() => handleSelect(option)}
                                        role='option'
                                        aria-selected={selectedOption?.value === option.value}
                                        aria-disabled={option.disabled}
                                    >
                                        {option.label || option.value}
                                    </div>
                                ))
                            ) : (
                                <div className='px-4 py-2 text-gray-500'>No options found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
            {helpText && !error && <p className='mt-1 text-sm text-gray-500'>{helpText}</p>}

            {name && <input type='hidden' name={name} value={selectedOption?.value || ""} />}
        </div>
    );
}
