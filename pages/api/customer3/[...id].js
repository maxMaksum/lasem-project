import {getSession} from "next-auth/react"
const ObjectId = require('mongodb').ObjectId;
import Customers from '../../../lib/Customers'
import db from '../../../lib/db';
import mongoose from "mongoose";
import { _id } from "@next-auth/mongodb-adapter";

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    return getHandler(req, res);
  } else if (req.method === 'PUT') {
    return putHandler(req, res);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};
const getHandler = async (req, res) => {

  const {id} = req.query
  let myId = id[0]
  console.log(myId)
  
  try {
   await db.connect()
   const res2 = await Customers.findById(mongoose.Types.ObjectId(myId)) 
   return res.json({
     message: 'Post added successfully',
     success: true,
     respond1 : res2
 })
   
 }
   catch (error) {
     return res.json({
         message: new Error(error).message,
         success: false,
     });
 }
};

const putHandler = async (req, res) => {

const { _id, nama, namakk, alamat, rt, rw} = req.body
let myId = _id.toString().trim()
console.log(req.body)
await db.connect();

const user = await Customers.findByIdAndUpdate(myId, {
    rm : req.body.rm,
    nama : req.body.nama,
    namakk : req.body.namakk,
    alamat : req.body.alamat,
    rt : req.body.rt,
    rw : req.body.rw
  },{
    new:true
  });

const user2 = JSON.stringify(user)
 res.status(200).send({ message: 'Product updated successfully', myData:user2})
 
};

const deleteHandler = async (req, res) => {
  const myId = req.query.id[0].toString()
  await db.connect();
  const res2 = await Customers.findOneAndDelete({_id:myId})
  res.send({ message: 'Product deleted successfully' });
 
};
export default handler;