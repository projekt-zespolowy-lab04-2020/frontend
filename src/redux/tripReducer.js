import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trips: [],
  showJoinedTrips: false
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
    setShowJoinedTrips(state, action) {
      return {
        ...state,
        showJoinedTrips: action.payload
      };
    },
    addTrip(state, action) {
      const tempTrips = [...state.trips];
      const tempObj = Object.assign(action.payload, { joined: false });
      tempTrips.push(tempObj);

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
    },
    setJoinedTrips(state, action) {
      const res = action.payload;
      let newStateTrips;
      res.forEach(resTrip => {
        const resId = resTrip.id;
        newStateTrips = state.trips.map(trip => {
          if (resId === trip.id) {
            return {
              ...trip,
              joined: true
            };
          } else {
            return trip;
          }
        });
      });
      return {
        ...state,
        trips: newStateTrips
      };
    }
  }
});

export const {
  getTrips,
  clearTrips,
  addTrip,
  changeTripInPlace,
  deleteTripById,
  setJoinedTrips,
  setShowJoinedTrips
} = tripsSlice.actions;

export default tripsSlice.reducer;
