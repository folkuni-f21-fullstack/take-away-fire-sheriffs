import express, { Request, Response } from "express";
import Lowdb from "lowdb";
import db from "../db.js";
const router = express.Router();

router.get('/', (req, res) => {
  if (db.data) {
      console.log(db.data.users);
      res.json(db.data.users);
  } else {
      res.sendStatus(404);
  }
})

router.post('/login', (req, res) => {
  const credentials = req.body;
  
  if(credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
    const result = compareCredentials(credentials);
    console.log(result);
    
    if(result){
      res.send(result);
    } else {
      res.json('404');
      // res.headersSent()
      // res.sendStatus(404); // VI FÅR INTE DETTA ATT FUNKA, FÅR TA DETTA MED DAVID
    }
  } 
  else {
    res.json('400');
  }
  
  function compareCredentials(credentials: { username: string; password: string; }) {
    if(db.data) {
      const result = db.data.users.find((user) => user.username == credentials.username && user.password == credentials.password);
      return result;
    } else {
      return false;
    }
  } 

  // async function checkIfAccountExist(credentials) {
  //   const  result = await database.find({$or: [{ username: credentials.username}, 
  //       { email: credentials.email}]})
  //       return result;
  // }

});


export default router;