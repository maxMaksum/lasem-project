import React from 'react'

const ImageQ =[
    {Title:"Team Puskesmas Lasem", 
    img : "/viky1.jpeg" },
    {Title:"Selalu Siap Membantu", 
    img : "/viky2.jpeg" },
    {Title:"Training Team RM Pencarian Melalui WebApp", 
    img : "/viky3.jpeg" },
    {Title:"Team Puskesmas Lasem", 
    img : "/viky1.jpeg" },
    {Title:"Selalu Siap Membantu", 
    img : "/viky2.jpeg" },
    {Title:"Training Team RM Pencarian Melalui WebApp", 
    img : "/viky3.jpeg" },
   

]

function Masonry() {
  return (
    <div className ="flex items-center justify-center w-full bg-gray-50">
        <div className="columns-2 md:columns-3 lg:columns-4 w-full bg-gray-50 shadow-lg">
        {ImageQ.map(x=>(
            
            <div className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20 shadow-lg">
                <img className="w-full rounded-md" src={x.img}/>
                <div className="absolute inset-0 p-8 text-white flex flex-col">
               
                <div className="mt-auto">
                    <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">{x.Title}</span>
                </div>
                </div>
            </div> 

        ))}
         </div>
        
</div>
  )
}

export default Masonry