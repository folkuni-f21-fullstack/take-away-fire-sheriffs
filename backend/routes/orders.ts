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

type OrderBody = {
    username: string;
    orderId: number;
    itemId: number
}

let newOrderNumber = 1003;

function orderIdGenerator() {
    if (!db.data) {
        return 0;
    }
    const allUsers = db.data.users;

    newOrderNumber++;

    allUsers.map( user => {
        user.orders.find(order => {
            if (order.orderId == newOrderNumber) {
                newOrderNumber++;
            } else {
                return newOrderNumber;
            }
        });
    });
    return newOrderNumber;
}

let newOrderId = 2
function orderDotIdGenerator() {
    if (!db.data) {
        return 0;
    }
    const allUsers = db.data.users;

    newOrderId++;

    allUsers.map( user => {
        user.orders.find(order => {
            if (order.id == newOrderId) {
                newOrderId++;
            } else {
                return newOrderId;
            }
        });
    });
    return newOrderId;
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
    // let today = new Date();
    let date = new Date().toLocaleString("sv-SE", {timeZone: "Europe/Stockholm"});
    console.log(date);
    
    // let date = today.getFullYear() + "-" + 
    //         ('0' + (today.getMonth()+1)).slice(-2) + "-" + 
    //         today.getDate() + " " + 
    //         ('0' + today.getHours()).slice(-2) + ":" + 
    //         ('0' + today.getMinutes()).slice(-2);
    console.log("date ", date);
    
    if (user) {
        console.log('user from cart: ',user);
        const order = {
            date: date,
            items: JSON.parse(query.neworder),
            orderId: orderIdGenerator(),
            status: 'ordered',
            userComment: query.usercomment,
            adminComment: '',
            id: orderDotIdGenerator(),
            // id: user.orders.length + 1
        }
        console.log('newOrderAdded: ', order);
        user.orders.push(order)
        db.write()
    }
})

router.post('/additem', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    const query = req.body;
    console.log('query info from frontend: ', query);
    const maybeUser = db.data.users.find(user => user.username == query.username);
    console.log('maybeUser: ', maybeUser);
    if (maybeUser) {
        const maybeOrder = maybeUser.orders.find(order => order.orderId == query.orderId);
        if (maybeOrder) {
            console.log('maybeOrder: ', maybeOrder);
            const checkIfExist = maybeOrder.items.find(item => item.id == query.itemId);
            if (checkIfExist) {
                checkIfExist.quantity = checkIfExist.quantity + 1;
                db.write();
                res.sendStatus(200)
            } else if (!checkIfExist){
                maybeOrder.items.push(query.newItem)
                res.sendStatus(200)
            }
        } else {
            res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }

});

router.delete('/deleteorder', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    const query = req.body;
    console.log('query order from frontend: ',query.order);

    const maybeUser: Users | undefined = db.data.users.find(user => user.username == query.username);
    if (maybeUser) {
        console.log('maybeuser',maybeUser);
        const newOrders = maybeUser.orders.filter(item => item.orderId !== query.order);
        maybeUser.orders = newOrders;
        console.log('new Order after delete: ' ,newOrders);
        db.write()
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }

});

router.delete('/decreaseitem', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    const query: OrderBody = req.body;

    const maybeUser: Users | undefined = db.data.users.find(user => user.username == query.username);
    
    if (maybeUser) {
        const maybeOrder = maybeUser.orders.find(order => order.id == query.orderId);

        if (maybeOrder) {
            const foundItem = maybeOrder.items.find(item => item.id == query.itemId);
            console.log('foundItem', foundItem);
            
            if (foundItem && foundItem.quantity > 1) {
                console.log('foundItem quant before decrease:', foundItem.quantity);
                foundItem.quantity--
                console.log('foundItem quant after decrease:', foundItem.quantity);
                db.write();
                res.sendStatus(200);
            } else {
                const newItems = maybeOrder.items.filter(item => item.id !== query.itemId);
                maybeOrder.items = newItems;
                db.write();
                res.sendStatus(200);
            }
            
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

router.post('/increaseitem', async (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }
    const query: OrderBody = req.body;

    const maybeUser: Users | undefined = db.data.users.find(user => user.username == query.username);
    
    if (maybeUser) {
        const maybeOrder = maybeUser.orders.find(order => order.id == query.orderId);

        if (maybeOrder) {
            const foundItem = maybeOrder.items.find(item => item.id == query.itemId);
            if (foundItem) {
                console.log('foundItem quant before increase:', foundItem.quantity);
                foundItem.quantity++
                console.log('foundItem quant after increase:', foundItem.quantity);
                db.write();
                res.sendStatus(200);
            }

        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});

router.post('/comment', (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        console.log('comment -1');
        return;
    }

    const query: Query = req.body;

    const maybeUser = db.data.users.find(user => user.username == query.username);
    console.log('comment 0 - maybeUser', maybeUser, "query.username", query.username);
    
    if (maybeUser) {
    console.log('comment 1');
        
        const maybeOrder = maybeUser.orders.find(order => order.orderId == query.order.orderId);
        if (maybeOrder) {
            console.log('comment 2');
            if (query.from == 'user') {
                console.log('comment 3');
                maybeOrder.userComment = query.comment; 
                res.json(maybeOrder.userComment);
            } else if (query.from == 'admin') {
                console.log('comment 4');
                maybeOrder.adminComment = query.comment;
                res.json(maybeOrder.adminComment);
            }
            db.write();
            console.log('comment 5', );
            
        } else {
            console.log('comment 6 (error)');
            res.sendStatus(404);
        }
    }
});

router.post('/finduser', (req, res) => {
    if (!db.data) {
        res.sendStatus(404);
        return;
    }

    const orderToFind = req.body;

    const result = db.data.users.find(user => {
        console.log("/finduser - user", user);
        return user.orders.find(order => order.orderId == orderToFind.orderId);
    });
    console.log("result", result);
    if (result) {
        res.json(result.username);
    } else {
        res.sendStatus(404);
    }
    
    // db.data.users.map(user => {
    //     user.orders.map(order => {
    //         if(order.orderId == orderToFind.orderId) {
    //             res.json(user.username);
    //             return;
    //         }
    //     });
    // });
});

export default router;
            