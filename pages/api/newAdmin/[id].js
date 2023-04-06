
import {getSession} from "next-auth/react"
const ObjectId = require('mongodb').ObjectId;
import {Types} from "mongoose"
import User from '../../../lib/User'
import db from '../../../lib/db';
;

export default function handler(req, res) {
 
  if (req.method === 'GET') {
    return getHandler(req, res);
  }
  if (req.method === 'PUT') {
    return putHandler(req, res);
  }
  if (req.method === 'DELETE') {
    return  deleteHandler (req, res);
  }
  

  res.status(200).json({ name: 'John Doe' })
}


const getHandler = async (req, res) => {
  console.log(req.query.id)
 
  await db.connect()
  const admin = await User.findOne({email:req.query.id})
  const newAdmin = JSON.stringify(admin)
  
  return res.json({
    message: 'Post added successfully',
    newAdmin:newAdmin,
    success: true
})
};


const putHandler = async (req, res) => {
console.log(req.body)
const {_id, email, role} = req.body

  await db.connect();
  const user = await User.findByIdAndUpdate(_id, {
    email : req.body.email,
    role : req.body.role,
  },{
    new:true
  });

  const user2 = JSON.stringify(user)
 
  res.send({ message: 'Product updated successfully', myData:user2 });
}
const deleteHandler = async (req, res) => {
  console.log(req.query.email)
  await db.connect();
  const res2 = await User.findOneAndDelete({email:req.query.id})
  console.log(res2)
  res.send({ message: 'Product deleted successfully' });
 
};


