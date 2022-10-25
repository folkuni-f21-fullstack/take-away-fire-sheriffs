import './MenuItem.scss';

import DishInfo from './overlays/DishInfo';

import { Menu } from '../models/models';

import { useState } from 'react';

interface Props {
    menuItem: Menu;
};

function MenuItem({menuItem}: Props) {

    const [openInfo, setOpenInfo] = useState<boolean>(false);




    localStorage.setItem(key, value); // store key/value pair.
    localStorage.setItem(key, JSON.stringify(object)); // storing an object.
    localStorage.getItem(key); // get the value by key.
    localStorage.removeItem(key); // remove the key with its value.
    localStorage.clear(); // delete everything.
    localStorage.key(index); // get the key on a given position.
    localStorage.length; // the number of stored items.







    class LocalCart{
        static key = "cartItems"
    
        static getLocalCartItems(){
            let cartMap = new Map()
         const cart = localStorage.getItem(LocalCart.key)   
         if(cart===null || cart.length===0)  return cartMap
            return new (JSON.parse(cart))
        }
    
        static addItemToLocalCart(id:number, title:string){
            let cart = LocalCart.getLocalCartItems()
            if(cart.has(menuItem.id)){
                cart.set(menuItem.id, menuItem.title)
            }
            else
            cart.set(menuItem.id, menuItem.title)
           localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))     
        }


        static removeItemFromCart(id:number, title:string){
            let cart = LocalCart.getLocalCartItems()

            if(cart.has(menuItem.id)){
            const newArray = cart.slice(menuItem.id, 1);
            //Save new array to localstorage    
            }

    } } 
        
    function removeItemtFunction(){
            LocalCart.removeItemFromCart(menuItem.id, menuItem.title)
    }
    function addItemFunction(){
            LocalCart.addItemToLocalCart(menuItem.id, menuItem.title)
    }
    


















    
    function handleClick() {
        console.log(menuItem.title);
        setOpenInfo(true);
    }
    
    return (
        <>
            <div className="menuItemWrapper">
                <section className="menuItem-title-container">
                    <h2>{menuItem.title}</h2>
                    <h2>{menuItem.price}:-</h2>
                </section>
                <section className="menuItem-ingredients-container">
                    <p>{menuItem.ingredients}</p>
                </section>
                <section className="menuItem-buttons-container">
                    <button className='menuItem-btn-info' onClick={ handleClick }>More info</button>
                    <button className='menuItem-btn-add' onClick={addItemFunction}>Add to cart</button>
                    <button className='menuItem-btn-add' onClick={removeItemtFunction}>Remove to cart</button>
                </section>
            </div>
            { openInfo && <DishInfo menuItem={ menuItem } setOpenInfo={ setOpenInfo }/> }
        </>
    )
}

export default MenuItem;