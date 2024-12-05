import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:3000";
    const [token, setToken] = useState("");
    const [tea_list, setTeaList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = tea_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchTeaList = async () => {
        try {
            const response = await axios.get(url + "/api/tea/list");
            setTeaList(response.data.data);
        } catch (error) {
            console.error("Error fetching tea list:", error);
        }
    };

    const loadCartData = async (token) => {
        const reponse = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(reponse.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchTeaList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                try {
                    const response = await loadCartData(localStorage.getItem("token"));
                    setCartItems(response.data.cartData);
                } catch (error) {
                    console.error("Error loading cart data:", error);
                    // Handle error gracefully (e.g., display a message to the user)
                }
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        tea_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;