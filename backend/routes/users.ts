import express, { Request, Response } from "express";
import Lowdb from "lowdb";
import db from "../db.js";
import { Users } from "../models.js";
const router = express.Router();

router.get('/', (req, res) => {
  if (db.data) {
      console.log("api/users/", db.data.users);
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
  const minUsernameCharacters: number = 3;
  const minPasswordCharacters: number = 5;
  const credentials = req.body;
  console.log("credentials",credentials);
  if(credentials.username.length >= minUsernameCharacters && credentials.password.length >= minPasswordCharacters) {
    console.log("credentials.username.length", credentials.username.length);
    console.log("credentials.password.length", credentials.password.length);
    if(db.data) {
      const checkUser = db.data.users.find(user => user.username === credentials.username);
      console.log("checkUser", checkUser);
      if(!checkUser){
        const newUserObject: Users = {
          username: credentials.username,
          password: credentials.password,
          orders: [],
          customer: true,
          id: db.data.users.length
        }
        console.log("newUserObject", newUserObject);
        db.data.users.push(newUserObject);
        db.write();

        console.log("db.data.users", db.data.users);
        res.status(201).send("created new user");
      }
      res.status(302).send("username already exists");
    }
    res.status(404).send("the database is on vacation");
  }
  res.status(411).send("username or password is too short");
});


export default router;