import React, {useState, useEffect, useContext, createContext} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice(prev => prev + product.price * quantity);
        setTotalQuantities(prev => prev + quantity);
        
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }
    const onRemove = (product) => {
        setCartItems([...cartItems.filter(item => item._id !== product._id)]);
        setTotalPrice(prev => prev - product.price * product.quantity);
        setTotalQuantities(prev => prev - product.quantity);
    }
    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find(item => item._id === id);
        const index = cartItems.findIndex(item => item._id === id);

        if (value === 'inc') {
            setCartItems(prev => {
                const beforeItem = [...prev].slice(0, index);
                const afterItem = [...prev].slice(index + 1);
                return [...beforeItem, {...foundProduct, quantity: foundProduct.quantity + 1}, ...afterItem ];
            });
            setTotalPrice(prev => prev + foundProduct.price);
            setTotalQuantities(prev => prev + 1);
        }
        if (value === 'dec') {
            if (foundProduct.quantity <= 1) return true;
            setCartItems(prev => {
                const beforeItem = [...prev].slice(0, index);
                const afterItem = [...prev].slice(index + 1);
                return [...beforeItem, {...foundProduct, quantity: foundProduct.quantity - 1}, ...afterItem ];
            });
            setTotalPrice(prev => prev - foundProduct.price);
            setTotalQuantities(prev => prev - 1);
        }
    }
    const incQty = () => setQty(prev => prev + 1)
    const decQty = () => setQty(prev => {
        if (prev < 2) return 1;
        return prev - 1
    })

    return (
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setCartItems,
            setTotalPrice,
            setTotalQuantities
        }}>
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);
