import { getQuanHeByTaikhoanId } from '../../../services/fetchAPI';
import { fetchDataError } from './fetch-data-error';
import { fetchDataRequest } from './fetch-data-request';
import { fetchDataSuccess } from './fetch-data-success';

export const fetchData = () => (
  (dispatch) => {
    dispatch(fetchDataRequest());
    return getQuanHeByTaikhoanId()
      .then((info) => dispatch(fetchDataSuccess(info)))
      .catch(() => dispatch(fetchDataError()));
  }
);