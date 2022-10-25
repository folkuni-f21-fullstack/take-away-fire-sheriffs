import './MenuItem.scss';

import DishInfo from './overlays/DishInfo';

import { Menu } from '../models/models';

import { useState } from 'react';

interface Props {
    menuItem: Menu;
};

function MenuItem({menuItem}: Props) {

    const [openInfo, setOpenInfo] = useState<boolean>(false);



    class LocalCart{
        static key = "cartItems"
    
        static getLocalCartItems(){
            let cartMap = new Map()
         const cart = localStorage.getItem(LocalCart.key)   
         if(cart===null || cart.length===0)  return cartMap
            return new Map(Object.entries(JSON.parse(cart)))
            updateCartUI()
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
    }
    
    function addItemFunction(){
        LocalCart.addItemToLocalCart(menuItem.id, menuItem.title)
    }
    

    function updateCartUI(){
        console.log("updated");
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
                </section>
            </div>
            { openInfo && <DishInfo menuItem={ menuItem } setOpenInfo={ setOpenInfo }/> }
        </>
    )
}

export default MenuItem;