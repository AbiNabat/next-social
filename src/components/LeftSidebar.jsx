import React from 'react';
import Link from "next/link";
import {FaXTwitter} from "react-icons/fa6";
import {HiHome} from "react-icons/hi";
import {SignedIn, SignedOut, SignOutButton} from "@clerk/nextjs";

const LeftSidebar = () => {
    return (
        <div className='flex flex-col gap-4 p-3'>
            <Link href='/'>
                <FaXTwitter className='w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full' />
            </Link>
            <Link href='/' className='flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200'>
                <HiHome className='w-7 h-7' />
                <span className='font-bold hidden xl:inline'>Home</span>
            </Link>



                <SignedIn>
                    <SignOutButton className='bg-blue-400 text-white text-center rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline' />
                </SignedIn>
                <SignedOut>
                    <Link  href='/sign-in'>
                        <button className='bg-blue-400 text-white rounded-full hover:brightness-95 transition-all duration-200 w-48 h-9 shadow-md hidden xl:inline'>Sign In</button>
                    </Link>
                </SignedOut>


        </div>
    );
};

export default LeftSidebar;