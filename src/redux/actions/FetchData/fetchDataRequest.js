import { FETCH_DATA_REQUEST } from '../ActionTypes';

export const fetchDataRequest = () => (
  {
    type: FETCH_DATA_REQUEST,
    payload: { loading: true },
  }
);