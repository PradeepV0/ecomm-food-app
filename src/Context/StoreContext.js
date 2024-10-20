import { createContext, useEffect, useState } from "react";
import { getIndianFoods } from "../APi/IndianFoodsApi";

export const StoreContext = createContext(null)


const StoreContextProvider = (props) => {

    const [productList,setProductList] = useState([])

    const [cartItem, setCartItem] = useState({});

    useEffect(()=>{
        getProductDetails()
    },[])

    function getProductDetails(){
        const responseData = []
        const response = getIndianFoods()
        response.then(
            (data)=>{
                const respData = data.response
                setProductList(respData)
                responseData.push(...respData)
                return responseData
            }
        )
    }


    const addtoCard = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({
                ...prev,
                [itemId]: 1
            }))
        } else {
            setCartItem((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }))
        }
    }

    const removeFromCard = (itemId) => {
        setCartItem((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // const response = productList        
        // response.then(
        //     (res)=>{
      
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = productList.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
//     }
// )
        return totalAmount;
    }

    const contextValue = {
        productList,
        cartItem,
        setCartItem,
        addtoCard,
        removeFromCard,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;