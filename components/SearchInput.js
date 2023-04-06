import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import alamat from "../alamat"

function SearchInput({getAlamat, alamatQ}) {
  console.log(alamatQ)
     const [query, setQuery] = useState("")
     const [desa, setDesa] = useState("")
     const getDesa = (e, user)=>{
        e.preventDefault()
        setQuery(user)
        getAlamat(user)
      
     }
useEffect(()=>setQuery(alamatQ),[alamatQ])
  return (
    
   <div className="">
     <input
        className="w-full z-20 text-sm text-gray-900  border-indigo-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 bg-transparent"
        placeholder="Search Alamat"
        value={query || "" }
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <ul className="list overflow-auto">
        {alamat.filter((asd) =>
          asd.toLowerCase().includes(query)
        ).map((user, index) => (
         <li className="mb-2 flex-none bg-gray-200 " key={index}>
            {query == ""?"":
            <button className="cursor-pointer"  onClick ={(e)=>getDesa(e, user)}>{user}</button>}
          </li>
         
        ))}
      </ul>
    </div>
  )
}

export default SearchInput