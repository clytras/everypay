exports.Cards = {
  Installments: '4908440000000003',
  Invalid: '4242424242424241',
  InvalidCVV: '12',
  InvalidMounth: '15',
  InvalidYear: '2001',
  Schenarios: {
    PaymentFailedInRemoteGateway: '4853451426120387',
    SuccessNoRefundNoCapture500: '5206140271967502',
    SuccessNoRefundNoCapture502: '4916915111701144',
    UnexpectedError: '4888137257116730'
  },
  Success: {
    MasterCard: '5217925525906273',
    Visa: '4556390755719395'
  },
  ValidCVV: '343',
  ValidMonth: new Date().getMonth() + 1, // getMonth result is zero index
  ValidYear: new Date().getFullYear() + 2
};
