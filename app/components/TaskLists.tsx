"use client"

import { SlidersHorizontal, PencilLine, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { deleteItem, updateItem } from '../lib/actions'
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { Tasktype } from '../lib/type';

const statusdelete = {
   message: ''
}
const statusUpdate = {
   message: ''
}

export default function TaskLists({ data }: { data: Tasktype}) {
   const [ edit, setEdit ] = useState<boolean>(false);
   const { pending } = useFormStatus();
   const router = useRouter()
   //const updateAction = updateItem.bind(null, data.id);
   //const deleteAction = deleteItem.bind(null, data.id);
   const [state, deleteAction] = useFormState(deleteItem, statusdelete);
   const [stateUpdate, updateAction] = useFormState(updateItem, statusUpdate);


  function handleSubmit(e: React.FormEvent) {
      e.preventDefault();

      setEdit(false);
      console.log("Submitted data")
  }

  function handleUpdate (e: React.FormEvent) {
     e.preventDefault()

     setEdit(false);
     console.log("Submitted data")
     router.refresh();
  }

  return (
      <div>
          <div className="max-w-[700px] w-[600px] min-w-[200px] h-[70px] pt-4 px-6 rounded-xl shadow border border-fuchsia-500 justify-start items-start gap-[400px]">
            <div className='w-auto flex justify-between items-center'>
              <div className='flex w-fit flex-row items-center gap-4 my-auto'>
                 <input type="checkbox" className='w-[20px] h-[20px]'/>
                 {edit ?
                 <form action={updateAction} className='flex flex-row gap-4 items-center '>
                      <input 
                       type="text"
                       className='border-violet-500 border rounded-sm px-4 py-2' 
                       name='edit-content'
                      />  
                      <input 
                       type="hidden"
                       className='border-violet-500 border rounded-sm px-4 py-2' 
                       name='id'
                       value={data.id}
                      />  
                      <button  
                       type='submit'
                       aria-disabled={pending}
                       className='text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-300 duration-200 ease-linear'>
                        Submit 
                      </button> 
                  </form> :
                  <h1 className='text-xl'>{data.title}</h1> 
                 }
              </div>

             <form className='flex gap-2'>
                   <button
                    type='button'
                    onClick={() => setEdit(prev => !prev)}
                    className='w-[35px] flex items-center justify-center h-[35px] rounded-full bg-yellow-600'>
                     <PencilLine 
                        color='#ffff'
                        width={25}
                        height={25}
                     />
                   </button>

                   <button type='submit' formAction={deleteAction} className='w-[35px] flex items-center justify-center h-[35px] rounded-full bg-red-600'>
                     <Trash 
                         color='#ffff'
                         width={25}
                         height={25}
                     />
                   </button>
                   {/**for delete input */}
                   <input type="hidden" name='id' value={data.id}/>
             </form>
             {/**STATUS*/}
             </div>
        </div>
              <p>{state?.message}</p>
              {/**STATUS FOR EDIT */}
              <p className='text-green-500 font-medium text-sm'>{stateUpdate?.message}</p> 
      </div> 
  )
}
