const nodeFetch = require('node-fetch');
const btoa = require('btoa');
const qs = require('qs');
const util = require('util');
const formURLEncoded = require('form-urlencoded').default;


function initAPIEndPoint({
  endPointURL,
  endPointKey,
  method
}) {
  const uri = endPointURL || process.env.EVERYPAY_APIENDPOINT;
  let key;

  switch(endPointKey) {
    case 'public':
    case 'pk':
      key = process.env.EVERYPAY_PUBLIC_KEY;
      break;
    case 'shared':
    case 'sh':
      key = process.env.EVERYPAY_SHARED_KEY;
      break;
    case 'secret':
    case 'sk':
      key = process.env.EVERYPAY_PRIVATE_KEY;
      break;
    default:
      key = endPointKey;
      break;
  }

  const endPointAuth = btoa(`${key}:`);

  return {
    uri,
    params: {
      method,
      headers: {
        'Authorization': `Basic ${endPointAuth}`
      }
    }
  }
}

exports.endPointCall = ({
  endPointURL,
  endPointKey,
  method = 'GET',
  entity,
  data
}) => {
  return new Promise((resolve, reject) => Promise.resolve().then(() => {
    const Debug = process.env.NODE_ENV === 'development' || process.env.EVERYPAY_DEBUG;

    let { uri, params } = initAPIEndPoint({
      endPointURL,
      endPointKey,
      method
    })

    if(entity) {
      uri = `${uri}/${entity}`;
    }

    if(data) {
      if(method == 'GET') {
        uri = `${uri}?${qs.stringify(data)}`;
      } else { // POST PUT DELETE
        params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let dataCound = 0;

        for(let prop in data) {
          const value = data[prop];
          if(value === undefined) {
            delete data[prop];
          } else {
            dataCound++;
          }
        }

        if(dataCound > 0) {
          params.body = formURLEncoded(data);
        }
      }
    }

    const useFetch = 
      (typeof(window) !== 'undefined' && window.fetch) || 
      (typeof(global) !== 'undefined' && global.fetch) || 
      nodeFetch;

    useFetch(uri, params)
    .then(res => res.json())
    .then(resData => {
      Debug && console.log('[EveryPay::endPointCall] Responce', JSON.stringify(resData, null, 2));
      if(resData && 'error' in resData) {
        reject({ endPointError: resData.error});
      } else {
        resolve(resData);
      }
    })
    .catch(error => {
      Debug && console.error('[EveryPay::endPointCall] Error', JSON.stringify(error, null, 2));
      reject(error);
    });
  }));
}
