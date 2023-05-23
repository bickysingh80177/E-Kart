import cartConstant from "../constants/cartConstants";

const addToCart = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case cartConstant.ADD_TO_CART:
      const item = action.payload;
      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case cartConstant.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case cartConstant.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

const cartReducer = { addToCart };

export default cartReducer;
