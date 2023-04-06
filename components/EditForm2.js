import React, { useContext, useEffect, useState } from 'react'
import {Types}from "mongoose"
import { Store } from './contex/myContext';
import{fetchAdd, fetchUpdate, fetchDelete, fetchSearch }from "./CrudFunction"
import { useRouter } from 'next/router';
import SearchInput from "./SearchInput";

function EditForm2() {
  const { addUsers, users,  setUsers, removeUsers, showUpdate, userEdit, setShowSpinner, setUserEdit, setShowUpdate,updateUsers } = useContext(Store);
  const [showAdd, setShowAdd] =useState(true)
  const [showEdit, setShowEdit] =useState(true)
  const [dataM, setDataM] = useState({_id:"", rm:"", nama:"",namakk:"", alamat:"",rt:"",rw:""})
  const [showInput, setShowInput] =useState(true)

 const addForm = async (e)=>{
        e.preventDefault()
        setShowInput(false)
        setShowAdd(!showAdd)
        setDataM({...dataM, nama:"" })
      
    }

  
    const saveForm = async(e)=>{
        e.preventDefault()
        setShowSpinner(true)
        setShowAdd(!showAdd)
        const data2 = await fetchAdd("/api/customer/customers2", dataM)
        setShowSpinner(false)
         
      
        const YY = await data2.data.newUser
        let myDataq = await JSON.parse(YY)
       
        setUsers([...users, myDataq])
        alert(data2.data.message)
  
        setShowUpdate(!showUpdate)}

    const updateForm = async (e)=>{
        e.preventDefault()
        setShowEdit(true)
        setShowInput(false)
        setShowSpinner(true)

        const res = await fetchUpdate(`/api/customer3/${dataM._id}`, dataM)
        setShowSpinner(false)
        alert(res.data.message)
        
      
        let myDataq1 = await JSON.parse(res.data.myData)
        console.log(myDataq1)
        const myUserq = users.map(x=>{
            if(x._id == myDataq1._id){
                return{
                    ...x, 
                    rm:myDataq1.rm,
                    nama:myDataq1.nama,
                    namakk:myDataq1.namakk,
                    alamat:myDataq1.alamat,
                    rt:myDataq1.rt, 
                    rw:myDataq1.rw
                }
            }
        return x 
    })
  
    setUsers(myUserq)
    setShowUpdate(false)
  
    }

    const deleteForm = async(e, id)=>{
    e.preventDefault()
    setShowSpinner(true)
    const res = await fetchDelete(`/api/customer3/${id}`)

    const {message} = await res.data

    console.log(message)

    alert(message)
        setShowSpinner(false)
        setShowUpdate(false)
        
    const newUser = users.filter(x=>{
        return x._id !== id})
        setUsers(newUser)
    }

    const getAlamat =(y)=>{
        setDataM({...dataM, alamat: y})
        console.log(y)
    }
    const closeOK = (e)=>{
        e.preventDefault()
        setShowUpdate(!showUpdate)
        setShowEdit(true)
        
    }   
     
    useEffect(()=>{
        setDataM(userEdit)
    },[userEdit])
      
  return (
    <div className='w-full '>
        <div className='flex items-center justify-center'>
        <form className=" w-96 z-50 bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70">
            <div className ="mb-2">
                <label htmlFor="rm" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RM</label>
                <input
                 type="text"
                 id="rm"
                 className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
             
                value={dataM.rm ||""}
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
                onChange ={(e)=>setDataM({...dataM, rt:e.target.value})}
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
               
               <button onClick={(e)=>updateForm(e, dataM)}type="submit" className ={"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>Update</button>

               <button 
               onClick={(e)=>addForm(e)}
               type="submit"
               className ={showAdd?"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":"hidden"} 
               
               >Add</button>

                <button onClick={(e)=>saveForm(e)}type="submit" className ={!showAdd?"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":"hidden"}>Save</button>

                <button onClick={(e)=>deleteForm(e, dataM._id)}type="submit" className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">DELETE</button>

                <button onClick={(e)=>closeOK(e)}type="submit" className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CLOSE</button>
            </div>
          
        </form>

        </div>

    </div>
  )
}

export default EditForm2