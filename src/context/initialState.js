import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user: userInfo,
    allitems : null,
    cartShow : false,
    cartItems : cartInfo,

};