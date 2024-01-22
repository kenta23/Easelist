import { getAllTaskList } from '@/app/lib/actions'
import Form from '../Form'

export default async function Main() {
   const data = await getAllTaskList();

  return (
    <div className='mx-auto mt-[100px] h-screen overflow-y-auto'>
     <div className=''>
       {/**INPUT TASK USER */} 
        <Form data={data}/>
         {/**FILTER FUNCTION */}
     </div>
    </div>
  )
}
