"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type globalState = {
    userEmail: string
}

const initialState: globalState = {
    userEmail: ""
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        userEmailAction: (state, action: PayloadAction<string>) => {
            state.userEmail = action.payload
        },
    }
})

export const { userEmailAction } = globalSlice.actions

export default globalSlice.reducer
