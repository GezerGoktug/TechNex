import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    products:[],
    loading:false,
}

export const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts(state,action){  
        state.products=action.payload    
        state.loading=false
        },
        loading(state){
          state.loading=true
        },
    }
})
export const productsActions = productsSlice.actions 