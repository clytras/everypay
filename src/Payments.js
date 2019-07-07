const { endPointCall } = require('./utils');


exports.createPayment = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    amount, 

    card_number,
    expiration_year,
    expiration_month,
    holder_name,
    cvv,

    token, // It can be either a Card Token ID or a Customer ID.
    card, // cardId or default card if token == customerId
    description,
    capture, // 1 payment will be captured, 0 only pre-authorize // default: 1
    payee_email,
    payee_phone,
    installments,
    max_installments,
    merchant_ref,

    create_customer,

    customer,
    default_card
  } */
}) => endPointCall({
  method: 'POST',
  endPointURL,
  endPointKey,
  entity: `payments`,
  data
});

exports.retrievePayment = ({
  endPointURL,
  endPointKey = 'secret',
  paymentId
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `payments/${paymentId}`
});

exports.capturePayment = ({
  endPointURL,
  endPointKey = 'secret',
  paymentId
}) => endPointCall({
  method: 'PUT',
  endPointURL,
  endPointKey,
  entity: `payments/${paymentId}/capture`
});

exports.listPayments = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    count, // default: 10, max: 20
    offset,
    date_from,
    date_to,
    merchant_ref
  } */
} = {}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `payments`,
  data
});
