'use client'


import React from 'react'
import { signIn } from 'next-auth/react'


export default function page() {

  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className='w-auto px-6 py-4'>
            <div>
                 <h1>You need to login before to proceed</h1>
                 <button className='px-4 py-2 font-medium text-md h-[30px] my-auto text-center flex items-center mt-7 rounded-md bg-violet-700 text-white'
                    onClick={() => signIn()}
                  >
                    Login via Github
                 </button>
            </div>
        </div>
    </div> 
  )
}
