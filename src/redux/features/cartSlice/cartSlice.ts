import { cartItemCalculation } from "@/lib/utils/cartPriceCalculation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  title: string;
  id: string;
  category: string;
  size?: string;
  price: number;
  quantity: number;
  photo: string;
  shopId: string;
  discount: number; // Item-level discount in percentage
}

interface ICartState {
  cartItems: ICartItem[];
  totalPriceBeforeDiscount: number;
  itemLevelDiscount: number;

  additionalDiscount: number;
  totalDiscount: number;
  subTotal: number;
  categoryId: string; // use in product page
  showVendorConflictDialog: boolean; // Flag to show the dialog
  pendingItem?: ICartItem;
  // Temporarily store the item for dialog actions
  cuponId: string;
}

const initialState: ICartState = {
  cartItems: [],
  totalPriceBeforeDiscount: 0,
  itemLevelDiscount: 0,
  additionalDiscount: 0,
  totalDiscount: 0,
  subTotal: 0,
  categoryId: "",
  showVendorConflictDialog: false,
  pendingItem: undefined,
  cuponId: "",
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const { shopId, id, size, quantity } = action.payload;

      if (state.cartItems.length > 0 && state.cartItems[0].shopId !== shopId) {
        // Show vendor conflict dialog
        state.showVendorConflictDialog = true;
        state.pendingItem = action.payload;
        return;
      }

      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (itemIndex !== -1) {
        // Update quantity if item exists
        state.cartItems[itemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        state.cartItems.push(action.payload);
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    replaceCart: (state) => {
      if (state.pendingItem) {
        // Replace cart with the new item
        state.cartItems = [state.pendingItem];
        state.pendingItem = undefined;
        state.showVendorConflictDialog = false;

        // Recalculate prices
        const priceData = cartItemCalculation(
          state.cartItems,
          state.additionalDiscount
        );
        Object.assign(state, priceData);
      }
    },

    retainCart: (state) => {
      // Retain current cart and close the dialog
      state.pendingItem = undefined;
      state.showVendorConflictDialog = false;
    },

    increaseItem: (
      state,
      action: PayloadAction<{ id: string; size?: string }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        // Increase item quantity
        state.cartItems[itemIndex].quantity += 1;
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    decreaseItem: (
      state,
      action: PayloadAction<{ id: string; size?: string }>
    ) => {
      const itemIndex = state.cartItems.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        // Decrease quantity
        item.quantity -= 1;

        // Remove item if quantity reaches 0
        if (item.quantity === 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      // Filter out the item by ID
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    setAdditionalDiscount: (state, action: PayloadAction<number>) => {
      // Update additional discount
      state.additionalDiscount = action.payload;

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    resetCart: () => initialState, // Reset the cart to its initial state

    setCategoryId: (state, action: PayloadAction<string>) => {
      // Reset the
      state.categoryId = action.payload;
    },
    setCuponId: (state, action: PayloadAction<string>) => {
      // Reset the
      state.cuponId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addItemToCart,
  increaseItem,
  decreaseItem,
  removeItemFromCart,
  setAdditionalDiscount,
  resetCart,
  replaceCart,
  retainCart,
  setCategoryId,
  setCuponId,
} = cartSlice.actions;

export default cartSlice.reducer;
