import { UsersState } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UsersState = {
    usersData: [],
    loading: false,
    error: null
};

export const fetchUsers = createAsyncThunk(
    'appReducer/fetchUsers', async (numUsers: number) => {
        try {
            const response = await fetch(
                `https://randomuser.me/api/?results=${numUsers}`);
            const data = await response.json();
            return data.results;
        } catch (e: any) {
            return Promise.reject(e.message);
        }
    });

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersData = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
            });
    },
});

export default usersSlice.reducer;