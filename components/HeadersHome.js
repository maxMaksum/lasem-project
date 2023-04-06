import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
import Image from 'next/image';

import{signIn} from "next-auth/react"
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { useRouter } from 'next/router';

function Headers() {
  const router = useRouter()
  
  return (
    <div className="bg-green-800 w-full h-20 ">
      <header className="sticky top-0 z-40  flex items-just justify-between  py-1.5 focus-within:shadow-lg w-full h-full">
          <div onClick={()=>router.push("/")} 
          className="flex  items-center cursor-pointer ml-6">
            <Image src="/logo-puskesmas.png" width={60} height={60} />
              <p className='hidden'>LASEM </p>

        </div>

        <div className="flex items-center mr-6">
            <div onClick={signIn}  className="flex items-center justify-center  cursor-pointer">
            <Image src="/google.png" width={40} height={40} />
              <p className='mx-4 sm:inline-flex text-gray-50 bg-gray-800 p-2 bg-opacity-25'>LOGIN WITH GOOGLE</p>
            
            </div>
        </div>
      </header> 
      </div>   
  )
}


 

  

export default Headers