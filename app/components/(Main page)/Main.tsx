import React, { ReactHTMLElement, useEffect, useRef, useState } from 'react'
import { Plus, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import TaskLists from '../TaskLists'
import { useFormState, useFormStatus } from 'react-dom'
import { addTask, getAllTaskList } from '@/app/lib/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { revalidatePath } from 'next/cache'
import { useSession } from 'next-auth/react'
import Form from '../Form'
import Task from '../Task'
import { Tasktype } from '@/app/lib/type'


export default async function Main() {
  const data = await getAllTaskList();


  return (
    <div className='mx-auto mt-[100px] h-screen overflow-y-auto'>
     <div className=''>
       {/**INPUT TASK USER */} 
        <Form />
         {/**FILTER FUNCTION */}
        <Task data={data}/>
     </div>
    </div>
  )
}
