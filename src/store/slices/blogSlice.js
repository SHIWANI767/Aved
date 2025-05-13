import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:"blog",
    initialState: {
        blogDetails: {}
    },
    reducers: {
        setBlogDetails: (state, action) =>{
            console.log(action.payload);
            
            state.blogDetails = action.payload
        }
    }
});

export const {setBlogDetails} = blogSlice.actions;
export default blogSlice.reducer;