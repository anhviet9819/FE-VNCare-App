import config from './config.js'

const {globalUrl} = config

export const createDangKykham = (tgdk,tgkham,noidungkham,loaikhamid,benhnhanid,bacsiid) => {
    const URL = `${globalUrl}/dangkykham/benhnhan/${benhnhanid}/bacsi/${bacsiid}`;
    return fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          thoigiandk: tgdk,
          thoigiankham: tgkham,
          noidungkham: noidungkham,
          loaikham: loaikhamid,
        })})
            .then((response) => response.json());
}