import express, { Request, Response } from "express";
import Lowdb from "lowdb";
import db from "../db.js";
const router = express.Router();

router.get('/', (req, res) => {
  if (db.data) {
      console.log(db.data.users);
      res.json(db.data.users);
      // res.sendStatus(200);
  } else {
      res.sendStatus(404);
  }
});


router.post('/login', (req, res) => {
  const credentials = req.body;
  
  if(credentials.hasOwnProperty('username') && credentials.hasOwnProperty('password')) {
    const result = compareCredentials(credentials);
    console.log("result",result);
    
    if(result){
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } 
  else {
    res.sendStatus(400);
  }
  
  function compareCredentials(credentials: { username: string; password: string; }) {
    if(db.data) {
      const result = db.data.users.find((user) => user.username == credentials.username && user.password == credentials.password);
      return result;
    } else {
      return false;
    }
  } 
});


router.post('/signup', (req, res) => {

});


export default router;