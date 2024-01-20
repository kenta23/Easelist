import React from 'react'
import Image from 'next/image';
import Link from 'next/link';


export default function Sidebar() {
  return (
      <div className="w-[290px] relative  h-[900px] border-r border-rose-500 flex-col justify-start items-center inline-flex">
        {/**LOGO */}
        <div className="h-[90px] w-full border-b border-rose-500  justify-start items-center flex">
          <div className="w-full px-4">
            <div className='p-2'>
              <Image src='/Logo.png'
               width={100} 
               height={100} 
               alt="EaseList Logo" />
            </div>
          </div>
        </div>


        {/**Links */}

    <div className='my-auto'>
         <div className='flex flex-col gap-6 '>
             <Link href={''}
              className='flex flex-row gap-3'
             >
                <Image src="/home.svg"
                  width={25}
                  height={25}
                  alt="" />
                <h1 className='text-[22px]'>Home</h1>
             </Link>

             <Link href={''}
              className='flex flex-row gap-3'
             >
                <Image src="/tasks.svg"
                  width={25}
                  height={25}
                  alt="" />
                <h1 className='text-[22px]'>Your Tasks</h1>
             </Link>

             <Link href={''}
              className='flex flex-row gap-3'
             >
                <Image src="/finished tasks.svg"
                  width={25}
                  height={25}
                  alt="" />
                <h1 className='text-[22px]'>Finished Tasks</h1>
             </Link>

             <Link href={''}
              className='flex flex-row gap-3'
             >
                <Image src="/home.svg"
                  width={25}
                  height={25}
                  alt="" />
                <h1 className='text-[22px]'>Schedules Tasks</h1>
             </Link>
         </div>

    </div>
        
      </div>
  );
}
