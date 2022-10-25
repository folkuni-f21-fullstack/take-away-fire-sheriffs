import './MenuItem.scss';
import DishInfo from './overlays/DishInfo';
import { Menu } from '../models/models';
import { useContext, createContext, ReactNode, useState } from 'react';

interface Props {
    menuItem: Menu;
};

type ShoppingCartProviderProps = {
    children: ReactNode   // The type that we give to the function below
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

    const ShoppingCartContext = createContext({} as ShoppingCartContext)

    export function useShoppingCart() {
        return useContext(ShoppingCartContext)
    }

    export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
        const [cartItems, setCartItems] = useState<CartItem[]>([])

        // Om det finns ett värde returnera det annars returnera 0
        function getItemQuantity(id: number) {
            return cartItems.find(item => item.id === id)?.quantity || 0  
        } 

        // Function kollar om vi har en produkt i vår cart och kollar om vi inte har ngt i den och om vi inte har den lägg den i cart och öka antal
        function increaseCartQuantity(id: number) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id) == null ) {
                    return [...currItems, { id, quantity: 1 }]
                } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return { ...item, quantity: item.quantity + 1}
                        } else {
                            return item 
                        }
                    })
                }
            })
        }

        // Functionen går igenom id och för varje som blir lika med id man vill minska så decreasar man med -1
        function decreaseCartQuantity(id: number) {
            setCartItems(currItems => {
                if (currItems.find(item => item.id === id)?.quantity === 1 ) {
                    return currItems.filter(item => item.id !== id)
                } else {
                    return currItems.map(item => {
                        if (item.id === id) {
                            return { ...item, quantity: item.quantity - 1}
                        } else {
                            return item 
                        }
                    })
                }
            })
        }

        // Function som filtrerar ut alla som inte är lika med vårat nuvarande id
        function removeFromCart(id: number) {
            setCartItems(currItems => {
                return currItems.filter(item => item.id !== id)
            }) 
        }

        return <ShoppingCartContext.Provider value={({getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart})}>
            { children }
            </ShoppingCartContext.Provider>
    }

 export function MenuItem({menuItem}: Props) {
    const [openInfo, setOpenInfo] = useState<boolean>(false);
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(menuItem.id)

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
                    <button className='menuItem-btn-add' onClick={() => increaseCartQuantity(menuItem.id)}>Add to cart</button>
                </section>
            </div>
            { openInfo && <DishInfo menuItem={ menuItem } setOpenInfo={ setOpenInfo }/> }
        </>
    )
}

export default MenuItem;