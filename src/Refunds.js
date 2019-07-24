const { endPointCall } = require('./utils');

exports.createRefund = ({
  endPointURL,
  endPointKey = 'secret',
  ...data
  /* = {
    amount, // optional The amount (in cents) to refund. This must be less or
               equal to current amount of payment that is being refunded. If no amount
               is provided then the remaining amount of payment will be used.
    description, // optional
    payment // The Payment ID of the payment to refund.
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `refunds`,
    method: 'POST'
  });

exports.retrieveRefund = ({ endPointKey = 'secret', endPointURL, refundId }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `refunds/${refundId}`,
    method: 'GET'
  });

exports.listRefunds = ({
  endPointURL,
  endPointKey = 'secret',
  ...data
  /* = {
    count, // optional(default: 10, max: 20)
    date_from, // optional
    date_to, // optional
    offset, optional(default: 0)
    payment // Provide the Payment ID to fetch refunds only for the specified payment
  } */
} = {}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `refunds`,
    method: 'GET'
  });
