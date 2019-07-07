const { endPointCall } = require('./utils');


exports.createCustomer = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    card_number,
    expiration_year,
    expiration_month,
    holder_name,

    token,
    description,
    full_name,
    email
  } */
}) => endPointCall({
  method: 'POST',
  endPointURL,
  endPointKey,
  entity: `customers`,
  data
});

exports.retrieveCustomer = ({
  endPointURL,
  endPointKey = 'secret',
  customerId
}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}`,
});

exports.updateCustomer = ({
  endPointURL,
  endPointKey = 'secret',
  customerId,
  ...data /* = {
    description,
    full_name,
    email,
    card,
    default_card
  } */
}) => endPointCall({
  method: 'PUT',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}`,
  data
});

exports.deleteCustomer = ({
  endPointURL,
  endPointKey = 'secret',
  customerId
}) => endPointCall({
  method: 'DELETE',
  endPointURL,
  endPointKey,
  entity: `customers/${customerId}`,
});

exports.listCustomers = ({
  endPointURL,
  endPointKey = 'secret',
  ...data /* = {
    count, // default: 10, max: 20
    offset,
    date_from,
    date_to
  } */
} = {}) => endPointCall({
  method: 'GET',
  endPointURL,
  endPointKey,
  entity: `customers`,
  data
});
