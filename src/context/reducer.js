export const actionType = {
    SET_USER: 'SET_USER',
    SET_GAS_CYLINDER_TYPE : 'SET_GAS_CYLINDER_TYPE',
    SET_CART_SHOW : "SET_CART_SHOW",
    SET_CARTITEMS: "SET_CARTITEMS",
};

const reducer = (state, action) => {
    // console.log(action);

    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_GAS_CYLINDER_TYPE:
            return {
                ...state,
                allitems: action.allitems,
            };
        case actionType.SET_CART_SHOW   :
            return {
                ...state,
                cartShow: action.cartShow,
            };

        case actionType.SET_CARTITEMS:
            return {
                ...state,
                cartItems: action.cartItems,
            };





        default:
            return state;
    }
};
export default reducer;
