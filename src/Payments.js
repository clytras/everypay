const { endPointCall } = require('./utils');

exports.createPayment = ({
  endPointURL,
  endPointKey = 'secret',
  ...data
  /* = {
    amount, // A positive integer in the smallest currency unit e.g in cents
               (e.g 10,99 EUR shall be converted to 1099)
    capture, // 1 payment will be captured, 0 only pre-authorize // default: 1
    card, // cardId or default card if token == customerId
    card_number, // optional (only used if creating with card arguments)
    create_customer, // optional (default: 0)
    customer, // optional
    cvv, // optional (only used if creating with card arguments)
    default_card, // optional
    description, // optional
    expiration_month, // optional (only used if creating with card arguments)
    expiration_year, // optional (only used if creating with card arguments)
    holder_name, // optional (only used if creating with card arguments)
    installments, // optional
    max_installments, // optional
    merchant_ref, // optional
    payee_email, // optional (will send an email to the customer with payment info)
    payee_phone, // optional
    token, // It can be either a Card Token ID or a Customer ID.
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `payments`,
    method: 'POST'
  });

exports.retrievePayment = ({ endPointKey = 'secret', endPointURL, paymentId }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `payments/${paymentId}`,
    method: 'GET'
  });

exports.capturePayment = ({ endPointKey = 'secret', endPointURL, paymentId }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `payments/${paymentId}/capture`,
    method: 'PUT'
  });

exports.listPayments = ({
  endPointURL,
  endPointKey = 'secret',
  ...data
  /* = {
    count, // optional(default: 10, max: 20)
    date_from, // optional
    date_to, // optional
    merchant_ref // optional
    offset, // optional (default: 0)
  } */
} = {}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `payments`,
    method: 'GET'
  });
