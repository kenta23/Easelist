'use client'

import React, { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { addTask } from '../lib/actions';
import { Plus } from 'lucide-react';


export const status = {
    message: ''
}

export default function Form() {
    const [state, formAction] = useFormState(addTask, status);
    const { pending } = useFormStatus();

    const taskInputRef = useRef(null);

   
  return (
   <div>
     <form action={formAction}  className='flex items-end gap-4'>
      <div className='border-b-2 border-[#EC365B] h-[65px] w-[500px] rounded-xl'>
      <input 
        required
        type="text"
        placeholder='Add Task' 
        className='border-none bg-transparent text-pretty indent-4 text-lg w-full h-full outline-none' 
        name='task'
       />
     </div>

    <button
      aria-disabled={pending}
      type='submit'
      className='bg-purple-600 flex items-center justify-center duration-200 ease-in-out cursor-pointer hover:bg-purple-400 w-[50px] h-[50px]'>
      <Plus 
       width={45}
       type='submit'
       color='#ffff'
       className='mx-auto my-auto'
      />
     </button>
   </form>

       <div>
          <p className='text-gray-500 text-md'>{state?.message}</p>
       </div> 
   </div>
  )
}
