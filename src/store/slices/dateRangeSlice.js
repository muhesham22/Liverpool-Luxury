import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startDate: null,
    endDate: null,
};

const dateRangeSlice = createSlice({
    name: "dateRange",
    initialState,
    reducers: {
        setDateRange(state, action) {
            state.startDate = action.payload.startDate ? new Date(action.payload.startDate).toLocaleDateString() : null;
            state.endDate = action.payload.endDate ? new Date(action.payload.endDate).toLocaleDateString() : null;
        },
        clearDateRange(state) {
            state.startDate = null;
            state.endDate = null;
        },
    },
});

export const { setDateRange,clearDateRange } = dateRangeSlice.actions;
export default dateRangeSlice.reducer;
