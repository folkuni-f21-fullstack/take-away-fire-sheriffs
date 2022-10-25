import express, { Request, Response } from "express";
import db from "../db.js";
import { Orders, Users, Menu } from "../models";
const router = express.Router();

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
                }
            });
        }
    } 
});

router.delete('/deleteitem', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const query = req.body;

    // let clickedItem = {};
    // let clickedOrder = {};
    
    // db.data.users.map(user => {
    //     if (user.username === query.username) {
    //         user.orders.map(order => {
    //             console.log('order', order);
    //             clickedOrder = order;
    //             order.items.map(item => {
    //                 // console.log('item', item);
    
    //                 if (item.id == query.orderItemIndex + 1) {
    //                     console.log('bingo');
    //                     clickedItem = item;
    //                 }
    //             });
    //         }); 
    //     }
    // });

    const orderId = query.order.id;
    
    db.data.users.map(user => {
        if(user.username === query.username) {
            console.log('items before:', user.orders[orderId].items);
            user.orders[orderId].items.splice(query.orderItemIndex, 1 );
            console.log('items after:', user.orders[orderId].items);
        }
    });
    
    // console.log('clickedItem', clickedItem);

    // const newOrderItems = clickedItem.filter(item => item.id !== query.orderItemIndex + 1)

    const user = db.data.users.find(user => user.username === query.username);
    
    
    if (user) {
        console.log('user', user);
    }
    
    res.json('hejhehj')
});

export default router;

// SAKER VI MÅSTE TA REDA PÅ/FIXA:

// Kolla upp varför vi inte kan använda oss av sendstatus vid POST för inlogg (Landing-sidan)

// Behöver kanske överlag få en liten genomgång på hur type/Schema fungerar
            