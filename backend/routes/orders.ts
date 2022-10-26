import express, { Request, Response } from "express";
import db from "../db.js";
import { Orders, Users } from "../models";
const router = express.Router();

router.get('/', (req, res) => {
    if (db.data) {
        const allUsers = db.data.users

        let allUsersArray: any = [];
        
        allUsers.map( user => {
            
            allUsersArray.push(user.orders)
            // make so it adds
            
        })
        console.log('allorders: ', allUsersArray);
        res.json(allUsersArray)
        
    } else {
        res.sendStatus(404);
    }
});

router.delete('/delete', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const query = req.body;
    console.log('query:', query);

    const user = db.data.users.find(user => user.username === query.username);

    if (user) {

        console.log('user:', user);
    
        console.log('userOrders:', user.orders);
        
        const newUserOrders = user.orders.filter(order => order.id !== query.id); 
        
        console.log('newUserOrders:', newUserOrders);

        if (newUserOrders.length < user.orders.length) {
            
            db.data.users.map(user => {
                if (user.username === query.username) {
                    user.orders = newUserOrders;
                    db.write();
                    return;
                }
            });
        }
    } 
});

export default router;

// SAKER VI MÅSTE TA REDA PÅ/FIXA:

// Kolla upp varför vi inte kan använda oss av sendstatus vid POST för inlogg (Landing-sidan)

// Behöver kanske överlag få en liten genomgång på hur type/Schema fungerar
            