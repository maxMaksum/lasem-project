import React, { useContext,  useEffect,  useRef,  useState } from 'react';
import { Store } from "./contex/myContext"
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import SearchInput from "./SearchInput";
import Spinner from './Spinner';
const axios = require('axios').default;
import{fetchAdd, fetchUpdate, fetchDelete, fetchSearch }from "./CrudFunction"

function TableNew() {

  const { users, setUsers, removeUsers, showForm, setShowForm, showSpinner, setShowSpinner, setUserEdit } = useContext(Store);
  const [showEdit, setShowEdit] = useState(false)
  const [adminId, setAdminId] = useState(null)
  const [adminEdit, setAmdinEdit] = useState({})
  
const router = useRouter()

const closeButton = (e)=>{
    e.preventDefault()
    setAdminId(null)

}

const editData=(e, x)=>{
    e.preventDefault()
    setShowEdit(true)
    setAdminId(x._id)
    setAmdinEdit(x)
    const myUser = users.filter(user=>{
        return user._id == x._id
     })
     setUserEdit(myUser[0])
  }

const saveData=async (e)=>{
    e.preventDefault()
    const res = await fetchUpdate(`/api/customer3/${adminEdit._id}`, adminEdit)
    setShowSpinner(true)
    console.log(res.data)
    const YY = await res.data.myData
    let myDataq = await JSON.parse(YY)
    setShowSpinner(false)
    const myUserq = users.map(x=>{
        if(x._id == myDataq._id){
            return{
                ...x, 
                rm:myDataq.rm,
                nama:myDataq.nama,
                alamat:myDataq.alamat,
                rt:myDataq.rt, 
                rw:myDataq.rw
            }
        }
       return x 
    })
  
    console.log("p",myUserq)
    await setUsers(myUserq)
    alert(res.data.message)
   
    setAdminId(false)

 }

  const detailData=(e, x)=>{
    e.preventDefault()
    const myUser = users.filter(user=>{
      if(user._id === x._id){
        setUserEdit(user)
      }
      
    })
    setShowForm(true)
   
 }

 const deleteData = async (e, customersId) => {
    e.preventDefault()
    setShowSpinner(true)
    const response = await fetchDelete(`/api/customer3/${customersId}`) 
    alert(response.data.message)
    setShowSpinner(false)
    setShowForm(false)
    const newUser = users.filter(x=>{
    return x._id !== customersId})
    setUsers(newUser)
        
     }
         
 const getAlamat =(y)=>{
    setAmdinEdit({...adminEdit, alamat: y})
    console.log(y)
    }
  return (
    <div className=' relative h-screen z-20 w-full mx-auto bg-gray-100'>
        <Spinner />
        <div className =" text-sm text-left text-gray-900 dark:text-gray-400 mt-2 ">
            <div className=
            "text-sm sm:text-md grid grid-cols-12 gap-4 place-content-center my-2 h-10 mx-4 text-gray-900 p-2">
                    <p className="hidden md:grid col-span-2 bg-green-600 h-8 p-2">RM</p>
                    <p className="hidden md:grid col-span-2 bg-green-600 h-8 p-2">NAMA</p>
                    <p className="hidden md:grid col-span-2 bg-green-600 h-8 p-2">NAMA KK</p>
                    <p className="hidden md:grid col-span-2 bg-green-600 h-8 p-2">ALAMAT</p>
                    <p className= 'hidden md:grid col-span-1 bg-green-600 h-8 p-2'>RT</p>
                    <p className= 'hidden md:grid col-span-1 bg-green-600 h-8 p-2'>RW</p>
                    <p className= 'hidden md:grid col-span-2 bg-green-600 h-8 p-2'>ACTIONS</p>
              </div>
         { users&&users.map((customer, index )=> (
                 <div className=""> 
            {adminId != customer._id?(
        <div className="bg-gray-100 h-72 md:h-8 text-sm sm:text-md grid grid-cols-12 gap-y-6 gap-x-2 place-content-center my-2 mx-4 text-gray-900 px-2 rounded overflow-hidden shadow-lg" key={customer._id}>

        <div className='grid col-span-12'> 
            <div className='grid grid-cols-12 gap-2'>                   
                <p className="hidden md:grid col-span-2 rounded p-1 bg-transparent">{customer.rm}</p>
                <p className="hidden md:grid col-span-2 rounded p-1 bg-transparent">{customer.nama}</p>
                <p className="hidden md:grid col-span-2 rounded p-1 bg-transparent">{customer.namakk}</p>
                <p className="hidden md:grid col-span-2 rounded p-1 bg-transparent">{customer.alamat}</p>
                <p className= 'hidden md:grid col-span-1 rounded p-1 bg-transparent'>{customer.rt}</p>
                <p className= 'hidden md:grid col-span-1 rounded p-1 bg-transparent'>{customer.rw}</p>

                <p className="hidden md:grid col-span-2  rounded p-1 bg-transparent">
                    <div className='flex justify-around items-center'>
                          <div onClick={(e)=>deleteData(e, customer._id)} className=' text-green cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><CloseIcon /></div>
                        <div  onClick={(e)=>editData(e, customer)} className=' cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><BorderColorIcon /></div>
                        <div  onClick={(e)=>detailData(e, customer)} className=' cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><DataSaverOnIcon/></div>
                    
                    </div>
                </p>    

        <div className='col-span-12 md:hidden  bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70 '>
            
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >RM</div>
                    <div className="grid col-span-8"> {customer.rm}</div>
                </div>
            </p>
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >Nama</div>
                    <div className="grid col-span-8"> {customer.nama}</div>
                </div>
            </p>
            
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >Nama KK</div>
                    <div className="grid col-span-8"> {customer.namakk}</div>
                </div>
            </p>
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >Alamat</div>
                    <div className="grid col-span-8"> {customer.alamat}</div>
                </div>
            </p>
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >Rt</div>
                    <div className="grid col-span-8"> {customer.rt}</div>
                </div>
            </p>
            <p className="grid col-span-12 h-7 text-justify">
                <div className='grid grid-cols-12 gap-2'>
                    <div className="grid col-span-4 " >Rw</div>
                    <div className="grid col-span-8"> {customer.rw}</div>
                </div>
            </p>
        </div>
        </div>
    </div>

        <div className='grid md:hidden col-span-12'>
            <div className='flex justify-around items-center'>
                <div onClick={(e)=>deleteData(e, customer._id)} className=' text-green cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><CloseIcon /></div>
                <div  onClick={(e)=>editData(e, customer)} className=' cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><BorderColorIcon /></div>
                <div  onClick={(e)=>detailData(e, customer)} className=' cursor-pointer w-5 h-5 rounded-full bg-transparent flex items-center justify-center'><DataSaverOnIcon/></div>
                    
            </div>
        </div> 
    </div>):
    ( 
        <div className="h-72 md:h-8 text-sm sm:text-md grid grid-cols-12 gap-y-6 gap-x-2 place-content-center my-2 h-10 mx-4 text-gray-900 px-2"
        key={customer._id}>

            <div className="hidden md:grid col-span-12 bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70">
            <div className='grid grid-cols-12 gap-2'>
                    <input className="hidden md:grid col-span-2 border-2 border-gray-900 rounded p-1 bg-transparent"
                        type="text"
                        placeholder='RM'
                        onChange={(e)=>setAmdinEdit({...adminEdit, rm:e.target.value})}
                        value = {adminEdit.rm} 
                        />
                    <input className="hidden md:grid col-span-2 border-2 border-gray-900 rounded p-1 bg-transparent"
                        type="text"
                        placeholder='Nama'
                        onChange={(e)=>setAmdinEdit({...adminEdit, nama:e.target.value})}
                        value = {adminEdit.nama}
                        />
                    <input className="hidden md:grid col-span-2 border-2 border-gray-900 rounded p-1 bg-transparent"
                        placeholder='Nama KK'
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, namakk:e.target.value})}
                        value = {adminEdit.namakk}/>
                    <div className="hidden md:grid col-span-2 border-2 border-gray-900 rounded p-1 bg-transparent relative">
                        <div  className="absolute top-0 left-0 z-20">
                            <SearchInput 
                            getAlamat={getAlamat}
                            alamatQ = {adminEdit.alamat}/>
                        </div>
                    </div>
                        
                    <input className="hidden md:grid col-span-1 border-2 border-gray-900 rounded p-1 bg-transparent" 
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, rt:e.target.value})}
                        value = {adminEdit.rt} /> 
                    <input className="hidden md:grid col-span-1 border-2 border-gray-900 rounded p-1 bg-transparent"
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, rw:e.target.value})}
                        value = {adminEdit.rw} />
                <div className='hidden md:grid col-span-2'>
                <div className='flex justify-around items-center space-x-4 font-bold'>
                    <div onClick={(e)=>closeButton(e)} className='cursor-pointer '>
                        Close
                    </div>
                    <div  onClick={(e)=>saveData(e)} className=' cursor-pointer'>
                        Save
                    </div>    
                </div>
           </div> 
        </div>          
    </div>    
            <div className='grid col-span-12 md:hidden  bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70'> 
                <div className='grid grid-cols-12 gap-2'>
                    <input className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded"
                        type="text"
                        placeholder='RM'
                        onChange={(e)=>setAmdinEdit({...adminEdit, rm:e.target.value})}
                        value = {adminEdit.rm} 
                        />
                    <input className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded" 
                        type="text"
                        placeholder='Nama'
                        onChange={(e)=>setAmdinEdit({...adminEdit, nama:e.target.value})}
                        value = {adminEdit.nama}
                        />
                    <input className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded"
                        placeholder='Nama KK'
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, namakk:e.target.value})}
                        value = {adminEdit.namakk}/>
                    <div  className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded relative">
                        <div  className="absolute top-0 left-0 z-20">
                            <SearchInput 
                            getAlamat={getAlamat}
                            alamatQ = {adminEdit.alamat}/>
                        </div>
                    </div>
                        
                    <input className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded" 
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, rt:e.target.value})}
                        value = {adminEdit.rt} /> 
                    <input className="border-2 border-gray-400 grid col-span-12 h-7 text-justify rounded" 
                        type="text"
                        onChange={(e)=>setAmdinEdit({...adminEdit, rw:e.target.value})}
                        value = {adminEdit.rw} />
                </div>
            </div>
            <div className='grid md:hidden col-span-12 p-2'>
                <div className='flex justify-around items-center space-x-4 font-bold'>
                    <div onClick={(e)=>closeButton(e)} className='cursor-pointer '>
                        Close
                    </div>
                    <div  onClick={(e)=>saveData(e)} className=' cursor-pointer'>
                        Save
                    </div>    
                </div>       
            </div>  
        </div>
            
        )}
        </div>  
        ))}
    </div>
    </div>
  )
}

export default TableNew