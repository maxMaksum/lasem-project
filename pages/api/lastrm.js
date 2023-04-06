// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Customers from '../../lib/Customers'
import db from '../../lib/db';

export default async function handler(req, res) {
  await db.connect()

 const lastRm = await Customers.find().sort({rm: -1}).limit(1)
 const lastRmNumber = parseInt(lastRm[0].rm) +1 
 console.log(lastRmNumber + 1)
  res.status(200).json({ name: lastRmNumber })
}
