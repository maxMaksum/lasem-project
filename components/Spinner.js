import React from 'react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useContext } from 'react';

import { Store } from "./contex/myContext"



function Spinner() {
  const {showSpinner, setShowSpinner } = useContext(Store)
 
  return (
  <div className={"flex items-center justify-left absolute top-20 right-20 z-50"}>
    <div className ="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
      <div className={showSpinner?"border-t-transparent border-solid animate-spin  rounded-full border-indigo-500 border-8 h-10 w-10":"hidden"}></div>
    </div>
  </div>
  )
}



export default Spinner