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

router.post('/additem', async (req, res) => {
    if (!db.data) {
        console.log('deleteItem 1');
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
                console.log('If added item Exist: ', checkIfExist);
                checkIfExist.quantity = checkIfExist.quantity + 1;
                console.log('after added quantity: ', checkIfExist);
                db.write();
                res.sendStatus(200)
            } else if (!checkIfExist){
                
                maybeOrder.items.push(query.newItem)
                res.sendStatus(200)
            }

        }
        res.sendStatus(404)
    }
    res.sendStatus(404)

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
    }

});
    


router.delete('/deleteitem', async (req, res) => {
    if (!db.data) {
        console.log('deleteItem 1');
        res.sendStatus(404);
        return;
    }
    const query: OrderBody = req.body;

    const maybeUser: Users | undefined = db.data.users.find(user => user.username == query.username);
    console.log('deleteItem, orderId:', query.orderId);
    
    if (maybeUser) {
        const maybeOrder = maybeUser.orders.find(order => order.id == query.orderId);

        if (maybeOrder) {
            const newItems = maybeOrder.items.filter(item => item.id !== query.itemId);
            maybeOrder.items = newItems;
            db.write();
            console.log('deleteItem 2');
            res.sendStatus(200);
        } else {
            console.log('deleteItem 3');
            res.sendStatus(404);
        }
    } else {
        console.log('deleteItem 4');
        res.sendStatus(404);
    }
});

router.post('/additem', async (req, res) => {
    if (!db.data) {
        console.log('deleteItem 1');
        res.sendStatus(404);
        return;
    }
    const query: OrderBody = req.body;
})
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
            