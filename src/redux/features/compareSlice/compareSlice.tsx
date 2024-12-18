import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/interface/product.interface";
import { toast } from "sonner"; // Import Sonner's toast

interface ComparisonState {
  selectedProducts: IProduct[];
}

const initialState: ComparisonState = {
  selectedProducts: [],
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addProductToComparison: (state, action: PayloadAction<IProduct>) => {
      const { payload } = action;
      const { productId, categoryId } = payload;

      const isSameCategory =
        state.selectedProducts.length === 0 ||
        state.selectedProducts.every(
          (product) => product.categoryId === categoryId
        );

      const isAlreadySelected = state.selectedProducts.some(
        (product) => product.productId === productId
      );

      if (!isSameCategory) {
        toast.error("You can only compare products from the same category.");
      } else if (isAlreadySelected) {
        toast.error("This product is already in the comparison list.");
      } else if (state.selectedProducts.length >= 3) {
        toast.error("You can only compare up to 3 products.");
      } else {
        state.selectedProducts.push(payload);
        toast.success(`${payload.name} added to comparison.`);
      }
    },
    removeProductFromComparison: (state, action: PayloadAction<string>) => {
      const productIdToRemove = action.payload;
      const product = state.selectedProducts.find(
        (product) => product.productId === productIdToRemove
      );

      if (product) {
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.productId !== productIdToRemove
        );
        toast.success(`${product.name} removed from comparison.`);
      }
    },
    clearComparison: (state) => {
      if (state.selectedProducts.length > 0) {
        state.selectedProducts = [];
        toast.success("Comparison list cleared.");
      } else {
        toast.error("Comparison list is already empty.");
      }
    },
  },
});

export const {
  addProductToComparison,
  removeProductFromComparison,
  clearComparison,
} = comparisonSlice.actions;
export default comparisonSlice.reducer;
