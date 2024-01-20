

import { SlidersHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tasktype, typedata } from '../lib/type'
import TaskLists from './TaskLists'
import { getAllTaskList } from '../lib/actions'


export default function Task({ data }: { data: Tasktype[] | Error }) {
  // Render your component using the data
  return (
    <div>
      <div className='flex mt-[60px] gap-2 items-center'>
        <SlidersHorizontal 
          width={27} 
          height={27}
          color='#726266'
        />
        <p className='text-[22px] text-stone-500'>Filter</p>
      </div>

      <div className='flex flex-col gap-8 items-start mt-10'>
        {Array.isArray(data) ? (
          data.map((item: Tasktype) => (
            <TaskLists key={item.id} data={item} />
          ))
        ) : (
          <div>
            {/* Handle error case */}
            <p>Error loading data.</p>
          </div>
        )}
      </div>
    </div>
  );
}



