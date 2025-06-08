"use client";

import { useState } from "react";

import Link from "next/link";

import { Button, Input } from "pillardash-ui-react";

import EyeIcon from "@/components/utilities/Icons/EyeIcon";
import EyeOffIcon from "@/components/utilities/Icons/EyeOffIcon";
import LockIcon from "@/components/utilities/Icons/LockIcon";
import { ROUTES } from "@/lib/routes";

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <>
            <div className='w-full max-w-md space-y-5'>
                <p className='text-[28px] font-[600] text-dark'>Create a New Password</p>
                <p className='text-[13px] text-gray-400'>
                    Enter a strong, secure password you will remember. This will replace your old
                    one.
                </p>
                <div className='space-y-8 text-left'>
                    <Input
                        id='password'
                        label='New Password'
                        type={showPassword ? "text" : "password"}
                        value={""}
                        placeholder='Enter your password'
                        icon={<LockIcon />}
                        rightIcon={
                            <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        }
                    />
                    <Input
                        id='password'
                        label='Confirm New Password'
                        type={showPassword ? "text" : "password"}
                        value={""}
                        placeholder='Enter your password'
                        icon={<LockIcon />}
                        rightIcon={
                            <button type='button' onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        }
                    />
                </div>

                <Button className='w-full'>login</Button>
                <div className='flex gap-3'>
                    <p className='text-gray-600'>Changed your mind? </p>{" "}
                    <Link href={ROUTES.login}>
                        <p className='text-sm text-primary-600 hover:underline'>Go back to login</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
