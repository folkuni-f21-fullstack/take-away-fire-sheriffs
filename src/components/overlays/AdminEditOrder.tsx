import './AdminEditOrder.scss'
import { useNavigate } from 'react-router-dom'
import { Orders  } from '../../models/models';
import { Key, useEffect, useState } from 'react';

interface Prop {
    fetchOrders: () => void;
    closeOverlay: (close: boolean) => void;
    orderItem: Orders;
}

function AdminEditOrder( {closeOverlay, orderItem, fetchOrders}: Prop) {
    const [feedback, setFeedback] = useState<string>('');
    const [userComment, setUserComment] = useState<string>('');
    const [adminComment, setAdminComment] = useState<string>('');
    
    const closeBtn = () => {
        closeOverlay(false)
        fetchOrders();
    }
    const saveEdits = () => {
        if(userComment.length > 0) {
            saveComments(userComment, "user");
        }
        if(adminComment.length > 0) {
            saveComments(adminComment, "admin");
        }
        // fetchOrders();
    }

    const orderItems = orderItem.items.map((item: { title: string; price: number; quantity: number; }, index: Key) => {
        return (
          <div key={index} className="edit-element ">
            <section className="edit-details">
              <p className="card-text">{item.title}</p><p>{'x' + item.quantity}</p>
              <p className="card-text">{item.price}:-</p> 
              
            </section>
            <button className="card-btn-delete" >Delete</button>
          </div>
        );
    });

    async function saveComments(comment: string, userType: string) {
        setFeedback('');
        setTimeout(() => {
          setFeedback('displayFeedback');
        }, 500);

        const username = await findOrderOwner(orderItem);
      
        const query = {
          username: username,
          order: orderItem,
          comment: comment,
          from: userType
        }
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query)
        }
    
        const response = await fetch('/api/orders/comment', requestOptions);
    
        console.log('commentResponse:', response.status);
        console.log(comment);
    }

    async function findOrderOwner(orderItem: Orders) {
        console.log(orderItem);
        
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderItem)
        }
    
        const response = await fetch('/api/orders/finduser', requestOptions);
        const data: string = await response.json();
        console.log("data from api/orders/finduser", data);
        return data;
    }


    let totalPrice = 0;
    for (let item of orderItem.items) {
        totalPrice = totalPrice + item.price;
    } 
    return (
        <section className="admin-edit-overlay-container">
            <div className='admin-edit-overlay'>
                <div className='edit-upper-container'>
                    <h1 className='admin-edit-title'>Edit Order</h1>
                    <h2 className='edit-order-title'> {orderItem.orderId}</h2>
                    <img src="src\assets\close-overlay-button.svg" alt="" onClick={closeBtn} className='admin-close-edit-overlay-btn'/>
                </div>
                
                
                <section className='edit-card-info'>
                    {orderItems}
                </section>
                
                <h2 className='admin-edit-total'>{'Total: ' + totalPrice + ':-'}</h2>

                <div className='admin-edit-inputs'>
                    <input className='user-comment comment-input' defaultValue={orderItem.userComment} type="text" placeholder='Customer comment field' onChange={(event) => setUserComment(event.target.value)} />
                    <input className='admin-comment comment-input' defaultValue={orderItem.adminComment} type="text" placeholder='Worker comment field' onChange={(event) => setAdminComment(event.target.value)} />
                </div>
                
                <p className={"feedback " + feedback}>Your comment was saved.</p>
                <div className='admin-edit-buttons'>
                   <button className='admin-change-order-btn' onClick={saveEdits}>Change Order</button>
                </div>
                
                
            </div>
            

        </section>
    )
}

export default AdminEditOrder;