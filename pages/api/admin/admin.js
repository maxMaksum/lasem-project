
const ObjectId = require('mongodb').ObjectId;
import {Types} from "mongoose"
import User from '../../../lib/User'
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
await db.connect()
  const admin = await User.find({})
  const newAdmin = JSON.stringify(admin)
  
  console.log(newAdmin)
  return res.json({
    message: 'Post added successfully',
    newAdmin:newAdmin,
    success: true
})
    // respond1 : admin })
};




const postHandler = async (req, res) => {
console.log(req.body)  
const  {email} = req.body
  await db.connect()

  const newProduct = new User({
    _id:new Types.ObjectId(),
    email:req.body.email,
    role:req.body.role,
   
  });
  const product = await newProduct.save();
  
  const newUser1 = JSON.stringify(product)
 
 

  await db.disconnect();
  res.send({ message: 'User created successfully', newUser:newUser1});
};





