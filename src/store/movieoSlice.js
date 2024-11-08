import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bannerData: [],
    imgURL : ''
}

export const movioSlice = createSlice({
    name : 'movio',
    initialState,
    reducers: {
        setBannerData: (state,action) => {
            state.bannerData = action.payload
        },
        setImgURL : (state,action) => {
            state.imgURL = action.payload
        }
    }
})

export const { setBannerData, setImgURL } = movioSlice.actions;

export default movioSlice.reducer;