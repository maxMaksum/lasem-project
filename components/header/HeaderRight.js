import Link from "next/link";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import{useSession, signIn, signOut} from "next-auth/react"
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import React, {useContext, useEffect, useState} from 'react'
import { Store } from './../contex/myContext'

function HeaderRight() {

  const { showForm, showSearchOK, showAddForm, setShowAddForm, showSpinner} = useContext(Store);
  ''
  const router = useRouter()

  return (
    <div className="w-full flex items-center justify-around">
        <div onClick={(e)=>setShowAddForm(!showAddForm)}  
          className="flex items-center justify-center cursor-pointer space-x-2">
          <p >Add RM</p>
          < DataSaverOnIcon />
        </div>
        <div 
          onClick={()=>router.push("/admin")} 
          className="flex  items-center space-x-4 cursor-pointer ">
          <p className='inline-flex'> Admin </p>
        </div>
        <div onClick={signOut} >
            <LogoutIcon className="cursor-pointer" />
        </div>    
    </div>
  );
}

export default HeaderRight;
