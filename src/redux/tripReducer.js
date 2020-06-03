import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: []
};

const tripsSlice = createSlice({
  name: 'Trips',
  initialState,
  reducers: {
    getTrips(state) {
      return state;
    },
    clearTrips(state) {
      return {
        ...state,
        trips: []
      };
    },
    addTrip(state, action) {
      const tempTrips = [...state.trips];
      tempTrips.push(action.payload);

      return {
        ...state,
        trips: tempTrips
      };
    },
    changeTripInPlace(state, action) {
      const { tempId, patchedTrips } = action.payload;
      const tempState = [...state.trips];

      const index = state.trips.findIndex(obj => {
        const { trip } = obj;
        const { id } = trip;

        return id === tempId;
      });
      tempState[index] = patchedTrips;

      return {
        ...state,
        trips: tempState
      };
    },
    deleteTripById(state, action) {
      const { tempId } = action.payload;

      return {
        ...state,
        trips: state.trips.filter(obj => {
          const { trip } = obj;
          const { id } = trip;
          return tempId !== id;
        })
      };
    }
  }
});

export const {
  getTrips,
  clearTrips,
  addTrip,
  changeTripInPlace,
  deleteTripById
} = tripsSlice.actions;

export default tripsSlice.reducer;
