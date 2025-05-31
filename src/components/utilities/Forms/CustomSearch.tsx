"use client";

import { ChangeEvent, useState } from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    className?: string;
    disabled?: boolean;
}

export default function CustomSearch({
    placeholder = "Search...",
    onSearch,
    className = "",
}: SearchInputProps) {
    const [query, setQuery] = useState("");

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setQuery(e.target.value);
        onSearch(query);
    }

    return (
        <div className={`relative ${className}`}>
            <input
                type='text'
                value={query}
                onChange={handleSearch}
                placeholder={placeholder}
                className='w-full rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
            />
            <svg
                className='absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
            >
                <circle cx='11' cy='11' r='8' />
                <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
        </div>
    );
}
