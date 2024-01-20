import Image from 'next/image'
import Main from './components/(Main page)/Main'
import Profile from './components/(Main page)/Profile'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'


export default async function Home() {
  const session = await getServerSession(authOptions);
  
    if(!session?.user) {
       return redirect('/login')
    }
    
     return (
      <main className='flex-1 mx-[120px] my-[20px]'>
         <div className='flex flex-col relative p-4'> 
               <Profile />
               <Main />
         </div>
      </main>
     )
}
