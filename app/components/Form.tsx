'use client'

import React, { useOptimistic, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom';
import { addTask } from '../lib/actions';
import { Plus } from 'lucide-react';
import Task from './Task';
import { Tasktype } from '../lib/type';
import { useSession } from 'next-auth/react';


export const status = {
    message: ''
}

export default function Form({ data }: {data: any}) {
    const [state, formAction] = useFormState(addTask, status);
    const { pending } = useFormStatus();
    const formRef = useRef<HTMLFormElement>(null);
    const { data: session } = useSession();

    //OPTIMISTIC DATA DOESNT APPLY TO EDIT AND DELETE FUNCTION, IT DOESNT SHOW UP THE NEW DATA MUTATED
    const [optimisticData, addOptimisticData] = useOptimistic(
      data, 
      (state, optimisticVal: Tasktype) => {
          return [...state, optimisticVal];
      })

    const taskInputRef = useRef<HTMLFormElement>(null);
   
  
  return (
   <div>
     <form
     ref={formRef}
     action={async (formData) => {
       addOptimisticData({
         id: Math.random(),
         title: formData.get('task') as string,
         userId: session?.user?.email as string,
         createdAt: new Date(),
         updatedAt: null
       });
       formRef.current?.reset();
       formAction(formData)
     
     }}  className='flex items-end gap-4'>
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
      disabled={pending}
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

       <Task data={optimisticData}/>
   </div>
  )
}
