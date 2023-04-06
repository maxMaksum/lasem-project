const axios = require('axios');


export const fetchAdd = async(url, x)=>{
  try{
    const response = await axios.post(url, x)
    return response 
  }
  catch (error) {
    console.error(error);
  }
}

export const fetchUpdate = async(url, x)=>{
      try{
        console.log(url, x)
        const response = await axios.put(url, x)
        return response 
      }
      catch (error) {
        console.error(error);
      }
  }

export  const fetchRead = async(url, mdata)=>{
    try{
    const response = await axios.get(url, mdata)
    const {respond1} = await response.data
    return respond1
  }
  catch (error) {
    console.error(error);
  }
  }

  export const fetchDelete = async(url)=>{
    console.log("delete", url)
    try{
      // console.log(url, x)
      const response = await axios.delete(url)
      return response 
    }
    catch (error) {
      console.error(error);
    }
  }

export const fetchSearch = async(url, mdata)=>{
  console.log(url)
    try{
    const response = await axios.get(url, mdata)

    return response
    }
  catch (error) {
    console.error(error);
  }
  }