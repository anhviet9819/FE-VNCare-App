import { FETCH_DATA_ERROR } from '../ActionTypes';

export const fetchDataError = () => (
  {
    type: FETCH_DATA_ERROR,
    payload: { error: true },
  }
);