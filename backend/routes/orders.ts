import express, { Request, Response } from "express";
import db from "../db.js";
import { Orders, Users, Menu } from "../models";
const router = express.Router();

type Query = {
    username: string;
    order: Orders;
    comment: string;
    from: string;
  }

router.get('/', (req, res) => {
    if (db.data) {
        const allUsers = db.data.users

        let allUsersArray: any = [];
        
        allUsers.map( user => {
            user.orders.map(order => {
               allUsersArray.push(order) 
            })
             
        })
        res.json(allUsersArray)
        
    } else {
        res.sendStatus(404);
    }
});

router.post('/changestatus', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const query = req.body;
    console.log(query);
    
    db.data.users.map(user => {

        user.orders.map(order => {

            if (order.orderId == query.id) {
                console.log(order.status);
                order.status = query.status;
                console.log(order.orderId, query.id);
                
                db.write();
                console.log(order.status);
            }
        })
    })

})
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
                    // res.sendStatus(404); // Behöver gå igenom detta med Monica! /HE
                }
            });
        } else {
            // res.sendStatus(404); // Behöver gå igenom detta med Monica! /HE
        }
    } else {
        // res.sendStatus(404); // Behöver gå igenom detta med Monica! /HE
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
                // res.sendStatus(404); // Behöver gå igenom detta med Monica! /HE
            }  
        } else {
            // res.sendStatus(404); // Behöver gå igenom detta med Monica! /HE
        } 
    });
    
});

router.post('/comment', (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const query: Query = req.body;
    
    db.data.users.map(user => {
        if (user.username === query.username) {
            user.orders.map(order => {
                if (order.id === query.order.id) {
                    if(query.from == "user") {
                        order.userComment = query.comment;
                        res.json(order.userComment);
                    } else if(query.from == "admin") {
                        order.adminComment = query.comment;
                        res.json(order.adminComment);
                    }
                    db.write();  
                } else {
                    res.sendStatus(404);
                }
            })
        }
    });
});

router.post('/finduser', (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const orderToFind = req.body;
    
    db.data.users.map(user => {
        user.orders.map(order => {
            if(order.orderId == orderToFind.orderId) {
                res.json(user.username);
                return;
            }
        });
    });
});

export default router;
            