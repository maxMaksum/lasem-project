
import Link from 'next/link'
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import LogoutIcon from '@mui/icons-material/Logout';
import{useSession, signIn, signOut} from "next-auth/react"
function HeaderMenu({changeMenu}, {menu}) {

  let myPath=""

     const changeMenu1 = (e)=>{
      e.preventDefault()
      changeMenu()
     }
  
    return (
      <div
        className={` h-screen bg-green-700 absolute top-0 right-0 w-48 text-gray-50 text-md z-50`}
      >
        <div className="flex font-bold justify-center items-center p-2 cursor-pointer space-x-2">
          <h1 onClick={(e)=>{changeMenu1(e)}} className ="link py-4">
            X
          </h1>
          <p>Close</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
               <div 
                onClick={(e)=>showFormAdd(e)}  
                className="grid grid-cols-6 gap-2 ">
                  < DataSaverOnIcon 
                  className="grid col-span-2"
                  />
                  <p  className="grid col-span-4">ADD RM</p>
                
                </div>
                <div
                  onClick={()=>router.push("/admin")} 
                  className="grid grid-cols-6 cursor-pointer gap-2">
                    <p className='grid col-span-6'> Addmin </p>
                </div>
                <div 
                  onClick={signOut}
                  className = "grid grid-cols-6 cursor-pointer gap-2" >
                    <LogoutIcon className="cursor-pointer grid col-span-2" />
                    <p className='grid col-span-4'>Logout</p>
                </div>
            </div>
      </div>
    );
}

export default HeaderMenu

