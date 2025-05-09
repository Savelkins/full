import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllSports , fetchSportById } from "../api";

export const fetchAllSportsAsync = createAsyncThunk(
  "sports/fetchAllSports",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllSports();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchSportByIdAsync = createAsyncThunk(
  "sports/fetchSportById",
  async (sportId, thunkAPI) => {
    try {
      const response = await fetchSportById(sportId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const sportsSlice = createSlice({
  name: "sports",
  initialState: {
    sports: [],
    selectedSport: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchAllSportsAsync
    builder.addCase(fetchAllSportsAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAllSportsAsync.fulfilled, (state, action) => {
      state.sports = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllSportsAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    //fetchSportByIdAsync
    builder.addCase(fetchSportByIdAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSportByIdAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default sportsSlice.reducer;
