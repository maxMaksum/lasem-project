import { Store } from "../components/contex/myContext"
import { useContext, useEffect, useState } from 'react'
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import{ fetchRead }from "../components/CrudFunction"
import { useRouter } from 'next/router';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useSession } from "next-auth/react";
import SearchInput from "./SearchInput";


const axios = require('axios').default;


function Search() {

    const [newStatus, setStatus] = useState(false)
    const { addUsers,setShowSpinner,setShowSearchOK, showSearchOK} = useContext(Store);
    const [showSearch, setShowSearch, ] = useState(true)
    

    const showS = (e)=>{
        e.preventDefault()
       console.log("ok")
        setShowSearch(!showSearch)
        setShowSearchOK(!showSearchOK)
    }
    
 

    const router = useRouter()

    const [dataM, setDataM] = useState({
        rm:"",
        nama:"",
        namakk:"",
        alamat:""

    })
 
   
    const Search = async (e) => {
        console.log(dataM)
        e.preventDefault()
         setShowSpinner(true)
        const response = await fetchRead("/api/customer/customers2", { params: {...dataM} })
         console.log("****",response)
         setShowSpinner(false)
         setShowSearch(true)
         setShowSearchOK(false)
       
       
        
         if(response?.status){
            setStatus(true)
        }
     
        
        addUsers(response)
        return response
    
     }

      const getAlamat =(y)=>{
        setDataM({...dataM, alamat: y})
        console.log(y)
      }
     
    return (

        <div className='flex flex-col justify-center items-start w-full relative'>
            <form onSubmit= {(e)=>Search(e)} className='flex flex-col items-center mb-2 py-2 w-full '>
                <div className='flex items-center justify-center space-x-2 w-full'>
                    <div className='cursor-pointer flex items-center justify-center rounded animate-bounce '>
                       <KeyboardDoubleArrowDownIcon onClick={
                                (e) =>showS(e)
                            } />
                    </div>
                    <div className ="w-5/6 bg-gray-200">
                        <input 
                        type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search RM..."
                        value={dataM.rm}
                        onChange ={(e)=>setDataM({...dataM, rm:e.target.value})}
                        
                        
                        />
                    </div>

                    <button 
                    className='flex items-center align-center'
                    type="submit" 
                    value="Submit"
                    > <SearchRoundedIcon /></button>
                </div>
     
              
                <div className={
                    !showSearch?'text-black absolute left-18 top-20 space-y-4 rounded w-5/6 z-40' :'hidden' } >
                    
                    <div className=" rounded-sm shadow-sm">
                        <input 
                        value={dataM.nama}
                        onChange ={(e)=>setDataM({...dataM, nama:e.target.value})}
                        type="text"
                        className=" border border-gray-300 block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Nama..."/>
                    </div>
                    <div className="rounded-sm shadow-sm">
                        <input 
                        type='text'
                        value={dataM.namakk}
                        onChange ={(e)=>setDataM({...dataM, namakk:e.target.value})}
                         className="block  border border-gray-300 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search NAMA KK..." />
                    </div>

                    <SearchInput getAlamat={getAlamat}/>
                    {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Alamat</label> */}
                   
                </div>
            </form>
            
        </div>

    )
}

export default Search
