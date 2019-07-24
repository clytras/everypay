const { endPointCall } = require('./utils');

exports.createCustomer = ({
  endPointURL,
  endPointKey = 'secret',
  ...data
  /* = {
    card_number, // optional (only used if creating with card arguments)
    description, // optional
    email, // optional
    expiration_month, // optional (only used if creating with card arguments)
    expiration_year, // optional (only used if creating with card arguments)
    full_name, // optional
    holder_name, // optional (only used if creating with card arguments)
    token // optional
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `customers`,
    method: 'POST'
  });

exports.retrieveCustomer = ({ customerId, endPointKey = 'secret', endPointURL }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}`,
    method: 'GET'
  });

exports.updateCustomer = ({
  customerId,
  endPointKey = 'secret',
  endPointURL,
  ...data
  /* = {
    card, // optional
    customerId, // The unique Customer ID
    default_card, // optional (default: 0)
    description, // optional
    email, // optional
    full_name // optional
    full_name, // optional,
  } */
}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}`,
    method: 'PUT'
  });

exports.deleteCustomer = ({ customerId, endPointKey = 'secret', endPointURL }) =>
  endPointCall({
    endPointKey,
    endPointURL,
    entity: `customers/${customerId}`,
    method: 'DELETE'
  });

exports.listCustomers = ({
  endPointKey = 'secret',
  endPointURL,
  ...data
  /* = {
    count, // optional(default: 10, max: 20)
    date_from,  // optional
    date_to, // optional
    offset, // optional (default: 0)
  } */
} = {}) =>
  endPointCall({
    data,
    endPointKey,
    endPointURL,
    entity: `customers`,
    method: 'GET'
  });
