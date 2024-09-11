import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { getAllCars, getAvailableCars } from "../../services/cars.service";

const initialState = {
  cars: [],
  availableCars: [],
  loading: false,
  error: null,
  filters: {
    brand: "",
    priceRange: [50, 50000],
    powerSystem: [],
    transmissionType: [],
    seats: [],
    vehicleTypes: [],
    yearRange: [1980, 2025],
  },
  showFilteredCars: false,
  fetchAvailableCarsEnabled: true, // Flag to control fetching available cars
};

// Async thunk to fetch all cars
export const fetchAllCars = createAsyncThunk(
  "carsData/fetchAllCars",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCars();
      return response.cars.reverse();
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

// Async thunk to fetch available cars based on date range
export const fetchAvailableCars = createAsyncThunk(
  "carsData/fetchAvailableCars",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { startDate, endDate } = state.dateRangeData;

    if (!startDate || !endDate) {
      return rejectWithValue("Start date and end date are required.");
    }

    try {
      const response = await getAvailableCars({ startDate, endDate });
      return response.cars;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "carsData",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setFilter(state, action) {
      const { filter, value } = action.payload;
      state.filters[filter] = value;
      state.fetchAvailableCarsEnabled = true;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
      state.showFilteredCars = false;
      state.availableCars = [];
      state.fetchAvailableCarsEnabled = false;
    },
    setShowFilteredCars(state, action) {
      state.showFilteredCars = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCars.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCars = action.payload;
      })
      .addCase(fetchAvailableCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setFilter, clearFilters, setShowFilteredCars } =
  carsSlice.actions;

// Selector to access the merged available and filtered cars
export const selectFilteredCars = createSelector(
  [
    (state) => state.carsData.cars,
    (state) => state.carsData.showFilteredCars,
    (state) => state.carsData.availableCars,
    (state) => state.carsData.filters,
  ],
  (cars, showFilteredCars, availableCars, filters) => {
    // Apply filters
    const filteredCars = cars.filter((car) => {
      const {
        brand,
        priceRange,
        powerSystem,
        transmissionType,
        seats,
        vehicleTypes,
        yearRange,
      } = filters;

      const brandMatch =
        brand !== "" ? car.brand.toLowerCase() === brand.toLowerCase() : true;
      const priceMatch =
        car.rentalPrice >= priceRange[0] && car.rentalPrice <= priceRange[1];
      const powerSystemMatch =
        powerSystem.length > 0 ? powerSystem.includes(car.powerSystem) : true;
      const transmissionTypeMatch =
        transmissionType.length > 0
          ? transmissionType.includes(car.transmissionType)
          : true;
      const seatsMatch = seats.length > 0 ? seats.includes(car.seats.toString()) : true;
      const vehicleTypeMatch =
        vehicleTypes.length > 0 ? vehicleTypes.includes(car.type) : true;
      const yearMatch = car.year >= yearRange[0] && car.year <= yearRange[1];

      return (
        brandMatch &&
        priceMatch &&
        powerSystemMatch &&
        transmissionTypeMatch &&
        seatsMatch &&
        vehicleTypeMatch &&
        yearMatch
      );
    });

    // If showFilteredCars is false or no available cars and no startDate/endDate, return filtered cars
    if (!showFilteredCars || !availableCars.length) {
      return filteredCars;
    }

    // Merge filtered cars with available cars
    const mergedCars = filteredCars.filter((car) =>
      availableCars.some((availableCar) => availableCar._id === car._id)
    );
    return mergedCars;
  }
);

export default carsSlice.reducer;
