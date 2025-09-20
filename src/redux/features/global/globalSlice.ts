"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Extra, Size } from '../../../../generated/prisma';
import { RootState } from '@/redux/store';

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
