exports.initializeEveryPayGatewayFrom = function({
  APIEndPointURL,
  PublicKey,
  PrivateKey,
  SharedKey
}) {
  process.env['EVERYPAY_APIENDPOINT'] = APIEndPointURL;
  process.env['EVERYPAY_PUBLIC_KEY'] = PublicKey;
  process.env['EVERYPAY_PRIVATE_KEY'] = PrivateKey;
  process.env['EVERYPAY_SHARED_KEY'] = SharedKey;
}
