const { endPointCall } = require('./utils');


exports.createRefund = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    payment,
    amount,
    description
  } */
}) => endPointCall({
  method: 'POST',
  endPointURL,
  endPointKey,
  entity: `refunds`,
  data
});

exports.retrieveRefund = ({
  endPointURL,
  endPointKey = 'secret',
  refundId
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `refunds/${refundId}`
});

exports.listRefunds = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    count, // default: 10, max: 20
    offset,
    date_from,
    date_to,
    payment
  } */
} = {}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `refunds`,
  data
});
