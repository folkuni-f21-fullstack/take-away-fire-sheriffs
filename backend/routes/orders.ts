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

  function orderIdGenerator() {
    if (!db.data) {
        
        return;
    }
    const allUsers = db.data.users

        let allUsersArray: any = [];
        
        allUsers.map( user => {
            user.orders.map(order => {
               allUsersArray.push(order) 

            })
             
        })
        let startingOrder = 1000 ;
        console.log('alluserArray length:',allUsersArray.length);
        return allUsersArray.length + startingOrder + 1
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
router.post('/saveorder', async (req,res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    
    const query = req.body;
    console.log('user from cart: ',query.username);
    console.log('query:', query);
    const user = db.data.users.find(user => user.username === query.username);
    let today = new Date()
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes();
    
    
    if (user) {
        console.log('user from cart: ',user);
        const order = {
            date: date,
            items: JSON.parse(query.neworder),
            orderId: orderIdGenerator(),
            status: 'ordered',
            userComment: query.usercomment,
            adminComment: '',
            id: user.orders.length + 1
        }
        console.log('newOrderAdded: ', order);
        user.orders.push(order)
        db.write()
    }
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

    const orderId = query.orderItemId;
    
    db.data.users.map(user => {

        if (user.username === query.username) {
    
            user.orders.map(order => {
        
                const clickedItem = order.items.find(item => item.id == orderId);
                
                const newItems = order.items.filter(item => clickedItem?.id !== item.id)
                console.log('filteredItems after click:', newItems);
                
                if (order.items > newItems) {

                    order.items = newItems;
                    res.send(newItems);
                    
                    db.write();
                } else {
                    res.sendStatus(404);
                }
            });     
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
            