import { createReducer } from "@reduxjs/toolkit";

export const dataSlice = createReducer(
  {},
  {
    dataRequest: (updatedState) => {
      updatedState.loading = true;
    },
    dataSuccess: (updatedState, action) => {
      updatedState.loading = false;
      updatedState.tickets = action.payload.tickets;
      updatedState.users = action.payload.users;
    },
    dataFailure: (updatedState) => {
      updatedState.loading = false;
      updatedState.tickets = [];
      updatedState.users = [];
    },
  }
);

