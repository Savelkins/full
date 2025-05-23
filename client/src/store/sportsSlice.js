import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteSportById,
  fetchAllSports,
  fetchCreateSport,
  fetchSportById,
  updateSportById,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

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

export const fetchCreateSportAsync = createAsyncThunk(
  "sports/fetchCreateSport",
  async (formData, thunkAPI) => {
    try {
      const response = await fetchCreateSport(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteSportByIdAsync = createAsyncThunk(
  "sports/deleteSportById",
  async (sportId, thunkAPI) => {
    try {
      const response = await deleteSportById(sportId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateSportByIdAsync = createAsyncThunk(
  "sports/updateSportById",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateSportById(id, formData);
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
    createdSport: null,
    error: null,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchAllSportsAsync
    builder.addCase(fetchAllSportsAsync.pending, pendingCase);
    builder.addCase(fetchAllSportsAsync.fulfilled, (state, action) => {
      state.sports = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchAllSportsAsync.rejected, rejectedCase);
    //fetchSportByIdAsync
    builder.addCase(fetchSportByIdAsync.pending, pendingCase);
    builder.addCase(fetchSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchSportByIdAsync.rejected, rejectedCase);
    //fetchCreateSportAsync
    builder.addCase(fetchCreateSportAsync.pending, pendingCase);
    builder.addCase(fetchCreateSportAsync.fulfilled, (state, action) => {
      state.createdSport = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCreateSportAsync.rejected, rejectedCase);
    //deleteSportByIdAsync
    builder.addCase(deleteSportByIdAsync.pending, pendingCase);
    builder.addCase(deleteSportByIdAsync.fulfilled, (state, action) => {
      state.sports = state.sports.filter(
        (sport) => sport._id !== action.payload._id
      );
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteSportByIdAsync.rejected, rejectedCase);
    //updateSportByIdAsync
    builder.addCase(updateSportByIdAsync.pending, pendingCase);
    builder.addCase(updateSportByIdAsync.fulfilled, (state, action) => {
      state.selectedSport = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updateSportByIdAsync.rejected, rejectedCase);
  },
});

export default sportsSlice.reducer;
