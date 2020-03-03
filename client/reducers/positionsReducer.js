import { LOCATION_CHANGE } from "react-router-redux";

const initialState = {
  fetching: false,
  fetched: false,
  error: null,
  positions: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATING_POSITION":
      return {
        ...state,
        fetched: false,
        fetching: true
      };
    case "ADD_POSITION":
      return {
        ...state,
        fetched: true,
        fetching: false,
        positions: [...state.positions, action.position]
      };

    default: {
      return state;
    }
  }
};

export default cartReducer;
