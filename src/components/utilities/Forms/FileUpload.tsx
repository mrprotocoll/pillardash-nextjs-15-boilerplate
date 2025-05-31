"use client";

import React, { useState } from "react";

import { File, X } from "lucide-react";

interface FileUploadProps {
    onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setUploadedFile(file);
            setUploadProgress(10);

            // file upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);

            onFileChange(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setUploadedFile(file);
            setUploadProgress(10);

            // Simulate file upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);

            onFileChange(file);
        }
    };

    const handleCancelUpload = () => {
        setUploadedFile(null);
        setUploadProgress(0);
        onFileChange(null);
    };

    return (
        <div className='space-y-4'>
            {!uploadedFile ? (
                <div
                    className='rounded-lg border-2 border-dashed border-gray-300 p-8 text-center'
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <p
                        className='cursor-pointer text-teal-600 hover:underline'
                        onClick={() => document.getElementById("fileInput")?.click()}
                    >
                        Click to Upload
                    </p>
                    <input
                        id='fileInput'
                        type='file'
                        className='hidden'
                        onChange={handleFileUpload}
                    />
                    <p className='text-gray-500'>or drag and drop</p>
                    <p className='mt-2 text-sm text-gray-400'>(Max. File size: 25 MB)</p>
                </div>
            ) : (
                <div className='rounded-lg border p-4'>
                    <div className='mb-2 flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className='mr-3 rounded-lg bg-blue-100 p-2'>
                                <File size={24} className='text-blue-500' />
                            </div>
                            <div>
                                <p className='text-sm font-medium'>{uploadedFile.name}</p>
                                <p className='text-xs text-gray-500'>
                                    {(uploadedFile.size / 1024).toFixed(2)}KB/
                                    {(uploadedFile.size / 1024).toFixed(2)}KB
                                </p>
                            </div>
                        </div>
                        <button onClick={handleCancelUpload} className='text-red-500'>
                            <X size={16} />
                        </button>
                    </div>
                    <div className='h-2.5 w-full rounded-full bg-gray-200'>
                        <div
                            className='h-2.5 rounded-full bg-gray-800'
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p className='mt-1 text-right text-xs text-gray-500'>{uploadProgress}%</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
