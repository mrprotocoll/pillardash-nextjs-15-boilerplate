"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";

import { Button } from "pillardash-ui-react";

import CONSTANTS from "@/lib/constants";

const Custom404: NextPage = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8'>
            <div className='w-full max-w-lg text-center'>
                {/* Logo/Brand */}
                <div className='mb-8'>
                    <div className='mb-4 inline-flex items-center space-x-2'>
                        <div className='flex items-end space-x-1'>
                            <div className='h-8 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                            <div className='h-10 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                            <div className='h-9 w-2 rounded-sm bg-gradient-to-t from-blue-600 to-blue-400'></div>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <div className='h-0.5 w-4 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                            <div className='h-0.5 w-6 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                            <div className='h-0.5 w-3 rounded-full bg-gradient-to-r from-green-500 to-green-400'></div>
                        </div>
                    </div>
                    <h1 className='text-2xl font-bold text-gray-900'>{CONSTANTS.appName}</h1>
                </div>

                {/* 404 Error */}
                <div className='mb-8'>
                    <p className='text-9xl font-extrabold italic text-primary'>404</p>
                    <p className='text-2xl font-normal text-primary'>Page not found</p>
                    <p className='mb-6 leading-relaxed text-gray-600'>
                        The page you&#39;re looking for doesn&#39;t exist or has been moved.
                        Don&#39;t worry, it happens to the best of us.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='mb-8 flex flex-col justify-center gap-4 sm:flex-row'>
                    <Button
                        onClick={handleGoHome}
                        size='large'
                        variant='primary'
                        icon={
                            <svg
                                className='mr-2 h-5 w-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                                />
                            </svg>
                        }
                    >
                        Go Home
                    </Button>

                    <Button
                        onClick={handleGoBack}
                        size='large'
                        variant='neutral'
                        icon={
                            <svg
                                className='mr-2 h-5 w-5'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                                />
                            </svg>
                        }
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Custom404;
