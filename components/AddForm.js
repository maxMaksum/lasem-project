import React, {useContext, useEffect, useState} from 'react'
import { Store } from "./contex/myContext"
import { useRouter } from 'next/router';
import SearchInput from "./SearchInput";
import{fetchAdd, fetchUpdate, fetchDelete, fetchSearch }from "./CrudFunction"

const axios = require('axios').default;

function AddForm({data2}) {

  const {rm, nama, namakk, alamat, rt, rw} = data2
  const router = useRouter()
  const [showAdd, setShowAdd] =useState(true)
  const [showEdit, setShowEdit] =useState(true)
  const { addUsers, setUsers, users, setShowSpinner } = useContext(Store);
  const [newUser, setNewUser] = useState([])
  const [showInput, setShowInput] =useState(true)
  const [dataQ, setDataQ] = useState({
    _ida:"",
    rm:"",
    nama:"",
    namakk:"",
    rt:"",
    rw:"", 
    alamat:""

})

useEffect(()=>{
  setDataQ({...dataQ,
    _id : data2._id,
     rm : data2.rm,
    nama : data2.nama,
    alamat : data2.alamat,
    rt : data2.rt,
    rw : data2.rw,
  
  })
},[])
        
const addForm = async (e)=>{
  e.preventDefault()
  setShowInput(false)
  setShowAdd(!showAdd)
  setDataQ({...dataQ, nama:"" })

}

const editForm = async (e)=>{
  e.preventDefault()
  setShowInput(false)
  setShowEdit(false)

}

const saveForm = async(e)=>{
  e.preventDefault()
  setShowSpinner(true)
  setShowAdd(!showAdd)
  const data2 = await fetchAdd("/api/customer/customers2", dataQ)
  setShowSpinner(false)
  const data3 = JSON.parse(data2.data.newUser)
  setUsers([...users, {rm:data3.rm, 
      nama:data3.nama, 
      alamat:data3.alamat, 
      rm:data3.rm,
      rt:data3.rt}])
  alert(data2.data.message)
  }

const updateForm = async (e)=>{
    e.preventDefault()
    setShowEdit(true)
    setShowInput(false)
    setShowSpinner(true)
    const res = await fetchUpdate(`/api/customer3/${dataQ._id}`, dataQ)
    setShowSpinner(false)
    let myDataq = JSON.parse(res.data.myData)
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

    alert(res.data.message)
    setUsers(myUserq)
  }
    const deleteForm = async(e, id)=>{
      e.preventDefault()
      setShowSpinner(true)
      const res = await fetchDelete(`/api/customer3/${id}`)
      alert(res.data.message)

      setShowSpinner(false)

      const newUser = users.filter(x=>{
      return x._id !== id})

      setUsers(newUser)
      router.push("/")

    }

    const getAlamat =(y)=>{
      setDataQ({...dataQ, alamat: y})
      
    }

    const closeOK = (e)=>{
      e.preventDefault()
      setShowEdit(true)
      router.push("/")
      
    }   

  return (
          <div className='w-full h-screen bg-white rounded-lg border border-gray-200 shadow-md p-2 dark:bg-gray-800 dark:border-gray-70'>
            <p className='text-center p-2'>RM DETAIL</p>
            <div className='flex items-center justify-center'>
              <form className=" w-96 bg-gray-200 p-4 ">
                <div className ="mb-2">
                <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RM</label>
                    <input type="text" 
                    id="rm" 
                    className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    placeholder="RM"
                    value={dataQ.rm}
                    onChange ={(e)=>setDataQ({...dataQ, rm:e.target.value})} />
                
                </div>

              <div className ="mb-2">
                  <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama</label>
                  <input 
                  type="text" id="nama" 
                  className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                  value={dataQ.nama}
                  placeholder="Nama"
                  onChange ={(e)=>setDataQ({...dataQ, nama:e.target.value})}
                  />
              </div>
              <div className ="mb-2">
                  <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nama KK</label>
                  <input 
                    type="text" 
                    id="nama-kk" 
                    className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    value={dataQ.namakk}
                    placeholder="Nama KK"
                    onChange ={(e)=>setDataQ({...dataQ, namakk:e.target.value})}
                  />
              </div>
              
              <div className ="mb-2">
                <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RT</label>
                    
                    <input type="text" id="rt" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    value={dataQ.rt}
                    placeholder="RT"
                    onChange ={(e)=>setDataQ({...dataQ, rt:e.target.value})}
                    />
                </div>
              <div className ="mb-2">
                <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RW</label>
                    <input type="text" id="rw" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    value={dataQ.rw}
                    placeholder="RW"
                    onChange ={(e)=>setDataQ({...dataQ, rw:e.target.value})}
                    />
                </div>
              <div className ="mb-2">
              <label htmlFor="nama-kk" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RW</label>
                  <SearchInput 
                  className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  getAlamat={getAlamat}
                  alamatQ = {dataQ.alamat}
                  
                  />
                  
              </div>
              
            
              <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={(e)=>editForm(e)}type="submit"
                      className = {showEdit ? "text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":"hidden"
                      }>Edit
                    </button>
                  <button onClick={(e)=>updateForm(e, dataQ)}type="submit" className ={showEdit ? "hidden":"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}>Update</button>

                  <button 
                      onClick={(e)=>addForm(e)}
                      type="submit"
                      className ={showAdd?"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":"hidden"} 
                      
                  >Add</button>

                    <button onClick={(e)=>saveForm(e)}type="submit" className ={!showAdd?"text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800":"hidden"}>Save</button>

                    <button onClick={(e)=>deleteForm(e, dataQ._id)}type="submit" className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">DELETE</button>

                    <button onClick={(e)=>closeOK(e)}type="submit" className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">CLOSE</button>
                </div>
              </form>
            </div>
           </div>
    )
}
export default AddForm
