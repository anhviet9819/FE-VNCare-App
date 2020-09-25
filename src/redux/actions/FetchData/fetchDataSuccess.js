import { FETCH_DATA_SUCCESS } from '../ActionTypes';

export const fetchDataSuccess = (info) => (
  {
    type: FETCH_DATA_SUCCESS,
    payload: { info },
  }
);