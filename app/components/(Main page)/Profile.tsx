
'use client'
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


export default function Profile() {
   const { data: session } = useSession();
  return (
    <div className=''>
        {/**PROFILE AVATAR OF THE USER */}
       <div className='flex gap-4 items-center absolute right-3  '>
           <Image 
             width={60}
             height={60}
             alt='User Github avatar'
             className='rounded-full cursor-pointer'
             src={session?.user?.image ? session?.user?.image : ''}
           />

          {session?.user ?  
            <button 
             onClick={() => signOut()} 
             className='bg-rose-500 w-auto px-2 h-[30px] rounded-md text-white'>
              Sign Out
            </button>
            :
            <button 
             onClick={() => signIn()} 
             className='bg-green-500 w-auto px-2 h-[30px] rounded-md text-white'>
             Log in
           </button>
          }
          
       </div>
    </div>
  )
}
