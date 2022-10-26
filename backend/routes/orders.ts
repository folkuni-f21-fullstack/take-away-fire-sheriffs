import express, { Request, Response } from "express";
import db from "../db.js";
import { Orders, Users, Menu } from "../models";
const router = express.Router();

type Query = {
    username: string;
    order: Orders;
    comment: string;
  }

router.get('/', (req, res) => {
    if (db.data) {
        console.log(db.data);
        res.json(db.data);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/deleteorder', async (req, res) => {
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
                    res.json(newUserOrders);
                    db.write();
                    return;
                } else {
                    // statuscode
                }
            });
        } else {
            // statuscode
        }
    } else {
        // statuscode
    } 
});

router.delete('/deleteitem', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    const query = req.body;

    const orderId = query.order.id;
    
    db.data.users.map(user => {
        if(user.username === query.username) {
            console.log('items before:', user.orders[orderId].items);

            user.orders[orderId].items.splice(query.orderItemIndex, 1 );
            const itemsAfter = user.orders[orderId].items;
            console.log(itemsAfter);
            
            if (itemsAfter) {
                res.send(itemsAfter);
                db.write();
            } else {
                res.sendStatus(404);
            }  
        } else {
            // statuscode
        } 
    });
    
});

router.post('/usercomment', (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const query: Query = req.body;
    
    const user = db.data.users.find(user => user.username === query.username);

    if (user) {
        user.orders.map(order => {
            if (order.id === query.order.id) {
                order.userComment = query.comment;
                console.log(order.userComment);
                res.json(order.userComment);
                db.write();  
            } else {
                // statuscode
            }
        })
    } else {
        // statuscode
    }
    
});

export default router;
            