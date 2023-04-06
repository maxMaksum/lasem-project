
import {getSession} from "next-auth/react"
const ObjectId = require('mongodb').ObjectId;
import {Types} from "mongoose"
import Customers from '../../../lib/Customers'
import db from '../../../lib/db';
;

export default function handler(req, res) {
 
  if (req.method === 'GET') {
    return getHandler(req, res);
  }

   if (req.method === 'POST') {
    return postHandler(req, res);
  }

  res.status(200).json({ name: 'John Doe' })
}


const getHandler = async (req, res) => {

const {rm, nama, namakk, alamat} = req.query

console.log(rm, nama, namakk, alamat)
await db.connect()
 try {
  let res2 =""

  if(rm){
    res2 = await Customers.find({ rm: { $regex:`^${rm}.*`, $options: 'i' }}) 
  } else{
    res2 = await Customers.find({ $and:[  { nama: { $regex: nama, $options: 'i' }},
    { namakk: { $regex: namakk, $options: 'i' }},
    { alamat: { $regex: alamat, $options: 'i' }}]})    
  }
  // console.log(res2)
  return res.json({
    message: 'Post added successfully',
    success: true,
    respond1 : res2 })
}
  catch (error) {
    return res.json({
        message: new Error(error).message,
        success: false,
    })}
};


const postHandler = async (req, res) => {
const  {rm, nama, namakk, alamat, rt, rw} = req.body
  await db.connect()

  const newProduct = new Customers({
    _id:new Types.ObjectId(),
    rm:req.body.rm,
    nama:req.body.nama,
    namakk:req.body.namakk,
    alamat:req.body.alamat,
    rt:req.body.rt,
    rw:req.body.rw
  });
  const product = await newProduct.save();
  console.log(product)
  const newUser1 = JSON.stringify(product)
 

  await db.disconnect();
  res.send({ message: 'Customers created successfully', newUser:newUser1});
};



// export default handler;

