const nodeFetch = require('node-fetch');
const { encode: nodeBtoa } = require('base-64');
const qs = require('qs');
const formURLEncoded = require('form-urlencoded').default;

function initAPIEndPoint({ endPointURL, endPointKey, method }) {
  const uri = endPointURL || process.env.EVERYPAY_APIENDPOINT;
  let key;

  switch (endPointKey) {
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

  const useBtoa =
    (typeof window !== 'undefined' && window.btoa) ||
    (typeof global !== 'undefined' && global.btoa) ||
    nodeBtoa;

  const endPointAuth = useBtoa(`${key}:`);

  return {
    uri,
    params: {
      method,
      headers: {
        Authorization: `Basic ${endPointAuth}`
      }
    }
  };
}
// eslint-disable-next-line
exports.endPointCall = ({ data, endPointKey, endPointURL, entity, method = 'GET' }) =>
  new Promise((resolve, reject) =>
    Promise.resolve().then(() => {
      const Debug = process.env.NODE_ENV === 'development' || process.env.EVERYPAY_DEBUG;
      // eslint-disable-next-line
      let { uri, params } = initAPIEndPoint({
        endPointURL,
        endPointKey,
        method
      });

      if (entity) {
        uri = `${uri}/${entity}`;
      }

      if (data) {
        if (method === 'GET') {
          uri = `${uri}?${qs.stringify(data)}`;
        } else {
          // POST PUT DELETE
          params.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          let dataCound = 0;
          // eslint-disable-next-line
          for (const prop in data) {
            const value = data[prop];
            if (value === undefined) {
              delete data[prop];
            } else {
              dataCound++;
            }
          }

          if (dataCound > 0) {
            params.body = formURLEncoded(data);
          }
        }
      }

      const useFetch =
        (typeof window !== 'undefined' && window.fetch) ||
        (typeof global !== 'undefined' && global.fetch) ||
        nodeFetch;

      useFetch(uri, params)
        .then((res) => res.json())
        .then((resData) => {
          if (Debug) {
            console.log(
              '[EveryPay::endPointCall] Response',
              JSON.stringify(resData, null, 2)
            );
          }
          if (resData && 'error' in resData) {
            const error = { endPointError: resData.error };
            reject(error);
          } else {
            resolve(resData);
          }
        })
        .catch((error) => {
          if (Debug) {
            console.error(
              '[EveryPay::endPointCall] Error',
              JSON.stringify(error, null, 2)
            );
          }
          reject(error);
        });
    })
  );
