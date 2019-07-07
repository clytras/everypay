exports.Cards = {
  Schenarios: {
    UnexpectedError: '4888137257116730',
    PaymentFailedInRemoteGateway: '4853451426120387',
    SuccessNoRefundNoCapture502: '4916915111701144',
    SuccessNoRefundNoCapture500: '5206140271967502'
  },
  Success: {
    MasterCard: '5217925525906273',
    Visa: '4556390755719395'
  },

  ValidYear: (new Date).getFullYear() + 2,
  ValidMonth: (new Date).getMonth() + 1, // getMonth result is zero index
  ValidCVV: '343',

  Installments: '4908440000000003',
  Invalid: '4242424242424241',

  InvalidMounth: '15',
  InvalidYear: '2001',
  InvalidCVV: '12'
}
