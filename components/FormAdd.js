import React, { useContext, useEffect, useState } from 'react'
import { Store } from './contex/myContext'
import{fetchAdd}from "./CrudFunction"
import { useRouter } from 'next/router';

import SearchInput from "./SearchInput";

function FormAdd() {
  const [dataM, setDataM] = useState({_id:"", rm:"", nama:"",namakk:"", alamat:"",rt:"",rw:""})

  const { showForm,  users, setUsers, lastRm, showSearchOK, showAddForm, setShowAddForm, setShowSpinner} = useContext(Store);
  const router = useRouter()

  const saveForm = async(e)=>{
    e.preventDefault()
    const data2 = await fetchAdd("/api/customer/customers2", dataM)
    console.log(data2.data.newUser)
    setShowSpinner(false)
         
      
    const YY = await data2.data.newUser
    let myDataq = await JSON.parse(YY)
   
    setUsers([...users, myDataq])
    alert(data2.data.message)

  setDataM ({_id:"", rm:"", nama:"",namakk:"", alamat:"",rt:"",rw:""})
    setShowAddForm(!showAddForm)
  }

  const getAlamat =(y)=>{
    setDataM({...dataM, alamat: y})
    console.log(y)
  }

 const closeOK = (e)=>{
        e.preventDefault()
        setShowAddForm(false)
      }   

  
  useEffect(()=>{
    setDataM ({...dataM, rm:lastRm })
  },[])    
         console.log(lastRm)
  return (
    <div className='w-full '>
        <div className='flex items-center justify-center'>
        <form className=" w-96 bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70 p-4 mt-4">
            <div className ="mb-2">
                <label htmlFor="rm" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RM</label>
                <input
                 type="text"
                 id="rm"
                 className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
             
                value={lastRm ||""}
                onChange ={(e)=>setDataM({...dataM, rm:e.target.value})} />
               
            </div>
            <div className ="mb-2">
                <label htmlFor="nama" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</label>
                <input

                 type="text" id="nama" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                value={dataM.nama ||""}
                onChange ={(e)=>setDataM({...dataM, nama:e.target.value})}
                />
            </div>
            <div className ="mb-2">
                <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama KK</label>
                <input

                 type="text" id="nama-kk" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                value={dataM.namakk||""}
                onChange ={(e)=>setDataM({...dataM, namakk:e.target.value})}
                />
            </div>
            <div className ="mb-2">
                <label htmlFor="alamat" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RT</label>
                <input
                 type="text" id="alamat" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                value={dataM.rt||""}
                onChange ={(e)=>setDataM({...dataM, rt:e.target.value})}
                />
            </div>
            <div className ="mb-2">
                <label htmlFor="alamat" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RW</label>
                <input

                 type="text" id="alamat" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                value={dataM.rw||""}
                onChange ={(e)=>setDataM({...dataM, rw:e.target.value})}
                />
            </div>
            <div className ="mb-2 relative">
                <label htmlFor="rw" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Alamat</label>
                <SearchInput

                className={'absolute top-0 left-0 z-20  shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'} 
                getAlamat={getAlamat}
                alamatQ = {dataM.alamat}
                />
            </div>
          
            <div className="flex items-center justify-center space-x-4">
               <button onClick={(e)=>saveForm(e)}type="submit" className ={"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>Save</button>

               <button onClick={(e)=>closeOK(e)}type="submit" className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CLOSE</button>

            </div>
          
        </form>
        </div>

    </div>
  )
}

export default FormAdd