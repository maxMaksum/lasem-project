import React, { useState } from 'react'
const axios = require('axios').default;

function FormAdmin() {
    const [admin, setAdmin] = useState({email:"", role:false,_id:""})
    const [adminLists, setAdminLists] = useState([])
    const [searchAdmin, setSearchAdmin] = useState("")
    const [editAdmin, setEditAdmin] = useState(true)
    const [newInput, setNewInput] = useState(true)
    
    const saveForm = async (e)=>{
        e.preventDefault()
        const dataNew = await fetchAdd("/api/admin/admin",admin)
        setNewInput(false)
        console.log(dataNew) 
      
        const YY = await dataNew.data.newUser
        let myDataq = await JSON.parse(YY)
        await setAdminLists([...adminLists, myDataq])
        alert(dataNew.data.message)
      
        setAdmin({email:"", role:false, _id:""})
        setEditAdmin(true)

    }

  const editForm = async (e)=>{
      e.preventDefault()
      setEditAdmin(false) 
  }

  const addForm = async (e)=>{
    e.preventDefault()
    setNewInput(false)
    setAdmin(
      {email:"", role:false}
    )
}

    const editClick= (e,x)=>{
      e.preventDefault()
      setEditAdmin(true)
      setAdmin({
        ...admin, email:x.email, role:x.role, _id:x._id
      })
    
    }

    const updateForm = async (e)=>{
      e.preventDefault()
      alert("are you sure update the admin?")
      const dataNew = await fetchUpdate(`/api/newAdmin/${admin.email}`, admin)
      const YY = await dataNew.data.myData
      let myDataq = await JSON.parse(YY)
      const myUserq = adminLists.map(x=>{
        if(x._id == myDataq._id){
            return{
                ...x, 
                email:myDataq.email,
                role:myDataq.role,
               
            }
        }
       return x 
    })
  
    await setAdminLists(myUserq)
    alert(dataNew.data.message)
   
      setEditAdmin(true)   

    }

    const deleteForm = async (e, id) => {
      e.preventDefault()
      alert("are you sure to delete the admin?")
      const response =  fetchDelete(`/api/newAdmin/${admin.email}`)
      const data = await response
 
      if(data.status==200){
        const myUserq = adminLists.filter(x=>{
          if(x._id !== admin._id){
              return{
                x
              }
          }
         return x 
      })
      setAdminLists (myUserq)
      }
      alert(data.data.message)
      return data      
   }

    const fetchDelete = async(url)=>{
      try{
            const response = await axios.delete(url)
            console.log(response)
            return response
          }
          catch (error) {
            console.error(error);
          }
        }

    const fetchUsers = async (e)=>{
      e.preventDefault()
      const dataNew = await fetchAllAdmin("/api/admin/admin")
      console.log(dataNew.data.newAdmin)
      const newAdmin = JSON.parse(dataNew.data.newAdmin)
      console.log(newAdmin)
      setAdminLists(newAdmin)
      return dataNew }

    const fetchUser = async (e)=>{
        e.preventDefault()
        console.log(searchAdmin)
        const dataNew = await fetchAdmin(`/api/newAdmin/${searchAdmin}`)
        console.log(dataNew)
        const dataUser = JSON.parse(dataNew.data.newAdmin)
        console.log(dataUser)
        setAdmin({
          ...admin, email:dataUser.email, role:dataUser.role
        })
        return dataNew 
      }  

    const fetchAdd = async(url, x)=>{
      try{
            const response = await axios.post(url, x)
            return response 
          }
          catch (error) {
            console.error(error);
          }
        }

    const fetchUpdate = async(url, x)=>{
        try{
            const response = await axios.put(url, x)
              setEditAdmin(true)
              return response 
              
            }
            catch (error) {
              console.error(error);
              setEditAdmin(true)
            }
        }

    const fetchAllAdmin = async(url)=>{
        try{
              const response = await axios.get(url)
              return response 
            }
            catch (error) {
              console.error(error);
            }
        }
    const fetchAdmin = async(url)=>{
          try{
                const response = await axios.get(url)
                return response 
              }
              catch (error) {
                console.error(error);
              }
          }

    const cancelForm = (e)=>{
          e.preventDefault()
          setEditAdmin(true)
          setNewInput(true)
          setAdmin({...admin, email:"", role:"false"})
        }  

  return (
    <div className='w-full h-full bg-gray-50 '>
        <div className='flex flex-col items-center justify-center w-full'>
            <form className='grid grid-cols-12 gap-2 mb-4 w-5/6 space-y-2 mt-6 rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
              <input 
              value={searchAdmin}
              onChange={(e)=>setSearchAdmin(e.target.value)}
              placeholder="maxmaksum@gmail.com" 
              require
              type="email" 
              className="grid col-span-10 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 px-2" />
              <button onClick={(e)=>fetchUser(e)} className ="grid col-span-2 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 text-center font-bold p-2">Search</button>
            </form>
            <form className=" w-96 bg-gray-200 px-4 py-4 w-5/6">
                <div className ="mb-2">
                    <label htmlFor="nama" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input type="text" id="nama" className ="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    placeholder='puskesmaslasem@gmail.com'
                    value={admin.email}
                    onChange ={(e)=>setAdmin({...admin, email:e.target.value})}
                    />
                </div>

                <div className ="mb-2">
                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Role</label>
                    <select  
                    onChange ={(e)=>setAdmin({...admin, role:e.target.value})}
                    value={admin.role}
                    id="role"
                    placeholder='false'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option className ="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " > false</option>
                        <option className ="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500 " >true</option> 
                    </select> 
                    <div className="grid grid-cols-12 gap-2 mt-4 w-full">
                      <div className='grid col-span-3'>
                        {editAdmin  ?<button onClick={(e)=>editForm(e)} 
                            type="submit"
                            className ="grid col-span-4 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit
                        </button>:
                        <button onClick={(e)=>updateForm(e)} 
                        type="submit"
                        className ="grid col-span-4 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update
                         </button>
                        }
                        
                        
                      </div>
                      <div className='grid col-span-3'>
                        { newInput ? <button onClick={(e)=>addForm(e)} 
                            type="submit"
                            className ="grid col-span-4 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                        </button>:
                        <button onClick={(e)=>saveForm(e)} 
                            type="submit"
                            className ="grid col-span-4 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save
                        </button>}
                      </div>
                      
                      <button  onClick={(e)=>deleteForm(e)} 
                          type="submit"
                          className ="grid col-span-3 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete
                      </button>
                      <button  onClick={(e)=>cancelForm(e)} 
                          type="submit"
                          className ="grid col-span-3 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel
                      </button>
                    </div> 
                </div>
            </form>
         </div>
         <div className='flex flex-col items-center justify-center w-100 mt-6'>
            <button onClick={(e)=>fetchUsers(e)} className ="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get All Admin</button>
           
         </div>
         <div className='flex flex-col justify-center items-center'>
         <div className="bg-green-500 w-5/6 h-full p-2" >
             {adminLists && adminLists.map(x=>(
              <div key={x._id} className="grid grid-cols-12 gap-4">
                <div className='grid col-span-8 bg-gray-50 text-green-900 flex items-center mt-2 p-2'>
                <p> {x.email}</p>
               
               </div>
                <div className='grid col-span-2 bg-gray-50 text-green-900 flex items-center mt-2 p-2'>{x.role?<p>True</p>:<p>False</p>}
                </div>
                <button 
                onClick={ (e)=> editClick(e, x)}
                className='grid col-span-2 bg-gray-50 text-green-900 flex items-center mt-2 p-2 rounded-md'>Edit
                </button>
              </div>
             
             ))}
         </div>
        </div>
    </div>
  )
}

export default FormAdmin