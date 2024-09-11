import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBooking: {
        startDate: null,
        endDate: null,
        car: {},
        bookingDays : 0,
        total: 0,
        
    },
};

const dateRangeSlice = createSlice({
    name: "dateRange",
    initialState,
    reducers: {
        setDateRange(state, action) {
            state.startDate = action.payload.startDate ? new Date(action.payload.startDate).toISOString() : null;
            state.endDate = action.payload.endDate ? new Date(action.payload.endDate).toISOString() : null;
        },
    },
});

export const { setDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
