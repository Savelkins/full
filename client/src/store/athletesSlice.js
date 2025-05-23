import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteAthleteById,
  fetchAllAthletes,
  fetchAthleteById,
  fetchCreateAthlete,
  updateAthleteById,
} from "../api";
import { pendingCase, rejectedCase } from "./functions";

export const fetchAllAthletesAsync = createAsyncThunk(
  "athletes/fetchAllAthletesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllAthletes();
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchAthleteByIdAsync = createAsyncThunk(
  "athletes/fetchAthleteByIdAsync",
  async (athleteId, thunkAPI) => {
    try {
      const response = await fetchAthleteById(athleteId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchCreateAthleteAsync = createAsyncThunk(
  "athletes/fetchCreateAthleteAsync",
  async (formData, thunkAPI) => {
    try {
      const response = await fetchCreateAthlete(formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const updateAthleteByIdAsync = createAsyncThunk(
  "athletes/updateAthleteByIdAsync",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateAthleteById({ id, formData });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const deleteAthleteByIdAsync = createAsyncThunk(
  "athletes/deleteAthleteByIdAsync",
  async (athleteId, thunkAPI) => {
    try {
      const response = await deleteAthleteById(athleteId);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

const fulfilledCase = (state, action) => {
  state.selectedAthlete = action.payload;
  state.isLoading = false;
  state.error = null;
};
const athletesSlice = createSlice({
  name: "athletes",
  initialState: {
    athletes: [],
    selectedAthlete: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //fetchAllAthletesAsync
    builder.addCase(fetchAllAthletesAsync.pending, pendingCase);
    builder.addCase(fetchAllAthletesAsync.fulfilled, (state, action) => {
      state.athletes = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchAllAthletesAsync.rejected, rejectedCase);
    //fetchAthleteByIdAsync
    builder.addCase(fetchAthleteByIdAsync.pending, pendingCase);
    builder.addCase(fetchAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(fetchAthleteByIdAsync.rejected, rejectedCase);
    //fetchCreateAthleteAsync
    builder.addCase(fetchCreateAthleteAsync.pending, pendingCase);
    builder.addCase(fetchCreateAthleteAsync.fulfilled, fulfilledCase);
    builder.addCase(fetchCreateAthleteAsync.rejected, rejectedCase);
    //updateAthleteAsync
    builder.addCase(updateAthleteByIdAsync.pending, pendingCase);
    builder.addCase(updateAthleteByIdAsync.fulfilled, fulfilledCase);
    builder.addCase(updateAthleteByIdAsync.rejected, rejectedCase);
    //deleteAthleteByIdAsync
    builder.addCase(deleteAthleteByIdAsync.pending, pendingCase);
    builder.addCase(deleteAthleteByIdAsync.fulfilled, (state, action) => {
      state.athletes = state.athletes.filter(
        (athlete) => athlete._id !== action.payload._id
      );
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteAthleteByIdAsync.rejected, rejectedCase);
  },
});

export default athletesSlice.reducer;
